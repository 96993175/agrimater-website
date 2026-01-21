/**
 * Network Guard - Centralized fetch management with built-in protections
 * 
 * Purpose: Prevent request explosions by enforcing:
 * - Debounce/dedupe for identical requests
 * - Abort controller support for cancellable requests  
 * - Retry limits with exponential backoff
 * - Request budget per session
 * - Rate limiting
 * - Timeout enforcement
 */

interface NetworkGuardConfig {
  maxRetries: number;
  baseDelay: number;
  maxConcurrent: number;
  requestBudget: number;
  timeout: number;
  enableDedupe: boolean;
  enableRateLimit: boolean;
}

interface PendingRequest {
  controller: AbortController;
  timestamp: number;
  retryCount: number;
}

interface RequestBudget {
  count: number;
  resetTime: number;
}

class NetworkGuard {
  private config: NetworkGuardConfig;
  private pendingRequests: Map<string, PendingRequest>;
  private requestQueue: Array<{
    key: string;
    request: () => Promise<any>;
    resolve: (value: any) => void;
    reject: (reason: any) => void;
  }>;
  private activeRequests: number;
  private sessionBudget: RequestBudget;
  private debounceCache: Map<string, { timestamp: number; promise: Promise<any> }>;

  constructor(config: Partial<NetworkGuardConfig> = {}) {
    this.config = {
      maxRetries: 2,
      baseDelay: 1000,
      maxConcurrent: 6,
      requestBudget: 50,
      timeout: 30000,
      enableDedupe: true,
      enableRateLimit: true,
      ...config
    };

    this.pendingRequests = new Map();
    this.requestQueue = [];
    this.activeRequests = 0;
    this.sessionBudget = {
      count: 0,
      resetTime: Date.now() + 5 * 60 * 1000 // Reset every 5 minutes
    };
    this.debounceCache = new Map();

    // Reset budget periodically
    setInterval(() => {
      this.resetBudget();
    }, 5 * 60 * 1000);
  }

  /**
   * Generate unique key for request deduplication
   */
  private generateRequestKey(url: string, options: RequestInit = {}): string {
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : '';
    return `${method}:${url}:${body}`;
  }

  /**
   * Check if we should allow this request
   */
  private canMakeRequest(key: string): boolean {
    // Check session budget
    if (this.sessionBudget.count >= this.config.requestBudget) {
      if (Date.now() > this.sessionBudget.resetTime) {
        this.resetBudget();
      } else {
        console.warn(`NetworkGuard: Request budget exceeded for key: ${key}`);
        return false;
      }
    }

    // Check concurrent limit
    if (this.activeRequests >= this.config.maxConcurrent) {
      return false;
    }

    return true;
  }

  /**
   * Reset session budget
   */
  private resetBudget(): void {
    this.sessionBudget = {
      count: 0,
      resetTime: Date.now() + 5 * 60 * 1000
    };
    console.log('NetworkGuard: Session budget reset');
  }

