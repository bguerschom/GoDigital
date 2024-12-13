// src/config/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) throw new Error('Missing environment variable: VITE_SUPABASE_URL')
if (!supabaseAnonKey) throw new Error('Missing environment variable: VITE_SUPABASE_ANON_KEY')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// src/config/supabase.js
export const authApi = {
  async login(username, password) {
    const { data, error } = await supabase
      .rpc('verify_user_password', {
        p_username: username,
        p_password: password
      })
      .single()

    if (error) throw error
    if (!data) throw new Error('Invalid credentials')

    // Get user data if password is correct
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, username, fullname, role, status')
      .eq('username', username)
      .single()

    if (userError) throw userError
    if (userData.status !== 'active') throw new Error('Account is not active')

    // Update last_login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userData.id)

    return userData
  }
}
