/**
 * Validates that all required environment variables are set
 * @param {string[]} requiredVars - Array of required environment variable names
 * @throws {Error} If any required environment variables are missing
 */
export function validateEnvVars(requiredVars = []) {
  // Default required vars for GHL integration
  const defaultRequired = [
    'GHL_API_KEY',
    'GHL_LOCATION_ID',
    'GHL_PIPELINE_ID',
    'GHL_STAGE_ID'
  ]
  
  const varsToCheck = requiredVars.length > 0 ? requiredVars : defaultRequired
  const missing = varsToCheck.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      `Please check your .env.local file and ensure all required variables are set.`
    )
  }
  
  return true
}

/**
 * Validates environment variables on module load (for server-side only)
 * This will throw an error immediately if vars are missing
 */
export function validateEnvOnLoad() {
  // Only validate in production or if explicitly enabled
  if (process.env.NODE_ENV === 'production' || process.env.VALIDATE_ENV === 'true') {
    try {
      validateEnvVars()
    } catch (error) {
      console.error('❌ Environment validation failed:', error.message)
      // In production, we might want to throw, but in development we can be more lenient
      if (process.env.NODE_ENV === 'production') {
        throw error
      }
    }
  }
}

