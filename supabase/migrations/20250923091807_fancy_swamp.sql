/*
  # Gym Management System Database Schema

  1. New Tables
    - `members` - Store member information and membership details
    - `trainers` - Store trainer profiles and specializations
    - `classes` - Store fitness class schedules and details
    - `equipment` - Store gym equipment and maintenance records
    - `payments` - Store payment transactions and history
    - `personal_training_sessions` - Store personal training bookings
    - `check_ins` - Store member check-in/check-out records
    - `membership_plans` - Store available membership plans and pricing

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
    - Add admin policies for gym management

  3. Features
    - Automatic timestamps
    - Foreign key relationships
    - Proper indexing for performance
    - Data validation constraints
*/

-- Create membership plans table
CREATE TABLE IF NOT EXISTS membership_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  duration_months integer NOT NULL,
  type text NOT NULL CHECK (type IN ('single', 'couple')),
  price decimal(10,2) NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  membership_plan_id uuid REFERENCES membership_plans(id),
  membership_price decimal(10,2) NOT NULL DEFAULT 0,
  amount_paid decimal(10,2) NOT NULL DEFAULT 0,
  pending_amount decimal(10,2) GENERATED ALWAYS AS (membership_price - amount_paid) STORED,
  join_date date DEFAULT CURRENT_DATE,
  expiry_date date NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  emergency_contact text NOT NULL,
  emergency_phone text NOT NULL,
  notes text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create trainers table
CREATE TABLE IF NOT EXISTS trainers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  specializations text[] DEFAULT '{}',
  experience_years integer DEFAULT 0,
  certifications text[] DEFAULT '{}',
  hourly_rate decimal(10,2) DEFAULT 0,
  availability text DEFAULT 'Available' CHECK (availability IN ('Available', 'Busy', 'Off Duty')),
  rating decimal(3,2) DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  bio text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create classes table
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  trainer_id uuid REFERENCES trainers(id),
  start_time time NOT NULL,
  end_time time NOT NULL,
  duration_minutes integer GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (end_time - start_time))/60) STORED,
  capacity integer NOT NULL DEFAULT 20,
  current_participants integer DEFAULT 0,
  location text NOT NULL,
  difficulty text DEFAULT 'Beginner' CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  category text NOT NULL,
  description text,
  days_of_week text[] DEFAULT '{}', -- ['Monday', 'Wednesday', 'Friday']
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create equipment table
CREATE TABLE IF NOT EXISTS equipment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  serial_number text UNIQUE NOT NULL,
  location text NOT NULL,
  status text DEFAULT 'operational' CHECK (status IN ('operational', 'maintenance', 'out_of_order')),
  purchase_date date,
  warranty_expiry date,
  last_maintenance date,
  next_maintenance date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid REFERENCES members(id),
  amount decimal(10,2) NOT NULL,
  payment_type text NOT NULL,
  payment_method text NOT NULL CHECK (payment_method IN ('Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Bank Transfer', 'Cheque')),
  status text DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'failed')),
  transaction_id text UNIQUE,
  notes text,
  payment_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create personal training sessions table
CREATE TABLE IF NOT EXISTS personal_training_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid REFERENCES members(id),
  trainer_id uuid REFERENCES trainers(id),
  session_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  duration_minutes integer GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (end_time - start_time))/60) STORED,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  rate decimal(10,2) NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create check-ins table
CREATE TABLE IF NOT EXISTS check_ins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid REFERENCES members(id),
  check_in_time timestamptz DEFAULT now(),
  check_out_time timestamptz,
  duration_minutes integer GENERATED ALWAYS AS (
    CASE 
      WHEN check_out_time IS NOT NULL 
      THEN EXTRACT(EPOCH FROM (check_out_time - check_in_time))/60 
      ELSE NULL 
    END
  ) STORED,
  created_at timestamptz DEFAULT now()
);

-- Create class bookings table
CREATE TABLE IF NOT EXISTS class_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid REFERENCES members(id),
  class_id uuid REFERENCES classes(id),
  booking_date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'booked' CHECK (status IN ('booked', 'attended', 'cancelled', 'no_show')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(member_id, class_id, booking_date)
);

-- Enable Row Level Security
ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (gym staff/admin)
CREATE POLICY "Allow all operations for authenticated users" ON membership_plans FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON members FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON trainers FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON classes FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON equipment FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON payments FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON personal_training_sessions FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON check_ins FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON class_bookings FOR ALL TO authenticated USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_expiry_date ON members(expiry_date);
CREATE INDEX IF NOT EXISTS idx_members_status ON members(status);
CREATE INDEX IF NOT EXISTS idx_trainers_email ON trainers(email);
CREATE INDEX IF NOT EXISTS idx_classes_trainer_id ON classes(trainer_id);
CREATE INDEX IF NOT EXISTS idx_payments_member_id ON payments(member_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date);
CREATE INDEX IF NOT EXISTS idx_check_ins_member_id ON check_ins(member_id);
CREATE INDEX IF NOT EXISTS idx_check_ins_check_in_time ON check_ins(check_in_time);
CREATE INDEX IF NOT EXISTS idx_class_bookings_member_id ON class_bookings(member_id);
CREATE INDEX IF NOT EXISTS idx_class_bookings_class_id ON class_bookings(class_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_membership_plans_updated_at BEFORE UPDATE ON membership_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trainers_updated_at BEFORE UPDATE ON trainers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_equipment_updated_at BEFORE UPDATE ON equipment FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_personal_training_sessions_updated_at BEFORE UPDATE ON personal_training_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_class_bookings_updated_at BEFORE UPDATE ON class_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();