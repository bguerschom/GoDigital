// src/config/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) throw new Error('Missing environment variable: VITE_SUPABASE_URL')
if (!supabaseAnonKey) throw new Error('Missing environment variable: VITE_SUPABASE_ANON_KEY')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const authApi = {
  async login(username, password) {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, fullname, role, status')
      .eq('username', username)
      .eq('password', password) // Note: In production, use proper password hashing
      .single()

    if (error) throw error
    if (!data) throw new Error('Invalid credentials')
    if (data.status !== 'active') throw new Error('Account is not active')

    // Update last_login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.id)

    return data
  },

  async getCurrentUser(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, fullname, role, status')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  async createUser(userData, createdBy) {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          ...userData,
          created_by: createdBy,
          status: 'active',
        }
      ])
      .select()
      .single()

    if (error) throw error
    return data
  }
}
