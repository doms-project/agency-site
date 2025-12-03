/**
 * Rate limiter for GHL API calls
 * Prevents exceeding API rate limits (typically 100 requests per minute)
 */
class RateLimiter {
  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests
    this.windowMs = windowMs
    this.requests = []
  }
  
  /**
   * Wait for a slot in the rate limit window
   * @returns {Promise<void>}
   */
  async waitForSlot() {
    const now = Date.now()
    
    // Remove old requests outside the window
    this.requests = this.requests.filter(time => now - time < this.windowMs)
    
    // If under limit, allow immediately
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now)
      return
    }
    
    // Wait until oldest request expires
    const oldestRequest = this.requests[0]
    const waitTime = this.windowMs - (now - oldestRequest) + 100 // Add 100ms buffer
    
    if (waitTime > 0) {
      console.log(`⏳ Rate limit: waiting ${Math.round(waitTime)}ms before next request`)
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
    
    // Remove expired requests and add new one
    this.requests = this.requests.filter(time => Date.now() - time < this.windowMs)
    this.requests.push(Date.now())
  }
  
  /**
   * Get current request count in window
   * @returns {number}
   */
  getCurrentCount() {
    const now = Date.now()
    this.requests = this.requests.filter(time => now - time < this.windowMs)
    return this.requests.length
  }
}

// Export singleton instance
// Conservative: 10 requests per minute (GHL typically allows 100/min, but we're being safe)
export const ghlRateLimiter = new RateLimiter(10, 60000)

