/**
 * Formats a phone number to E.164 format for GoHighLevel API
 * @param {string} phone - The phone number to format
 * @returns {string} - Formatted phone number in E.164 format (e.g., +1234567890)
 */
export function formatPhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') {
    return ''
  }
  
  // Remove all non-digits
  let formattedPhone = phone.replace(/\D/g, '')
  
  // Handle different phone number formats
  if (formattedPhone.length === 10) {
    // If 10 digits, assume US number and add +1
    formattedPhone = `+1${formattedPhone}`
  } else if (formattedPhone.length === 11 && formattedPhone.startsWith('1')) {
    // If 11 digits starting with 1, add +
    formattedPhone = `+${formattedPhone}`
  } else if (!formattedPhone.startsWith('+')) {
    // If doesn't start with +, add it
    formattedPhone = `+${formattedPhone}`
  }
  
  return formattedPhone
}

