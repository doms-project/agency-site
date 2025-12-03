/**
 * Cache for GHL field keys to reduce API calls
 * Field keys don't change often, so we can cache them
 */
const fieldKeyCache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Get cached field keys or fetch if not cached/expired
 * @param {string} entity - Entity type: 'contact' or 'opportunity'
 * @param {Function} fetchFn - Function to fetch field keys if not cached
 * @returns {Promise<Map>} - Map of field names to GHL keys
 */
export async function getCachedFieldKeys(entity, fetchFn) {
  const cacheKey = `fieldKeys_${entity}`
  const cached = fieldKeyCache.get(cacheKey)
  
  // Return cached data if still valid
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }
  
  // Fetch fresh data
  const data = await fetchFn()
  
  // Update cache
  fieldKeyCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  })
  
  return data
}

/**
 * Clear field key cache (useful for testing or forced refresh)
 * @param {string} entity - Optional entity type to clear, or clear all if not provided
 */
export function clearFieldKeyCache(entity = null) {
  if (entity) {
    fieldKeyCache.delete(`fieldKeys_${entity}`)
  } else {
    fieldKeyCache.clear()
  }
}

