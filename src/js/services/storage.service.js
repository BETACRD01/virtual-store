import { supabase } from '../config/supabase.js'

export const storageService = {
  async uploadProductImage(file, productId) {
    const ext = file.name.split('.').pop()
    const fileName = `${productId}/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('product-images').upload(fileName, file, { cacheControl: '3600', upsert: true })
    if (error) throw new Error('Error al subir la imagen.')
    const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
    return data.publicUrl
  },

  async deleteProductImage(url) {
    const path = url.split('/').slice(-2).join('/')
    await supabase.storage.from('product-images').remove([path])
  },

  async uploadAvatar(file, userId) {
    const ext = file.name.split('.').pop()
    const fileName = `${userId}/avatar.${ext}`
    const { data: existing } = await supabase.storage.from('avatars').list(userId)
    if (existing?.length) await supabase.storage.from('avatars').remove(existing.map(f => `${userId}/${f.name}`))
    const { error } = await supabase.storage.from('avatars').upload(fileName, file, { cacheControl: '3600', upsert: true })
    if (error) throw new Error('Error al subir el avatar.')
    const { data } = supabase.storage.from('avatars').getPublicUrl(fileName)
    return data.publicUrl
  },
}
