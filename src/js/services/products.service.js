import { supabase } from '../config/supabase.js'
import { getUserErrorMessage } from '../utils/errors.js'

export const productsService = {
  async getProducts({ categoryId, search, featured, offers, sort, page = 1, limit = 12 } = {}) {
    let query = supabase
      .from('products')
      .select('*, category:categories(name, slug)', { count: 'exact' })
      .eq('is_active', true)
    if (categoryId) query = query.eq('category_id', categoryId)
    if (search) query = query.ilike('name', `%${search}%`)
    if (featured) query = query.eq('is_featured', true)
    if (offers) query = query.not('offer_price', 'is', null).not('offer_price', 'eq', 0)
    if (sort === 'price_asc') query = query.order('price', { ascending: true })
    else if (sort === 'price_desc') query = query.order('price', { ascending: false })
    else if (sort === 'name_asc') query = query.order('name', { ascending: true })
    else if (sort === 'name_desc') query = query.order('name', { ascending: false })
    else query = query.order('created_at', { ascending: false })
    const from = (page - 1) * limit
    const { data, error, count } = await query.range(from, from + limit - 1)
    if (error) throw new Error(getUserErrorMessage(error))
    return { products: data || [], count: count || 0 }
  },

  async getProductBySlug(slug) {
    const { data, error } = await supabase.from('products').select('*, category:categories(name, slug)').eq('slug', slug).eq('is_active', true).single()
    if (error) throw new Error(getUserErrorMessage(error))
    return data
  },

  async getProductById(id) {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
    if (error && error.code !== 'PGRST116') throw new Error(getUserErrorMessage(error))
    return data
  },

  async getProductImages(productId) {
    const { data, error } = await supabase.from('product_images').select('*').eq('product_id', productId).order('display_order')
    if (error) throw new Error(getUserErrorMessage(error))
    return data || []
  },

  async getActiveCategories() {
    const { data, error } = await supabase.from('categories').select('*').eq('is_active', true).order('name')
    if (error) throw new Error(getUserErrorMessage(error))
    return data || []
  },

  async getFeaturedProducts(limit = 8) {
    const { data, error } = await supabase.from('products').select('*, category:categories(name, slug)').eq('is_active', true).eq('is_featured', true).limit(limit)
    if (error) throw new Error(getUserErrorMessage(error))
    return data || []
  },

  async getOfferProducts(limit = 8) {
    const { data, error } = await supabase.from('products').select('*, category:categories(name, slug)').eq('is_active', true).not('offer_price', 'is', null).not('offer_price', 'eq', 0).limit(limit)
    if (error) throw new Error(getUserErrorMessage(error))
    return data || []
  },
}
