/**
 * Validation utilities for GHL API data
 */

/**
 * Validate contact data before sending to GHL
 * @param {Object} data - Contact data to validate
 * @throws {Error} If validation fails
 */
export function validateContactData(data) {
  const errors = []
  
  if (!data.ownerContact || typeof data.ownerContact !== 'string' || data.ownerContact.trim().length === 0) {
    errors.push('Owner Contact is required and must be a non-empty string')
  }
  
  if (!data.phone || typeof data.phone !== 'string') {
    errors.push('Phone number is required')
  } else {
    // Validate E.164 format (optional +, then country code, then number)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    const digitsOnly = data.phone.replace(/\D/g, '')
    if (!phoneRegex.test(`+${digitsOnly}`)) {
      errors.push('Phone number must be in valid format (E.164)')
    }
  }
  
  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.push('Email address must be in valid format')
    }
  }
  
  if (errors.length > 0) {
    throw new Error(`Contact validation failed: ${errors.join(', ')}`)
  }
  
  return true
}

/**
 * Validate opportunity data before sending to GHL
 * @param {Object} data - Opportunity data to validate
 * @param {string} contactId - Contact ID (required for opportunity)
 * @throws {Error} If validation fails
 */
export function validateOpportunityData(data, contactId) {
  const errors = []
  
  if (!contactId || typeof contactId !== 'string' || contactId.trim().length === 0) {
    errors.push('Contact ID is required to create an opportunity')
  }
  
  if (data.name && typeof data.name !== 'string') {
    errors.push('Opportunity name must be a string')
  }
  
  if (errors.length > 0) {
    throw new Error(`Opportunity validation failed: ${errors.join(', ')}`)
  }
  
  return true
}

