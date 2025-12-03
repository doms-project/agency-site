/**
 * Fetch with timeout wrapper
 * Prevents requests from hanging indefinitely
 * @param {string} url - Request URL
 * @param {Object} options - Fetch options
 * @param {number} timeout - Timeout in milliseconds (default: 30000)
 * @returns {Promise<Response>} - Fetch response
 */
export async function fetchWithTimeout(url, options = {}, timeout = 30000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      const timeoutError = new Error(`GHL API request timeout after ${timeout}ms`)
      timeoutError.name = 'TimeoutError'
      timeoutError.status = 408
      throw timeoutError
    }
    throw error
  }
}

