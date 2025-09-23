import { supabase, Class, Trainer } from '@/lib/supabase';

export interface CreateClassData {
  name: string;
  trainer_id: string;
  start_time: string;
  end_time: string;
  capacity: number;
  location: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  description?: string;
  days_of_week: string[];
}

export interface UpdateClassData extends Partial<CreateClassData> {
  id: string;
}

export const classesApi = {
  // Get all classes with trainer details
  async getAll(): Promise<Class[]> {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        trainers (
          first_name,
          last_name,
          email
        )
      `)
      .eq('is_active', true)
      .order('start_time', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get class by ID
  async getById(id: string): Promise<Class | null> {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        trainers (
          first_name,
          last_name,
          email
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create new class
  async create(classData: CreateClassData): Promise<Class> {
    const { data, error } = await supabase
      .from('classes')
      .insert(classData)
      .select(`
        *,
        trainers (
          first_name,
          last_name,
          email
        )
      `)
      .single();

    if (error) throw error;
    return data;
  },

  // Update class
  async update(classData: UpdateClassData): Promise<Class> {
    const { id, ...updateData } = classData;
    
    const { data, error } = await supabase
      .from('classes')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        trainers (
          first_name,
          last_name,
          email
        )
      `)
      .single();

    if (error) throw error;
    return data;
  },

  // Delete class (soft delete by setting is_active to false)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('classes')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
  },

  // Book a class
  async bookClass(classId: string, memberId: string): Promise<void> {
    const { error } = await supabase
      .from('class_bookings')
      .insert({
        class_id: classId,
        member_id: memberId,
        booking_date: new Date().toISOString().split('T')[0],
        status: 'booked'
      });

    if (error) throw error;

    // Update current participants count
    const { error: updateError } = await supabase.rpc('increment_class_participants', {
      class_id: classId
    });

    if (updateError) throw updateError;
  },

  // Get class bookings
  async getBookings(classId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('class_bookings')
      .select(`
        *,
        members (
          first_name,
          last_name,
          email
        )
      `)
      .eq('class_id', classId)
      .eq('status', 'booked');

    if (error) throw error;
    return data || [];
  },
};

// Trainers API
export const trainersApi = {
  // Get all trainers
  async getAll(): Promise<Trainer[]> {
    const { data, error } = await supabase
      .from('trainers')
      .select('*')
      .order('first_name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get trainer by ID
  async getById(id: string): Promise<Trainer | null> {
    const { data, error } = await supabase
      .from('trainers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create new trainer
  async create(trainerData: Omit<Trainer, 'id' | 'created_at' | 'updated_at'>): Promise<Trainer> {
    const { data, error } = await supabase
      .from('trainers')
      .insert(trainerData)
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },

  // Update trainer
  async update(id: string, trainerData: Partial<Trainer>): Promise<Trainer> {
    const { data, error } = await supabase
      .from('trainers')
      .update(trainerData)
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },
};