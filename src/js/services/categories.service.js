import { supabase } from '../config/supabase.js';
import { getUserErrorMessage } from '../utils/errors.js';

export const categoriesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (error) throw new Error(getUserErrorMessage(error));
    return data || [];
  },

  async getActive() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('name');
    if (error) throw new Error(getUserErrorMessage(error));
    return data || [];
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(getUserErrorMessage(error));
    return data;
  },

  async create(category) {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single();
    if (error) throw new Error(getUserErrorMessage(error));
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(getUserErrorMessage(error));
    return data;
  },

  async toggleActive(id, isActive) {
    const { error } = await supabase
      .from('categories')
      .update({ is_active: isActive })
      .eq('id', id);
    if (error) throw new Error(getUserErrorMessage(error));
  },
};
