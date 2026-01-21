import { NextResponse } from "next/server";
import { groqFetch, cancelPendingRequests } from './networkGuard';

interface GroqRequestOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  timeout?: number;
}

interface GroqResponse {
  response: string;
  modelUsed: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class GroqClient {
  private apiKey: string;
  private readonly baseUrl = "https://api.groq.com/openai/v1/chat/completions";
  private readonly defaultModel = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
  private readonly maxRetries = 2;
  private readonly baseDelay = 1000; // 1 second base delay for exponential backoff
  
  // Track ongoing requests to prevent duplicates
  private ongoingRequests = new Map<string, Promise<GroqResponse>>();
  
  constructor() {
    this.apiKey = process.env.GROQ_API_KEY || "";
    if (!this.apiKey) {
      console.error("GROQ_API_KEY environment variable is missing");
    }
  }

  /**
   * Make a request to the Groq API with proper request management
   */
  async chatCompletion(
    message: string,
    sessionId: string,
    options: GroqRequestOptions = {}
  ): Promise<GroqResponse> {
    // Create a unique request key based on message and session to prevent duplicate requests
    const requestKey = `${sessionId}:${message.substring(0, 50)}`;
    
    // Check if there's already an ongoing request for this session/message combination
    if (this.ongoingRequests.has(requestKey)) {
      console.log(`[GroqClient] Request already in progress for key: ${requestKey}`);
      // Return the existing promise to prevent duplicate requests
      return this.ongoingRequests.get(requestKey)!;
    }

    // Create a new request promise with proper error handling and retry logic
    const requestPromise = this.executeWithRetry(message, sessionId, options, requestKey);
    
    // Store the promise to prevent duplicate requests
    this.ongoingRequests.set(requestKey, requestPromise);
    
    try {
      const result = await requestPromise;
      return result;
    } finally {
      // Clean up the ongoing request when complete
      this.ongoingRequests.delete(requestKey);
    }
  }

  private async executeWithRetry(
    message: string,
    sessionId: string,
    options: GroqRequestOptions,
    requestKey: string
  ): Promise<GroqResponse> {
    let lastError: Error | null = null;
    
    // Prepare context from conversation history
    const contextPrompt = "You are Agrimater AI assistant. You help people understand Agrimater's mission to transform India's agricultural supply chain with AI-powered transparency, verification, and logistics. Keep responses concise, friendly, and under 3 sentences. ALWAYS respond in English only, regardless of the user's language. Use natural pauses with commas, periods, and proper punctuation to make speech sound realistic and conversational.";
    
    // Build the request payload
    const requestBody = {
      model: options.model || this.defaultModel,
      messages: [
        {
          role: "system",
          content: contextPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 300,
    };

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        // Validate API key before making request
        if (!this.apiKey) {
          throw new Error("GROQ_API_KEY environment variable is not set");
        }
        
        // Create AbortController for request timeout
        const abortController = new AbortController();
        
        // Set timeout based on options or default to 30 seconds
        const timeoutMs = options.timeout || 30000;
        const timeoutId = setTimeout(() => abortController.abort(), timeoutMs);

        const response = await groqFetch(this.baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify(requestBody),
          signal: abortController.signal,
        });

        clearTimeout(timeoutId);

        if ((response as Response).ok) {
          const data = await (response as Response).json();
          
          const aiResponse = data?.choices?.[0]?.message?.content;
          if (!aiResponse) {
            throw new Error("Invalid API response: no content returned");
          }

          return {
            response: aiResponse,
            modelUsed: data.model || requestBody.model,
            usage: data.usage || undefined,
          };
        } else {
          const errorData = await (response as Response).json();
          const errorMessage = errorData?.error?.message || `HTTP ${(response as Response).status}`;
          
          // Don't retry on certain error codes
          if ((response as Response).status >= 400 && (response as Response).status < 500 && (response as Response).status !== 429) {
            throw new Error(`Client error: ${errorMessage}`);
          }
          
          throw new Error(`API error: ${errorMessage}`);
        }
      } catch (error: any) {
        lastError = error;
        
        // If this is the last attempt, rethrow the error
        if (attempt === this.maxRetries) {
          console.error(`[GroqClient] All ${this.maxRetries + 1} attempts failed for request ${requestKey}`, error);
          throw error;
        }

        // Calculate delay with exponential backoff and jitter
        const delay = this.calculateExponentialBackoff(attempt);
        console.log(`[GroqClient] Attempt ${attempt + 1} failed, retrying in ${delay}ms:`, error.message);
        
        // Wait before retrying
        await this.sleep(delay);
      }
    }
    
    // This shouldn't be reached due to the loop bounds, but included for type safety
    throw lastError!;
  }

  private calculateExponentialBackoff(attempt: number): number {
    // Exponential backoff formula: base_delay * (2 ^ attempt) + jitter
    const exponentialDelay = this.baseDelay * Math.pow(2, attempt);
    // Add jitter to prevent thundering herd
    const jitter = Math.random() * 0.1 * exponentialDelay;
    return exponentialDelay + jitter;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Alternative method that tries different models if the default fails
   */
  async chatCompletionWithModelFallback(
    message: string,
    sessionId: string,
    options: GroqRequestOptions = {}
  ): Promise<GroqResponse> {
    const alternativeModels = [
      "llama-3.1-8b-instant",
      "llama3-70b-8192", 
      "gemma-7b-it",
      "mixtral-8x7b-32768"
    ];
    
    const preferredModel = options.model || this.defaultModel;
    
    // Try the preferred model first
    try {
      return await this.chatCompletion(message, sessionId, { ...options, model: preferredModel });
    } catch (initialError) {
      console.log(`[GroqClient] Preferred model ${preferredModel} failed, trying alternatives...`);
      
      // Try alternative models
      for (const model of alternativeModels) {
        if (model === preferredModel) continue; // Skip the one we already tried
        
        try {
          console.log(`[GroqClient] Trying alternative model: ${model}`);
          return await this.chatCompletion(message, sessionId, { ...options, model });
        } catch (alternativeError: any) {
          console.log(`[GroqClient] Alternative model ${model} also failed:`, alternativeError.message);
          // Continue to next model
        }
      }
      
      // If all models failed, throw the original error
      throw initialError;
    }
  }
}

// Export a singleton instance
const groqClient = new GroqClient();
export { groqClient, GroqClient, type GroqResponse, type GroqRequestOptions };