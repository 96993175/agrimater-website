"use client"

/// <reference types="react" />
import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Lottie from "lottie-react"
import aiAnimation from "@/public/AI logo Foriday.json"
import { ArrowLeft, Mic, MicOff, Volume2 } from "lucide-react"
import Link from "next/link"

export default function InvestorAccessPage() {
  const lottieRef = useRef<any>(null)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [sessionId, setSessionId] = useState<string>("")
  const [preferEdgeTTS, setPreferEdgeTTS] = useState(true) // Prefer Microsoft Edge TTS for faster response
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  
  // Circuit breaker and cooldown tracking
  const ttsRetryCountRef = useRef(0)
  const lastTTSAttemptRef = useRef(0)
  const currentTTSPromiseRef = useRef<Promise<any> | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const hasPlayedWelcome = useRef(false)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)

  // Language detection function
  const detectLanguage = (text: string): string => {
    // Hindi detection
    if (/[\u0900-\u097F]/.test(text)) return 'hi'
    // Marathi detection
    if (/[\u0900-\u097F]/.test(text) && /ा|ी|ू|े|ै|ो|ौ/.test(text)) return 'mr'
    // Tamil detection
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta'
    // Telugu detection
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te'
    // Bengali detection
    if (/[\u0980-\u09FF]/.test(text)) return 'bn'
    // Gujarati detection
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu'
    // Kannada detection
    if (/[\u0C80-\u0CFF]/.test(text)) return 'kn'
    // Spanish detection
    if (/[áéíóúñ¿¡]/i.test(text)) return 'es'
    // French detection
    if (/[àâæçéèêëïîôùûüÿœ]/i.test(text)) return 'fr'
    // German detection
    if (/[äöüß]/i.test(text)) return 'de'
    // Chinese detection
    if (/[\u4E00-\u9FFF]/.test(text)) return 'zh'
    // Default to English
    return 'en'
  }

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(1)
    }

    // Initialize speech synthesis
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis
    }

    // Initialize or get session ID
    const initializeSession = async () => {
      // Reset TTS retry counter on session initialization
      ttsRetryCountRef.current = 0
      
      let sid = localStorage.getItem("agrimater_session_id")
      if (!sid) {
        sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem("agrimater_session_id", sid)
      }
      setSessionId(sid)

      // Load conversation history and create personalized welcome
      try {
        const historyResponse = await fetch(`/api/conversation?sessionId=${sid}&limit=5`)
        if (historyResponse.ok) {
          const { messages } = await historyResponse.json()
          
          let welcomeMsg = "Namaskar! I am Agrimater AI assistant. How can I help you today?"
          
          // If user has previous conversations, personalize the welcome
          if (messages && messages.length > 0) {
            welcomeMsg = "Welcome back! I remember our previous conversation. How can I assist you today?"
          }
          
          if (!hasPlayedWelcome.current) {
            hasPlayedWelcome.current = true
            setResponse(welcomeMsg)
            speakText(welcomeMsg)
          }
        }
      } catch (error) {
        console.error("Failed to load conversation history:", error)
        // Use default welcome message on error
        if (!hasPlayedWelcome.current) {
          hasPlayedWelcome.current = true
          const welcomeMsg = "Namaskar! I am Agrimater AI assistant. How can I help you today?"
          setResponse(welcomeMsg)
          speakText(welcomeMsg)
        }
      }
    }

    initializeSession()

    // Initialize speech recognition
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = async (event: any) => {
        const text = event.results[0][0].transcript
        setTranscript(text)
        setIsListening(false)
        await sendToGroq(text)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
      // Clean up any pending abort controllers
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
        abortControllerRef.current = null
      }
      // Reset counters on unmount
      ttsRetryCountRef.current = 0
    }
  }, [])

  const speakText = async (text: string, retryCount: number = 0) => {
    const MAX_RETRIES = 2
    
    // Prevent multiple simultaneous TTS operations
    if (isSpeaking && retryCount === 0) {
      console.log('[TTS] Another TTS operation in progress, aborting previous and starting new')
      // Cancel the previous TTS operation
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
        abortControllerRef.current = null
      }
      if (currentAudioRef.current) {
        currentAudioRef.current.pause()
        currentAudioRef.current = null
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
      stopTalkingAnimation()
    }
    
    // Check if we should apply cooldown
    const now = Date.now()
    const COOLDOWN_PERIOD = 1000 // 1 second cooldown between TTS calls
    if (now - lastTTSAttemptRef.current < COOLDOWN_PERIOD && retryCount === 0) {
      console.log('[TTS] Cooldown active, skipping request')
      return
    }
    
    // Check circuit breaker - max 2 retries per session
    if (ttsRetryCountRef.current >= MAX_RETRIES) {
      console.log('[TTS] Circuit breaker tripped, skipping request')
      setIsSpeaking(false)
      return
    }
    
    // Validate input
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      console.error("Invalid text for TTS:", text)
      setIsSpeaking(false)
      return
    }

    // Stop any currently playing audio
    try {
      // Abort any ongoing TTS requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
        abortControllerRef.current = null
      }
      
      // Cancel any existing speech synthesis
      if (currentAudioRef.current) {
        currentAudioRef.current.pause()
        currentAudioRef.current = null
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
      stopTalkingAnimation()
    } catch (cleanupError) {
      console.warn("Error during audio cleanup:", cleanupError)
    }
    
    setIsSpeaking(true)
    
    // Update last attempt time and increment retry counter
    lastTTSAttemptRef.current = Date.now()
    if (retryCount > 0) {
      ttsRetryCountRef.current++
    } else {
      ttsRetryCountRef.current = 0 // Reset on fresh attempt
    }
    
    try {
      // If preferEdgeTTS is true, try Microsoft Edge TTS first (faster, no server needed)
      if (preferEdgeTTS) {
        console.log("[TTS] Preferring Microsoft Edge TTS for faster response")
        try {
          await tryAzureTTS(text)
          return
        } catch (edgeError) {
          console.log("[TTS] Microsoft Edge TTS failed, trying OpenVoice server:", edgeError)
          // Continue to OpenVoice server below
        }
      }
      
      // Try OpenVoice server first with timeout
      const ttsServerUrl = process.env.NEXT_PUBLIC_TTS_SERVER_URL || "http://localhost:5001"
      
      try {
        // Add timeout to prevent long waits
        const controller = new AbortController()
        abortControllerRef.current = controller // Store for potential abort
        const timeoutId = setTimeout(() => {
          controller.abort()
          console.log("OpenVoice TTS request timeout after 5 seconds")
        }, 5000)
        
        console.log(`[TTS] Attempting OpenVoice server (attempt ${retryCount + 1}/${MAX_RETRIES + 1})`)
        
        const response = await fetch(`${ttsServerUrl}/api/tts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
          signal: controller.signal,
        })
        
        clearTimeout(timeoutId)
        // Clear the abort controller since request succeeded
        abortControllerRef.current = null

        if (response.ok) {
          const contentType = response.headers.get("content-type")
          if (!contentType || !contentType.includes("audio")) {
            throw new Error(`Invalid content type: ${contentType}`)
          }

          const audioBlob = await response.blob()
          if (audioBlob.size === 0) {
            throw new Error("Received empty audio blob")
          }

          const audioUrl = URL.createObjectURL(audioBlob)
          const audio = new Audio(audioUrl)
          currentAudioRef.current = audio
          
          console.log("[TTS] OpenVoice audio loaded successfully")
          
          // Only start animation when audio actually starts playing
          audio.onplay = () => {
            console.log("[TTS] Audio playback started")
            startTalkingAnimation()
            setupAudioAnalysis(audio)
          }
          
          audio.onended = () => {
            console.log("[TTS] Audio playback ended")
            setIsSpeaking(false)
            stopTalkingAnimation()
            URL.revokeObjectURL(audioUrl)
            currentAudioRef.current = null
            // Auto-start listening after AI finishes speaking
            setTimeout(() => {
              startListening()
            }, 500)
          }

          audio.onerror = (event) => {
            console.error("[TTS] Audio playback error:", event)
            setIsSpeaking(false)
            stopTalkingAnimation()
            URL.revokeObjectURL(audioUrl)
            currentAudioRef.current = null
            
            // Retry with OpenVoice if under retry limit
            if (retryCount < MAX_RETRIES) {
              console.log(`[TTS] Retrying OpenVoice (${retryCount + 1}/${MAX_RETRIES})...`)
              // Reset the abort controller before retry
              abortControllerRef.current = null
              setTimeout(() => speakText(text, retryCount + 1), 1000)
            } else {
              console.log("[TTS] OpenVoice failed, falling back to Microsoft Edge TTS")
              tryAzureTTS(text)
            }
          }

          // Attempt to play with error handling
          try {
            await audio.play()
            console.log("[TTS] Audio play() called successfully")
            return
          } catch (playError) {
            console.error("[TTS] Audio play() failed:", playError)
            URL.revokeObjectURL(audioUrl)
            throw playError
          }
        } else {
          const errorText = await response.text().catch(() => "Unknown error")
          throw new Error(`Server responded with ${response.status}: ${errorText}`)
        }
      } catch (error: any) {
        const errorMessage = error?.message || String(error)
        
        if (error.name === 'AbortError') {
          console.log("[TTS] OpenVoice request aborted (timeout)")
        } else if (error instanceof TypeError && errorMessage.includes('fetch')) {
          console.log("[TTS] Network error - OpenVoice server unreachable")
        } else {
          console.log("[TTS] OpenVoice error:", errorMessage)
        }
        
        // Retry with OpenVoice if under retry limit and not a timeout
        if (retryCount < MAX_RETRIES && error.name !== 'AbortError') {
          console.log(`[TTS] Retrying OpenVoice (${retryCount + 1}/${MAX_RETRIES})...`)
          // Reset the abort controller before retry
          abortControllerRef.current = null
          await new Promise(resolve => setTimeout(resolve, 1000))
          return speakText(text, retryCount + 1)
        }
      }

      // Try Microsoft Edge TTS as fallback
      console.log("[TTS] Falling back to Microsoft Edge TTS")
      await tryAzureTTS(text)
    } catch (error) {
      console.error("[TTS] Critical error in speakText:", error)
      setIsSpeaking(false)
      stopTalkingAnimation()
      
      // Last resort fallback
      try {
        console.log("[TTS] Attempting final fallback to basic browser TTS")
        fallbackToSpeechSynthesis(text)
      } catch (fallbackError) {
        console.error("[TTS] All TTS methods failed:", fallbackError)
        setIsSpeaking(false)
      }
    }
  }

  const tryAzureTTS = async (text: string) => {
    // Use Microsoft Edge TTS voices through browser Speech Synthesis API
    // This is free and built-in, no API key needed with multilingual support
    try {
      if (!text || text.trim().length === 0) {
        console.error("[Edge TTS] Invalid text provided")
        setIsSpeaking(false)
        return
      }

      if (!synthRef.current) {
        console.error("[Edge TTS] Speech synthesis not available")
        fallbackToSpeechSynthesis(text)
        return
      }

      // Detect language from text
      const detectedLang = detectLanguage(text)
      console.log("[Edge TTS] Detected language:", detectedLang)

      // Wait for voices to be loaded with retry
      let voices = synthRef.current.getVoices()
      let loadAttempts = 0
      const MAX_LOAD_ATTEMPTS = 3
      
      while (voices.length === 0 && loadAttempts < MAX_LOAD_ATTEMPTS) {
        loadAttempts++
        console.log(`[Edge TTS] Waiting for voices to load (attempt ${loadAttempts}/${MAX_LOAD_ATTEMPTS})...`)
        
        // Use onvoiceschanged event only, no polling
        await new Promise<void>((resolve) => {
          let resolved = false
          
          const voicesChangedHandler = () => {
            if (!resolved) {
              resolved = true
              console.log("[Edge TTS] Voices loaded via onvoiceschanged event")
              resolve()
            }
          }
          
          synthRef.current!.onvoiceschanged = voicesChangedHandler
          
          // Timeout after 2 seconds
          setTimeout(() => {
            if (!resolved) {
              resolved = true
              console.warn(`[Edge TTS] Voice loading timeout (attempt ${loadAttempts})`)
              resolve()
            }
          }, 2000)
        })
        
        voices = synthRef.current.getVoices()
      }
      
      if (voices.length === 0) {
        console.error("[Edge TTS] No voices available after all loading attempts")
        throw new Error("No speech synthesis voices available")
      }
      
      console.log(`[Edge TTS] ${voices.length} voices available`)
      
      // Log first 5 voices for debugging
      console.log("[Edge TTS] Sample voices:", voices.slice(0, 5).map(v => `${v.name} (${v.lang})`).join(', '))

      // Find all Microsoft voices (both Online and local)
      const allMicrosoftVoices = voices.filter((voice: SpeechSynthesisVoice) => 
        voice.name.toLowerCase().includes('microsoft') ||
        voice.name.toLowerCase().includes('neural') ||
        voice.name.toLowerCase().includes('online')
      )
      
      console.log(`[Edge TTS] Found ${allMicrosoftVoices.length} Microsoft/Neural voices`)
      if (allMicrosoftVoices.length > 0) {
        console.log("[Edge TTS] Microsoft voices:", allMicrosoftVoices.slice(0, 3).map(v => v.name).join(', '))
      }
      
      // Try to find Microsoft voices for detected language
      const microsoftLangVoices = allMicrosoftVoices.filter((voice: SpeechSynthesisVoice) => 
        voice.lang.startsWith(detectedLang)
      )
      
      console.log(`[Edge TTS] Found ${microsoftLangVoices.length} Microsoft voices for language: ${detectedLang}`)
      
      // Preferred voice name patterns for different languages
      const preferredPatterns: { [key: string]: string[] } = {
        'en': ['Jenny', 'Aria', 'Guy', 'Sara', 'Mark'],
        'hi': ['Swara', 'Madhur'],
        'mr': ['Aarohi'],
        'ta': ['Pallavi'],
        'te': ['Shruti'],
        'bn': ['Bashkar'],
        'gu': ['Dhwani'],
        'kn': ['Gagan'],
        'es': ['Elvira', 'Elena'],
        'fr': ['Denise', 'Eloise'],
        'de': ['Katja', 'Conrad'],
        'zh': ['Xiaoxiao', 'Yunxi'],
      }
      
      const patterns = preferredPatterns[detectedLang] || preferredPatterns['en']
      let selectedVoice: SpeechSynthesisVoice | null = null
      
      // Try to find preferred voice by pattern matching
      for (const pattern of patterns) {
        const foundVoice = microsoftLangVoices.find((v: SpeechSynthesisVoice) => 
          v.name.toLowerCase().includes(pattern.toLowerCase())
        ) || null
        if (foundVoice) {
          selectedVoice = foundVoice
          console.log(`[Edge TTS] Selected preferred voice: ${selectedVoice!.name}`)
          break
        }
      }
      
      // If no preferred pattern match, use any Microsoft voice for that language
      if (!selectedVoice && microsoftLangVoices.length > 0) {
        selectedVoice = microsoftLangVoices[0]
        console.log(`[Edge TTS] Using first available Microsoft voice: ${selectedVoice!.name}`)
      }
      
      // If no Microsoft voice for detected language, try any Microsoft English voice
      if (!selectedVoice && detectedLang !== 'en') {
        console.log(`[Edge TTS] No Microsoft voice for ${detectedLang}, trying English...`)
        const englishMicrosoftVoices = allMicrosoftVoices.filter((v: SpeechSynthesisVoice) => v.lang.startsWith('en'))
        if (englishMicrosoftVoices.length > 0) {
          selectedVoice = englishMicrosoftVoices[0]
          console.log(`[Edge TTS] Using English Microsoft voice: ${selectedVoice!.name}`)
        }
      }
      
      // If still no Microsoft voice, use ANY Microsoft voice available
      if (!selectedVoice && allMicrosoftVoices.length > 0) {
        selectedVoice = allMicrosoftVoices[0]
        console.log(`[Edge TTS] Using any available Microsoft voice: ${selectedVoice!.name}`)
      }
      
      // If absolutely no Microsoft voice, try to find any high-quality voice for the language
      if (!selectedVoice) {
        console.log("[Edge TTS] No Microsoft voices found, searching for quality voices...")
        const langVoices = voices.filter((v: SpeechSynthesisVoice) => v.lang.startsWith(detectedLang))
        
        // Prefer voices with 'premium', 'enhanced', 'natural' in name
        selectedVoice = langVoices.find((v: SpeechSynthesisVoice) => 
          v.name.toLowerCase().includes('premium') ||
          v.name.toLowerCase().includes('enhanced') ||
          v.name.toLowerCase().includes('natural')
        ) || langVoices[0]
        
        if (selectedVoice) {
          console.log(`[Edge TTS] Using quality voice: ${selectedVoice.name}`)
        }
      }
      
      // Final fallback to standard TTS if no suitable voice found
      if (!selectedVoice) {
        console.warn("[Edge TTS] No suitable voices found, falling back to standard browser TTS")
        console.log("[Edge TTS] All available voices:", voices.slice(0, 10).map((v: SpeechSynthesisVoice) => `${v.name} (${v.lang})`).join(', '))
        fallbackToSpeechSynthesis(text)
        return
      }

      // Use the selected Microsoft Edge voice
      synthRef.current.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.voice = selectedVoice
      utterance.lang = selectedVoice.lang
      utterance.rate = 0.95
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onstart = () => {
        setIsSpeaking(true)
        startTalkingAnimation()
        // Reset retry counter when speech starts successfully
        ttsRetryCountRef.current = 0
      }

      utterance.onend = () => {
        console.log("[Edge TTS] Speech ended successfully")
        setIsSpeaking(false)
        stopTalkingAnimation()
        // Auto-start listening after AI finishes speaking
        setTimeout(() => {
          startListening()
        }, 500)
      }

      utterance.onerror = (error: any) => {
        console.error("[Edge TTS] Speech error:", error.error || error)
        setIsSpeaking(false)
        stopTalkingAnimation()
        
        // Don't cascade to fallback if it's just a cancellation
        if (error.error !== 'canceled' && error.error !== 'interrupted') {
          console.log("[Edge TTS] Attempting standard browser TTS fallback")
          fallbackToSpeechSynthesis(text)
        }
      }

      console.log("[Edge TTS] Using voice:", selectedVoice.name, `(${selectedVoice.lang})`)
      
      try {
        synthRef.current.speak(utterance)
        console.log("[Edge TTS] Speech queued successfully")
      } catch (speakError) {
        console.error("[Edge TTS] Failed to queue speech:", speakError)
        throw speakError
      }

    } catch (error: any) {
      console.error("[Edge TTS] Critical error:", error?.message || error)
      setIsSpeaking(false)
      stopTalkingAnimation()
      
      // Final fallback to standard browser TTS
      try {
        console.log("[Edge TTS] Attempting final fallback to standard TTS")
        fallbackToSpeechSynthesis(text)
      } catch (fallbackError) {
        console.error("[Edge TTS] All TTS methods exhausted:", fallbackError)
        setIsSpeaking(false)
      }
    }
  }

  const startTalkingAnimation = () => {
    // Start enhanced talking animation with multiple movements
    if (!lottieRef.current) return
    
    let scale = 1
    let rotation = 0
    let direction = 1
    let frameCount = 0
    let pulsePhase = 0
    
    const basicAnimate = () => {
      if (!lottieRef.current?.wrapper) return
      
      frameCount++
      pulsePhase += 0.1
      
      // Create realistic speech pattern with multiple movements
      if (frameCount % 2 === 0) {
        // Scale animation - main talking motion
        scale += direction * 0.025
        
        // Add random variation for natural feel
        if (Math.random() > 0.6) {
          scale += (Math.random() - 0.5) * 0.03
        }
        
        // Bounce between 0.88 and 1.18 for more visible movement
        if (scale > 1.18) {
          scale = 1.18
          direction = -1
        } else if (scale < 0.88) {
          scale = 0.88
          direction = 1
        }
        
        // Add subtle rotation for more dynamic feel
        rotation = Math.sin(pulsePhase * 0.5) * 3 // Rotate ±3 degrees
        
        
        // Add vertical bounce for emphasis
        const verticalBounce = Math.sin(pulsePhase) * 2 // Move ±2px
        
        // Combine all transformations
        lottieRef.current.wrapper.style.transform = `
          scale(${scale}) 
          rotate(${rotation}deg) 
          translateY(${verticalBounce}px)
        `

        lottieRef.current.wrapper.style.transition = 'transform 0.08s cubic-bezier(0.4, 0, 0.2, 1)'
        
        // Add pulsing glow effect
        if (lottieRef.current.wrapper.parentElement) {
          const glowIntensity = 0.5 + (scale - 0.88) / 0.3 * 0.5 // 0.5 to 1
          lottieRef.current.wrapper.parentElement.style.filter = `drop-shadow(0 0 ${glowIntensity * 30}px rgba(0, 242, 138, ${glowIntensity * 0.4}))`
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(basicAnimate)
    }
    
    basicAnimate()
  }

  const setupAudioAnalysis = (audio: HTMLAudioElement) => {
    try {
      // Create new AudioContext for each audio element to avoid conflicts
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      audioContextRef.current = audioContext
      
      const source = audioContext.createMediaElementSource(audio)
      const analyser = audioContext.createAnalyser()
      
      analyser.fftSize = 256
      source.connect(analyser)
      analyser.connect(audioContext.destination)
      
      analyserRef.current = analyser
      animateMouth()
    } catch (error) {
      console.error("Audio analysis setup error:", error)
    }
  }

  const animateMouth = () => {
    if (!analyserRef.current || !lottieRef.current) return
    
    const analyser = analyserRef.current
    const dataArray = new Uint8Array(analyser.frequencyBinCount)
    const lowFreqArray = new Uint8Array(analyser.frequencyBinCount / 4)
    
    const animate = () => {
      analyser.getByteFrequencyData(dataArray)
      
      // Focus on lower frequencies (speech range 85Hz-255Hz)
      for (let i = 0; i < lowFreqArray.length; i++) {
        lowFreqArray[i] = dataArray[i]
      }
      
      // Calculate average volume from speech frequencies
      const average = lowFreqArray.reduce((a, b) => a + b) / lowFreqArray.length
      
      // More dramatic scaling for better visual effect (0.88-1.18)
      const baseScale = 0.88
      const scaleRange = 0.30
      const scale = baseScale + (average / 255) * scaleRange
      
      // Add micro-variations for natural feel
      const naturalVariation = (Math.random() - 0.5) * 0.015
      const finalScale = scale + naturalVariation
      
      // Apply scale to Lottie animation container with smooth transition
      if (lottieRef.current?.wrapper) {
        lottieRef.current.wrapper.style.transform = `scale(${finalScale})`
        lottieRef.current.wrapper.style.transition = 'transform 0.08s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animate()
  }

  const stopTalkingAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    
    // Smoothly reset scale to 1
    if (lottieRef.current?.wrapper) {
      lottieRef.current.wrapper.style.transform = 'scale(1)'
      lottieRef.current.wrapper.style.transition = 'transform 0.3s ease-out'
    }
  }

  const fallbackToSpeechSynthesis = (text: string) => {
    // Check circuit breaker - max 2 retries per session
    if (ttsRetryCountRef.current >= 2) {
      console.log('[Fallback TTS] Circuit breaker tripped, skipping request')
      setIsSpeaking(false)
      return
    }
    
    try {
      if (!text || text.trim().length === 0) {
        console.error("[Fallback TTS] Invalid text provided")
        setIsSpeaking(false)
        return
      }

      if (!synthRef.current) {
        console.error("[Fallback TTS] Speech synthesis not available")
        setIsSpeaking(false)
        return
      }

      console.log("[Fallback TTS] Using standard browser speech synthesis")
      
      // Update last attempt time and increment retry counter
      lastTTSAttemptRef.current = Date.now()
      ttsRetryCountRef.current++
      
      // Cancel any ongoing speech
      try {
        synthRef.current.cancel()
      } catch (cancelError) {
        console.warn("[Fallback TTS] Error canceling previous speech:", cancelError)
      }
      
      // Detect language for fallback
      const detectedLang = detectLanguage(text)
      const langCode = detectedLang === 'hi' ? 'hi-IN' : 
                       detectedLang === 'mr' ? 'mr-IN' :
                       detectedLang === 'ta' ? 'ta-IN' :
                       detectedLang === 'te' ? 'te-IN' :
                       detectedLang === 'bn' ? 'bn-IN' :
                       detectedLang === 'gu' ? 'gu-IN' :
                       detectedLang === 'kn' ? 'kn-IN' :
                       detectedLang === 'es' ? 'es-ES' :
                       detectedLang === 'fr' ? 'fr-FR' :
                       detectedLang === 'de' ? 'de-DE' :
                       detectedLang === 'zh' ? 'zh-CN' : 'en-US'
      
      console.log(`[Fallback TTS] Using language: ${langCode}`)
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = langCode
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onstart = () => {
        console.log("[Fallback TTS] Speech started")
        setIsSpeaking(true)
        startTalkingAnimation()
        // Reset retry counter when speech starts successfully
        ttsRetryCountRef.current = 0
      }
      
      utterance.onend = () => {
        console.log("[Fallback TTS] Speech ended")
        setIsSpeaking(false)
        stopTalkingAnimation()
        // Auto-start listening after AI finishes speaking
        setTimeout(() => {
          startListening()
        }, 500)
      }
      
      utterance.onerror = (error: any) => {
        console.error("[Fallback TTS] Speech error:", error.error || error)
        setIsSpeaking(false)
        stopTalkingAnimation()
      }

      try {
        synthRef.current.speak(utterance)
        console.log("[Fallback TTS] Speech queued successfully")
      } catch (speakError) {
        console.error("[Fallback TTS] Failed to queue speech:", speakError)
        setIsSpeaking(false)
        stopTalkingAnimation()
      }
    } catch (error) {
      console.error("[Fallback TTS] Critical error:", error)
      setIsSpeaking(false)
      stopTalkingAnimation()
    }
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript("")
      setResponse("")
      setIsListening(true)
      
      // Try to detect user's language preference from previous interactions
      // For now, support multiple languages by allowing auto-detection
      // Note: Browser speech recognition has limited multilingual support
      recognitionRef.current.lang = "en-US" // Primary language
      
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const sendToGroq = async (text: string) => {
    // Prevent multiple simultaneous requests
    if (isProcessing) {
      console.log('[sendToGroq] Request already processing, skipping new request')
      return
    }
    
    setIsProcessing(true)
    console.log("[Frontend] Sending message to /api/chat:", text)
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId,
        }),
      })

      console.log("[Frontend] Response status:", response.status, response.statusText)
      
      const data = await response.json()
      console.log("[Frontend] Response data:", data)

      if (!response.ok) {
        console.error("[Frontend] API Error Response:", data)
        throw new Error(data.error || data.details?.error || `API Error: ${response.status}`)
      }

      const aiResponse = data?.response || "I'm sorry, I couldn't process that."
      console.log("[Frontend] AI Response received:", aiResponse.substring(0, 100) + "...")
      setResponse(aiResponse)
      // Reset retry counter on successful response
      ttsRetryCountRef.current = 0
      speakText(aiResponse)
    } catch (error) {
      console.error("[Frontend] Error calling AI:", error)
      const errorMsg =
        typeof error === "object" && error !== null && "message" in error
          ? (error as Error).message
          : "Sorry, I encountered an error. Please try again."
      setResponse(errorMsg)
      // Don't reset retry counter on error, let speakText handle it
      speakText(errorMsg)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 242, 138, 0.1) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#00F28A]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4BE96A]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        {/* Back Button */}
        <div className="absolute top-0 left-0 right-0 z-50 px-4 md:px-6 py-6">
          <div className="container mx-auto max-w-7xl">
            <Link href="/">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-[#00F28A]/30 transition-all duration-300 shadow-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center"
          >
            {/* AI Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full max-w-md aspect-square flex items-center justify-center relative"
            >
              <motion.div
                animate={isSpeaking ? {
                  scale: [1, 1.05, 1, 1.08, 1, 1.03, 1],
                } : { scale: 1 }}
                transition={{
                  duration: 1.2,
                  repeat: isSpeaking ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className="w-full h-full"
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={aiAnimation}
                  loop={true}
                  className="w-full h-full"
                />
              </motion.div>
              
              {/* Speaking indicator */}
              <AnimatePresence>
                {isSpeaking && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00F28A]/20 border border-[#00F28A]/40 backdrop-blur-sm">
                      <Volume2 className="w-4 h-4 text-[#00F28A] animate-pulse" />
                      <span className="text-sm font-medium text-gray-700">Speaking...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-8 max-w-2xl w-full"
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
                Talk with AI
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Click the microphone to ask me anything about Agrimater
              </p>

              {/* Microphone Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing}
                className={`relative mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
                  isListening
                    ? "bg-gradient-to-r from-red-500 to-red-600 shadow-red-500/50 animate-pulse"
                    : isProcessing
                    ? "bg-gradient-to-r from-gray-400 to-gray-500"
                    : "bg-gradient-to-r from-[#00F28A] to-[#4BE96A] hover:shadow-[#00F28A]/50"
                }`}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-gray-900" />
                )}
                
                {/* Listening animation rings */}
                {isListening && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-red-400"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-red-400"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </>
                )}
              </motion.button>

              {/* Transcript Display */}
              <AnimatePresence>
                {transcript && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 shadow-lg"
                  >
                    <p className="text-gray-800 font-medium">{transcript}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Response Display */}
              <AnimatePresence>
                {response && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-6 rounded-2xl bg-gradient-to-br from-[#00F28A]/10 to-[#4BE96A]/10 backdrop-blur-sm border border-[#00F28A]/30 shadow-xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00F28A] to-[#4BE96A] flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold text-gray-900">AI</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-gray-800 leading-relaxed">{response}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
  )
}
