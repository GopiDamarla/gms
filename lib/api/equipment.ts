import { supabase, Equipment } from '@/lib/supabase';

export interface CreateEquipmentData {
  name: string;
  category: string;
  serial_number: string;
  location: string;
  purchase_date?: string;
  warranty_expiry?: string;
  next_maintenance?: string;
  notes?: string;
}

export interface UpdateEquipmentData extends Partial<CreateEquipmentData> {
  id: string;
  status?: 'operational' | 'maintenance' | 'out_of_order';
  last_maintenance?: string;
}

export const equipmentApi = {
  // Get all equipment
  async getAll(): Promise<Equipment[]> {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get equipment by ID
  async getById(id: string): Promise<Equipment | null> {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create new equipment
  async create(equipmentData: CreateEquipmentData): Promise<Equipment> {
    const { data, error } = await supabase
      .from('equipment')
      .insert({
        ...equipmentData,
        status: 'operational',
      })
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },

  // Update equipment
  async update(equipmentData: UpdateEquipmentData): Promise<Equipment> {
    const { id, ...updateData } = equipmentData;
    
    const { data, error } = await supabase
      .from('equipment')
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },

  // Delete equipment
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('equipment')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Schedule maintenance
  async scheduleMaintenance(id: string): Promise<Equipment> {
    const { data, error } = await supabase
      .from('equipment')
      .update({
        status: 'maintenance',
        last_maintenance: new Date().toISOString().split('T')[0],
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },

  // Get equipment by status
  async getByStatus(status: 'operational' | 'maintenance' | 'out_of_order'): Promise<Equipment[]> {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('status', status)
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get maintenance due equipment
  async getMaintenanceDue(): Promise<Equipment[]> {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .lte('next_maintenance', today)
      .eq('status', 'operational')
      .order('next_maintenance', { ascending: true });

    if (error) throw error;
    return data || [];
  },
};