import { supabase, Payment } from '@/lib/supabase';

export interface CreatePaymentData {
  member_id: string;
  amount: number;
  payment_type: string;
  payment_method: 'Cash' | 'Credit Card' | 'Debit Card' | 'UPI' | 'Net Banking' | 'Bank Transfer' | 'Cheque';
  transaction_id?: string;
  notes?: string;
  payment_date?: string;
}

export const paymentsApi = {
  // Get all payments with member details
  async getAll(): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        members (
          first_name,
          last_name,
          email
        )
      `)
      .order('payment_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get payments by member ID
  async getByMemberId(memberId: string): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        members (
          first_name,
          last_name,
          email
        )
      `)
      .eq('member_id', memberId)
      .order('payment_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Create new payment
  async create(paymentData: CreatePaymentData): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .insert({
        ...paymentData,
        transaction_id: paymentData.transaction_id || `TXN-${Date.now()}`,
        payment_date: paymentData.payment_date || new Date().toISOString().split('T')[0],
        status: 'completed',
      })
      .select(`
        *,
        members (
          first_name,
          last_name,
          email
        )
      `)
      .single();

    if (error) throw error;

    // Update member's amount_paid
    if (data) {
      const { error: updateError } = await supabase.rpc('update_member_payment', {
        member_id: paymentData.member_id,
        payment_amount: paymentData.amount
      });

      if (updateError) {
        console.error('Error updating member payment:', updateError);
      }
    }

    return data;
  },

  // Get payment statistics
  async getStats(): Promise<{
    totalRevenue: number;
    monthlyRevenue: number;
    pendingPayments: number;
    completedPayments: number;
  }> {
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format

    const [totalResult, monthlyResult, pendingResult, completedResult] = await Promise.all([
      supabase
        .from('payments')
        .select('amount')
        .eq('status', 'completed'),
      
      supabase
        .from('payments')
        .select('amount')
        .eq('status', 'completed')
        .gte('payment_date', `${currentMonth}-01`)
        .lt('payment_date', `${currentMonth}-32`),
      
      supabase
        .from('payments')
        .select('id')
        .eq('status', 'pending'),
      
      supabase
        .from('payments')
        .select('id')
        .eq('status', 'completed')
    ]);

    const totalRevenue = totalResult.data?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
    const monthlyRevenue = monthlyResult.data?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
    const pendingPayments = pendingResult.data?.length || 0;
    const completedPayments = completedResult.data?.length || 0;

    return {
      totalRevenue,
      monthlyRevenue,
      pendingPayments,
      completedPayments,
    };
  },
};