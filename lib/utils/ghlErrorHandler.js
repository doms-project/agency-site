/**
 * Custom error class for GHL API errors
 */
export class GHLAPIError extends Error {
  constructor(message, status, response, context = {}) {
    super(message)
    this.name = 'GHLAPIError'
    this.status = status
    this.response = response
    this.context = context
    // Retryable errors: rate limits (429) and server errors (5xx)
    this.isRetryable = status === 429 || (status >= 500 && status < 600)
  }
}

/**
 * Handle GHL API response and throw appropriate errors
 * @param {Response} response - Fetch response object
 * @param {Object} context - Additional context for error messages
 * @returns {Promise<Response>} - Response if successful
 */
export async function handleGHLResponse(response, context = {}) {
  if (!response.ok) {
    const errorText = await response.text()
    let errorData
    try {
      errorData = JSON.parse(errorText)
    } catch {
      errorData = errorText
    }
    
    const error = new GHLAPIError(
      `GHL API error: ${response.status} - ${typeof errorData === 'string' ? errorData : JSON.stringify(errorData)}`,
      response.status,
      errorData,
      context
    )
    
    // Add helpful error messages for common status codes
    if (response.status === 403) {
      error.message += ' (API key may be from a different location)'
    } else if (response.status === 404) {
      error.message += ' (Resource not found - check IDs)'
    } else if (response.status === 429) {
      error.message += ' (Rate limit exceeded - will retry)'
    }
    
    throw error
  }
  
  return response
}

