import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Debug both server and client
console.log('=== SUPABASE ENV DEBUG ===')
console.log('Server - Supabase URL:', supabaseUrl)
console.log('Server - Supabase Key length:', supabaseKey?.length)

// This will help debug client-side env vars
if (typeof window !== 'undefined') {
  console.log('Client - NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('Client - NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// Create a mock client for when Supabase is not configured
const createMockClient = () => ({
  from: () => ({
    select: () => ({
      order: () => ({
        eq: () => Promise.resolve({ data: [], error: null })
      })
    }),
    update: () => ({
      eq: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
    })
  })
})

let supabase = null
let supabaseAdmin = null

const shouldUseRealClient = !!(supabaseUrl && supabaseKey && supabaseUrl.trim() && supabaseKey.trim())
console.log('shouldUseRealClient:', shouldUseRealClient)
console.log('supabaseUrl length:', supabaseUrl?.length)
console.log('supabaseKey length:', supabaseKey?.length)

if (shouldUseRealClient) {
  console.log('✅ Creating REAL Supabase clients')
  supabase = createClient(supabaseUrl, supabaseKey)
  supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey)

  // Test the connection
  console.log('Testing Supabase connection...')
  supabase.from('strategy_calls').select('count').limit(1).then(result => {
    console.log('Supabase connection test result:', result)
  }).catch(err => {
    console.error('Supabase connection test failed:', err)
  })
} else {
  console.log('❌ Using MOCK clients')
  supabase = createMockClient()
  supabaseAdmin = createMockClient()
}

console.log('Final supabase client type:', supabase?.from ? 'real' : 'mock')

export { supabase, supabaseAdmin }