  /**
   * Apply timeout to fetch request
   */
  private withTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Request timeout after ${timeout}ms`));
      }, timeout);

      promise.then(
        (result) => {
          clearTimeout(timeoutId);
          resolve(result);
        },
        (error) => {
          clearTimeout(timeoutId);
          reject(error);
        }
      );
    });
  }

  /**
   * Exponential backoff delay
   */
  private async delay(retryCount: number): Promise<void> {
    const delay = Math.min(
      this.config.baseDelay * Math.pow(2, retryCount),
      10000 // Max 10 seconds
    );
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Execute fetch with retry logic
   */
  private async executeWithRetry<T>(
    url: string,
    options: RequestInit,
    key: string
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        // Create abort controller for this attempt
        const controller = new AbortController();
        const signal = controller.signal;

        // Store pending request
        this.pendingRequests.set(key, {
          controller,
          timestamp: Date.now(),
          retryCount: attempt
        });

        const response = await this.withTimeout(
          fetch(url, {
            ...options,
            signal
          }),
          this.config.timeout
        );

        // Clean up pending request
        this.pendingRequests.delete(key);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
      } catch (error) {
        lastError = error as Error;
        
        // Clean up pending request
        this.pendingRequests.delete(key);

        // Don't retry on abort or client errors
        if (error instanceof Error && (
          error.name === 'AbortError' || 
          (error.message.includes('400') || error.message.includes('401'))
        )) {
          throw error;
        }

        // Don't retry on final attempt
        if (attempt === this.config.maxRetries) {
          throw lastError;
        }

        console.warn(`NetworkGuard: Retrying request (${attempt + 1}/${this.config.maxRetries + 1}):`, error);
        await this.delay(attempt);
      }
    }

    throw lastError!;
  }

  /**
   * Main guarded fetch method
   */
  public async guardedFetch<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const key = this.generateRequestKey(url, options);

    // Dedupe identical requests
    if (this.config.enableDedupe) {
      const cached = this.debounceCache.get(key);
      if (cached && Date.now() - cached.timestamp < 1000) {
        return cached.promise as Promise<T>;
      }
    }

    // Check if we can make this request
    if (!this.canMakeRequest(key)) {
      throw new Error(`NetworkGuard: Request blocked - rate limit or budget exceeded for ${key}`);
    }

    // Increment active requests and budget
    this.activeRequests++;
    this.sessionBudget.count++;

    const requestPromise = this.executeWithRetry<T>(url, options, key)
      .finally(() => {
        this.activeRequests--;
        this.debounceCache.delete(key);
      });

    // Cache for deduplication
    if (this.config.enableDedupe) {
      this.debounceCache.set(key, {
        timestamp: Date.now(),
        promise: requestPromise
      });
    }

    return requestPromise;
  }

  /**
   * Cancel pending requests by key pattern
   */
  public cancelRequests(pattern: string | RegExp): void {
    for (const [key, request] of this.pendingRequests.entries()) {
      if (
        (typeof pattern === 'string' && key.includes(pattern)) ||
        (pattern instanceof RegExp && pattern.test(key))
      ) {
        request.controller.abort();
        this.pendingRequests.delete(key);
        console.log(`NetworkGuard: Cancelled request: ${key}`);
      }
    }
  }

  /**
   * Get current status
   */
  public getStatus(): {
    activeRequests: number;
    pendingRequests: number;
    sessionBudget: number;
    budgetResetTime: number;
  } {
    return {
      activeRequests: this.activeRequests,
      pendingRequests: this.pendingRequests.size,
      sessionBudget: this.sessionBudget.count,
      budgetResetTime: this.sessionBudget.resetTime
    };
  }

  /**
   * Reset all state
   */
  public reset(): void {
    // Cancel all pending requests
    for (const request of this.pendingRequests.values()) {
      request.controller.abort();
    }
    
    this.pendingRequests.clear();
    this.requestQueue = [];
    this.activeRequests = 0;
    this.debounceCache.clear();
    this.resetBudget();
    
    console.log('NetworkGuard: All state reset');
  }
}

// Create singleton instance
const networkGuard = new NetworkGuard({
  maxRetries: 2,
  baseDelay: 1000,
  maxConcurrent: 6,
  requestBudget: 50,
  timeout: 30000,
  enableDedupe: true,
  enableRateLimit: true
});

// Export configured fetch methods for different services
export const guardedFetch = networkGuard.guardedFetch.bind(networkGuard);

// Convenience methods for common services
export const groqFetch = <T>(url: string, options: RequestInit = {}): Promise<T> => {
  return guardedFetch<T>(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
};

export const authFetch = <T>(url: string, options: RequestInit = {}): Promise<T> => {
  return guardedFetch<T>(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
};

export const ttsFetch = <T>(url: string, options: RequestInit = {}): Promise<T> => {
  return guardedFetch<T>(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
};

export const backendFetch = <T>(url: string, options: RequestInit = {}): Promise<T> => {
  return guardedFetch<T>(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
};

// Utility functions
export const cancelPendingRequests = (pattern: string | RegExp): void => {
  networkGuard.cancelRequests(pattern);
};

export const getNetworkStatus = (): ReturnType<typeof networkGuard.getStatus> => {
  return networkGuard.getStatus();
};

export const resetNetworkGuard = (): void => {
  networkGuard.reset();
};

// Global error handler for unhandled fetch errors
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason?.message?.includes('NetworkGuard')) {
      console.warn('NetworkGuard caught unhandled rejection:', event.reason);
      event.preventDefault();
    }
  });
}

export default networkGuard;