import { supabase } from '../config/supabase.js'
import { getUserErrorMessage } from '../utils/errors.js'

export const authService = {
  async signUp({ email, password, fullName }) {
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } },
    })
    if (error) throw new Error(getUserErrorMessage(error))
    return data
  },

  async signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(getUserErrorMessage(error))
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(getUserErrorMessage(error))
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw new Error(getUserErrorMessage(error))
    return data.session
  },

  async getUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw new Error(getUserErrorMessage(error))
    return data.user
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) throw new Error(getUserErrorMessage(error))
    return data
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((event, session) => callback(event, session))
  },

  async resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}recuperar-password.html`,
    })
    if (error) throw new Error(getUserErrorMessage(error))
  },

  async updatePassword(password) {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw new Error(getUserErrorMessage(error))
  },

  async getProfile(userId) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
    if (error && error.code !== 'PGRST116') throw new Error(getUserErrorMessage(error))
    return data
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase.from('profiles').update(updates).eq('id', userId).select().single()
    if (error) throw new Error(getUserErrorMessage(error))
    return data
  },

  async getUserRole(userId) {
    const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).single()
    if (error) return 'customer'
    return data?.role || 'customer'
  },
}
