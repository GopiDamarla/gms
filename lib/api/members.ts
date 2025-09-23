import { supabase, Member, MembershipPlan } from '@/lib/supabase';

export interface CreateMemberData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  membership_plan_id: string;
  membership_price: number;
  amount_paid: number;
  emergency_contact: string;
  emergency_phone: string;
  notes?: string;
}

export interface UpdateMemberData extends Partial<CreateMemberData> {
  id: string;
}

export const membersApi = {
  // Get all members with their membership plans
  async getAll(): Promise<Member[]> {
    const { data, error } = await supabase
      .from('members')
      .select(`
        *,
        membership_plans (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get member by ID
  async getById(id: string): Promise<Member | null> {
    const { data, error } = await supabase
      .from('members')
      .select(`
        *,
        membership_plans (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create new member
  async create(memberData: CreateMemberData): Promise<Member> {
    // Get membership plan to calculate expiry date
    const { data: plan, error: planError } = await supabase
      .from('membership_plans')
      .select('duration_months')
      .eq('id', memberData.membership_plan_id)
      .single();

    if (planError) throw planError;

    // Calculate expiry date
    const joinDate = new Date();
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + plan.duration_months);

    const { data, error } = await supabase
      .from('members')
      .insert({
        ...memberData,
        join_date: joinDate.toISOString().split('T')[0],
        expiry_date: expiryDate.toISOString().split('T')[0],
      })
      .select(`
        *,
        membership_plans (*)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  // Update member
  async update(memberData: UpdateMemberData): Promise<Member> {
    const { id, ...updateData } = memberData;
    
    const { data, error } = await supabase
      .from('members')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        membership_plans (*)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  // Delete member
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get expiring members (within 7 days)
  async getExpiring(): Promise<Member[]> {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const { data, error } = await supabase
      .from('members')
      .select(`
        *,
        membership_plans (*)
      `)
      .lte('expiry_date', sevenDaysFromNow.toISOString().split('T')[0])
      .gte('expiry_date', new Date().toISOString().split('T')[0])
      .eq('status', 'active');

    if (error) throw error;
    return data || [];
  },

  // Get expired members
  async getExpired(): Promise<Member[]> {
    const { data, error } = await supabase
      .from('members')
      .select(`
        *,
        membership_plans (*)
      `)
      .lt('expiry_date', new Date().toISOString().split('T')[0]);

    if (error) throw error;
    return data || [];
  },

  // Get members with pending payments
  async getPendingPayments(): Promise<Member[]> {
    const { data, error } = await supabase
      .from('members')
      .select(`
        *,
        membership_plans (*)
      `)
      .gt('pending_amount', 0);

    if (error) throw error;
    return data || [];
  },

  // Update member payment
  async updatePayment(id: string, amountPaid: number): Promise<Member> {
    const { data, error } = await supabase
      .from('members')
      .update({ amount_paid: amountPaid })
      .eq('id', id)
      .select(`
        *,
        membership_plans (*)
      `)
      .single();

    if (error) throw error;
    return data;
  },
};

// Membership Plans API
export const membershipPlansApi = {
  // Get all membership plans
  async getAll(): Promise<MembershipPlan[]> {
    const { data, error } = await supabase
      .from('membership_plans')
      .select('*')
      .eq('is_active', true)
      .order('type', { ascending: true })
      .order('duration_months', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get plan by ID
  async getById(id: string): Promise<MembershipPlan | null> {
    const { data, error } = await supabase
      .from('membership_plans')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },
};