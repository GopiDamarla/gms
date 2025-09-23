import { supabase, CheckIn } from '@/lib/supabase';

export const checkInsApi = {
  // Get all active check-ins (not checked out)
  async getActive(): Promise<CheckIn[]> {
    const { data, error } = await supabase
      .from('check_ins')
      .select(`
        *,
        members (
          first_name,
          last_name,
          email,
          membership_plans (name)
        )
      `)
      .is('check_out_time', null)
      .order('check_in_time', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Check in a member
  async checkIn(memberId: string): Promise<CheckIn> {
    const { data, error } = await supabase
      .from('check_ins')
      .insert({
        member_id: memberId,
        check_in_time: new Date().toISOString(),
      })
      .select(`
        *,
        members (
          first_name,
          last_name,
          email,
          membership_plans (name)
        )
      `)
      .single();

    if (error) throw error;
    return data;
  },

  // Check out a member
  async checkOut(checkInId: string): Promise<CheckIn> {
    const { data, error } = await supabase
      .from('check_ins')
      .update({
        check_out_time: new Date().toISOString(),
      })
      .eq('id', checkInId)
      .select(`
        *,
        members (
          first_name,
          last_name,
          email,
          membership_plans (name)
        )
      `)
      .single();

    if (error) throw error;
    return data;
  },

  // Get check-in history
  async getHistory(limit: number = 50): Promise<CheckIn[]> {
    const { data, error } = await supabase
      .from('check_ins')
      .select(`
        *,
        members (
          first_name,
          last_name,
          email
        )
      `)
      .order('check_in_time', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Get daily check-in stats
  async getDailyStats(): Promise<{
    today: number;
    yesterday: number;
    thisWeek: number;
    currentlyIn: number;
  }> {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const [todayResult, yesterdayResult, weekResult, currentResult] = await Promise.all([
      supabase
        .from('check_ins')
        .select('id')
        .gte('check_in_time', `${today}T00:00:00`)
        .lt('check_in_time', `${today}T23:59:59`),
      
      supabase
        .from('check_ins')
        .select('id')
        .gte('check_in_time', `${yesterday}T00:00:00`)
        .lt('check_in_time', `${yesterday}T23:59:59`),
      
      supabase
        .from('check_ins')
        .select('id')
        .gte('check_in_time', `${weekAgo}T00:00:00`),
      
      supabase
        .from('check_ins')
        .select('id')
        .is('check_out_time', null)
    ]);

    return {
      today: todayResult.data?.length || 0,
      yesterday: yesterdayResult.data?.length || 0,
      thisWeek: weekResult.data?.length || 0,
      currentlyIn: currentResult.data?.length || 0,
    };
  },
};