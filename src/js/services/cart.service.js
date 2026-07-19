import { supabase } from '../config/supabase.js'

const LOCAL_KEY = 'virtual_store_cart'

function getLocal() { try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]') } catch { return [] } }
function setLocal(items) { localStorage.setItem(LOCAL_KEY, JSON.stringify(items)) }
function clearLocal() { localStorage.removeItem(LOCAL_KEY) }

export const cartService = {
  async getCart(userId) {
    if (!userId) return getLocal()
    const { data: cart } = await supabase.from('carts').select('id').eq('user_id', userId).maybeSingle()
    if (!cart) return []
    const { data } = await supabase.from('cart_items').select('*, product:products(*)').eq('cart_id', cart.id)
    return data || []
  },

  async addItem(userId, productId, quantity = 1) {
    const { data: product } = await supabase.from('products').select('*').eq('id', productId).single()
    if (!product || !product.is_active) throw new Error('Producto no disponible.')
    if (product.stock < quantity) throw new Error('Stock insuficiente.')

    if (!userId) {
      const cart = getLocal()
      const existing = cart.find(i => i.product_id === productId)
      if (existing) { existing.quantity = Math.min(existing.quantity + quantity, product.stock) }
      else { cart.push({ product_id: productId, quantity, unit_price: product.offer_price || product.price, product }) }
      setLocal(cart)
      return cart
    }

    let { data: cart } = await supabase.from('carts').select('id').eq('user_id', userId).maybeSingle()
    if (!cart) {
      const { data: nc } = await supabase.from('carts').insert({ user_id: userId }).select().single()
      cart = nc
    }

    const { data: existing } = await supabase.from('cart_items').select('*').eq('cart_id', cart.id).eq('product_id', productId).maybeSingle()
    if (existing) {
      const q = Math.min(existing.quantity + quantity, product.stock)
      await supabase.from('cart_items').update({ quantity: q, unit_price: product.offer_price || product.price }).eq('id', existing.id)
    } else {
      await supabase.from('cart_items').insert({ cart_id: cart.id, product_id: productId, quantity, unit_price: product.offer_price || product.price })
    }
    return this.getCart(userId)
  },

  async updateQuantity(userId, productId, quantity) {
    if (quantity < 1) return this.removeItem(userId, productId)
    if (!userId) {
      const cart = getLocal(); const item = cart.find(i => i.product_id === productId)
      if (item) item.quantity = quantity
      setLocal(cart); return cart
    }
    const { data: cart } = await supabase.from('carts').select('id').eq('user_id', userId).single()
    await supabase.from('cart_items').update({ quantity }).eq('cart_id', cart.id).eq('product_id', productId)
    return this.getCart(userId)
  },

  async removeItem(userId, productId) {
    if (!userId) { const cart = getLocal().filter(i => i.product_id !== productId); setLocal(cart); return cart }
    const { data: cart } = await supabase.from('carts').select('id').eq('user_id', userId).single()
    await supabase.from('cart_items').delete().eq('cart_id', cart.id).eq('product_id', productId)
    return this.getCart(userId)
  },

  async clearCart(userId) {
    if (!userId) { clearLocal(); return [] }
    const { data: cart } = await supabase.from('carts').select('id').eq('user_id', userId).single()
    if (cart) await supabase.from('cart_items').delete().eq('cart_id', cart.id)
    return []
  },

  async syncLocalCart(userId) {
    const items = getLocal()
    if (!items.length) return this.getCart(userId)
    for (const item of items) {
      try { await this.addItem(userId, item.product_id, item.quantity) } catch {}
    }
    clearLocal()
    return this.getCart(userId)
  },
}
