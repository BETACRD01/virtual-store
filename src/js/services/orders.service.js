import { supabase } from '../config/supabase.js'
import { getUserErrorMessage } from '../utils/errors.js'

export const ordersService = {
  async createOrder(data) {
    const { data: result, error } = await supabase.rpc('create_order', {
      p_address_id: data.address_id,
      p_payment_method: data.payment_method,
      p_customer_notes: data.customer_notes || '',
      p_shipping_cost: data.shipping_cost || 0,
    })
    if (error) throw new Error(getUserErrorMessage(error))
    return result
  },

  async getMyOrders() {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    if (error) throw new Error(getUserErrorMessage(error))
    return data || []
  },

  async getMyOrderById(id) {
    const { data, error } = await supabase.from('orders').select('*, order_items(*), address:addresses(*), order_status_history(*)').eq('id', id).single()
    if (error) throw new Error(getUserErrorMessage(error))
    return data
  },

  async cancelOrder(id) {
    const { data, error } = await supabase.rpc('cancel_order', { p_order_id: id })
    if (error) throw new Error(getUserErrorMessage(error))
    return data
  },

  async getAllOrders() {
    const { data, error } = await supabase.from('orders').select('*, profile:user_id(full_name, email)').order('created_at', { ascending: false })
    if (error) throw new Error(getUserErrorMessage(error))
    return data || []
  },

  async getAdminOrderById(id) {
    const { data, error } = await supabase.from('orders').select('*, order_items(*), address:addresses(*), order_status_history(*), profile:user_id(full_name, email, phone)').eq('id', id).single()
    if (error) throw new Error(getUserErrorMessage(error))
    return data
  },

  async updateOrderStatus(id, newStatus, notes = '') {
    const { data, error } = await supabase.rpc('update_order_status', { p_order_id: id, p_new_status: newStatus, p_notes: notes })
    if (error) throw new Error(getUserErrorMessage(error))
    return data
  },
}
