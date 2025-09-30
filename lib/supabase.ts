import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface MembershipPlan {
  id: string;
  name: string;
  duration_months: number;
  type: 'single' | 'couple';
  price: number;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  membership_plan_id: string;
  membership_price: number;
  amount_paid: number;
  pending_amount: number;
  join_date: string;
  expiry_date: string;
  status: 'active' | 'inactive' | 'expired';
  emergency_contact: string;
  emergency_phone: string;
  notes?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  membership_plans?: MembershipPlan;
}

export interface Trainer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  specializations: string[];
  experience_years: number;
  certifications: string[];
  hourly_rate: number;
  availability: 'Available' | 'Busy' | 'Off Duty';
  rating: number;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Class {
  id: string;
  name: string;
  trainer_id: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  capacity: number;
  current_participants: number;
  location: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  description?: string;
  days_of_week: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  trainers?: Trainer;
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  serial_number: string;
  location: string;
  status: 'operational' | 'maintenance' | 'out_of_order';
  purchase_date?: string;
  warranty_expiry?: string;
  last_maintenance?: string;
  next_maintenance?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  member_id: string;
  amount: number;
  payment_type: string;
  payment_method: 'Cash' | 'Credit Card' | 'Debit Card' | 'UPI' | 'Net Banking' | 'Bank Transfer' | 'Cheque';
  status: 'completed' | 'pending' | 'failed';
  transaction_id?: string;
  notes?: string;
  payment_date: string;
  created_at: string;
  updated_at: string;
  members?: Member;
}

export interface PersonalTrainingSession {
  id: string;
  member_id: string;
  trainer_id: string;
  session_date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  rate: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  members?: Member;
  trainers?: Trainer;
}

export interface CheckIn {
  id: string;
  member_id: string;
  check_in_time: string;
  check_out_time?: string;
  duration_minutes?: number;
  created_at: string;
  members?: Member;
}

export interface ClassBooking {
  id: string;
  member_id: string;
  class_id: string;
  booking_date: string;
  status: 'booked' | 'attended' | 'cancelled' | 'no_show';
  created_at: string;
  updated_at: string;
  members?: Member;
  classes?: Class;
}

// Helper functions for date calculations
export const isExpiringSoon = (expiryDate: string): boolean => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7 && diffDays > 0;
};

export const isExpired = (expiryDate: string): boolean => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  return expiry < today;
};

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};