"use client"

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
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const hasPlayedWelcome = useRef(false)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(1)
    }

    // Initialize speech synthesis
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis
    }

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

    // Say "Namaskar" when page loads using TTS server (only once)
    if (!hasPlayedWelcome.current) {
      hasPlayedWelcome.current = true
      setTimeout(async () => {
        const welcomeMsg = "Namaskar! I am Agrimater AI assistant. How can I help you today?"
        setResponse(welcomeMsg)
        await speakText(welcomeMsg)
      }, 1000)
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  const speakText = async (text: string) => {
    // Stop any currently playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current = null
    }
    if (synthRef.current) {
      synthRef.current.cancel()
    }
    stopTalkingAnimation()
    
    setIsSpeaking(true)
    
    try {
      // Try OpenVoice server first
      const ttsServerUrl = process.env.NEXT_PUBLIC_TTS_SERVER_URL || "http://localhost:5001"
      
      try {
        const response = await fetch(`${ttsServerUrl}/api/tts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        })

        if (response.ok) {
          const audioBlob = await response.blob()
          const audioUrl = URL.createObjectURL(audioBlob)
          const audio = new Audio(audioUrl)
          currentAudioRef.current = audio
          
          // Start animation immediately when TTS begins
          startTalkingAnimation()
          
          audio.onended = () => {
            setIsSpeaking(false)
            stopTalkingAnimation()
            URL.revokeObjectURL(audioUrl)
            currentAudioRef.current = null
            // Auto-start listening after AI finishes speaking
            if (response) {
              setTimeout(() => {
                startListening()
              }, 500)
            }
          }

          audio.onerror = () => {
            setIsSpeaking(false)
            stopTalkingAnimation()
            URL.revokeObjectURL(audioUrl)
            currentAudioRef.current = null
            console.error("Audio playback error, falling back to browser TTS")
            fallbackToSpeechSynthesis(text)
          }

          // Setup audio analysis after starting to play for real-time sync
          audio.onplay = () => {
            setupAudioAnalysis(audio)
          }

          await audio.play()
          return
        }
      } catch (error) {
        console.log("OpenVoice server not available, using browser TTS:", error)
      }

      // Fallback to browser TTS
      fallbackToSpeechSynthesis(text)
    } catch (error) {
      console.error("TTS error:", error)
      setIsSpeaking(false)
    }
  }

  const startTalkingAnimation = () => {
    // Start basic talking animation immediately
    if (!lottieRef.current) return
    
    let scale = 1
    let direction = 1
    let frameCount = 0
    
    const basicAnimate = () => {
      if (!lottieRef.current?.wrapper) return
      
      // Create realistic speech pattern
      frameCount++
      
      // Vary the animation speed and intensity
      if (frameCount % 3 === 0) {
        scale += direction * 0.015
        
        // Random variation for natural feel
        if (Math.random() > 0.7) {
          scale += (Math.random() - 0.5) * 0.02
        }
        
        // Bounce between 0.92 and 1.12 for visible mouth movement
        if (scale > 1.12) {
          scale = 1.12
          direction = -1
        } else if (scale < 0.92) {
          scale = 0.92
          direction = 1
        }
        
        lottieRef.current.wrapper.style.transform = `scale(${scale})`
        lottieRef.current.wrapper.style.transition = 'transform 0.05s ease-in-out'
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
    if (synthRef.current) {
      synthRef.current.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-US"
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onstart = () => {
        setIsSpeaking(true)
        startTalkingAnimation()
      }
      utterance.onend = () => {
        setIsSpeaking(false)
        stopTalkingAnimation()
        // Auto-start listening after AI finishes speaking
        if (response) {
          setTimeout(() => {
            startListening()
          }, 500)
        }
      }

      synthRef.current.speak(utterance)
    }
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript("")
      setResponse("")
      setIsListening(true)
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
      speakText(aiResponse)
    } catch (error) {
      console.error("[Frontend] Error calling AI:", error)
      const errorMsg =
        typeof error === "object" && error !== null && "message" in error
          ? (error as Error).message
          : "Sorry, I encountered an error. Please try again."
      setResponse(errorMsg)
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
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-8 left-8 z-20 flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-[#00F28A]/30 transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </motion.button>
        </Link>

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
