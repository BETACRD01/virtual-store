import { supabase } from '../config/supabase.js'
import { getUserErrorMessage } from '../utils/errors.js'

export const profileService = {
  async getProfile(userId) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
    if (error) throw new Error(getUserErrorMessage(error))
    return data
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase.from('profiles').update(updates).eq('id', userId).select().single()
    if (error) throw new Error(getUserErrorMessage(error))
    return data
  },

  async getAddresses(userId) {
    const { data, error } = await supabase.from('addresses').select('*').eq('user_id', userId).order('is_default', { ascending: false })
    if (error) throw new Error(getUserErrorMessage(error))
    return data || []
  },

  async createAddress(address) {
    const { data, error } = await supabase.from('addresses').insert(address).select().single()
    if (error) throw new Error(getUserErrorMessage(error))
    return data
  },

  async updateAddress(id, updates) {
    const { data, error } = await supabase.from('addresses').update(updates).eq('id', id).select().single()
    if (error) throw new Error(getUserErrorMessage(error))
    return data
  },

  async deleteAddress(id) {
    const { error } = await supabase.from('addresses').delete().eq('id', id)
    if (error) throw new Error(getUserErrorMessage(error))
  },

  async setDefaultAddress(userId, id) {
    await supabase.from('addresses').update({ is_default: false }).eq('user_id', userId)
    const { error } = await supabase.from('addresses').update({ is_default: true }).eq('id', id)
    if (error) throw new Error(getUserErrorMessage(error))
  },

  async getFavorites(userId) {
    const { data, error } = await supabase.from('favorites').select('*, product:products(*)').eq('user_id', userId)
    if (error) throw new Error(getUserErrorMessage(error))
    return data || []
  },

  async addFavorite(userId, productId) {
    const { error } = await supabase.from('favorites').insert({ user_id: userId, product_id: productId })
    if (error && error.code !== '23505') throw new Error(getUserErrorMessage(error))
  },

  async removeFavorite(userId, productId) {
    const { error } = await supabase.from('favorites').delete().eq('user_id', userId).eq('product_id', productId)
    if (error) throw new Error(getUserErrorMessage(error))
  },

  async isFavorite(userId, productId) {
    const { data } = await supabase.from('favorites').select('id').eq('user_id', userId).eq('product_id', productId).maybeSingle()
    return !!data
  },
}
