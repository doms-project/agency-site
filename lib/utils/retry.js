/**
 * Retry utility with exponential backoff
 * Handles rate limiting (429) and server errors (5xx) with automatic retries
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum number of retry attempts (default: 3)
 * @param {number} baseDelay - Base delay in milliseconds (default: 1000)
 * @returns {Promise<any>} - Result of the function
 */
export async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      // Don't retry on 4xx errors (except 429 rate limit)
      const status = error.status || error.response?.status
      if (status >= 400 && status < 500 && status !== 429) {
        throw error
      }
      
      // Last attempt, throw error
      if (attempt === maxRetries - 1) {
        throw error
      }
      
      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt)
      // Add jitter (random 0-30% of delay) to prevent thundering herd
      const jitter = Math.random() * 0.3 * delay
      const totalDelay = delay + jitter
      
      console.warn(`⚠️  GHL API retry attempt ${attempt + 1}/${maxRetries} after ${Math.round(totalDelay)}ms`)
      await new Promise(resolve => setTimeout(resolve, totalDelay))
    }
  }
}

