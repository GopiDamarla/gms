/*
  # Seed Initial Data for Gym Management System

  1. Membership Plans
    - Single and couple plans with Indian pricing
    - Different duration options

  2. Sample Data
    - Trainers with specializations
    - Equipment records
    - Sample members for testing
*/

-- Insert membership plans
INSERT INTO membership_plans (name, duration_months, type, price, description) VALUES
-- Single Plans
('Single - 1 Month', 1, 'single', 2500.00, 'Basic monthly membership for individuals'),
('Single - 3 Months', 3, 'single', 6900.00, 'Quarterly membership with 8% savings'),
('Single - 6 Months', 6, 'single', 12500.00, 'Half-yearly membership with 17% savings'),
('Single - 12 Months', 12, 'single', 22000.00, 'Annual membership with 27% savings'),

-- Couple Plans
('Couple - 1 Month', 1, 'couple', 4200.00, 'Monthly membership for couples'),
('Couple - 3 Months', 3, 'couple', 11500.00, 'Quarterly couple membership with 8% savings'),
('Couple - 6 Months', 6, 'couple', 21000.00, 'Half-yearly couple membership with 17% savings'),
('Couple - 12 Months', 12, 'couple', 38000.00, 'Annual couple membership with 25% savings');

-- Insert sample trainers
INSERT INTO trainers (first_name, last_name, email, phone, specializations, experience_years, certifications, hourly_rate, availability, rating, bio) VALUES
('Emma', 'Wilson', 'emma.wilson@fitprogym.com', '+91 9876543214', ARRAY['Yoga', 'Pilates', 'Flexibility'], 5, ARRAY['RYT-500', 'Pilates Method Alliance'], 1200.00, 'Available', 4.9, 'Certified yoga instructor with expertise in Hatha and Vinyasa styles'),
('Mike', 'Johnson', 'mike.johnson@fitprogym.com', '+91 9876543215', ARRAY['HIIT', 'CrossFit', 'Strength Training'], 8, ARRAY['NASM-CPT', 'CrossFit Level 2'], 1500.00, 'Busy', 4.8, 'High-intensity training specialist with competitive background'),
('David', 'Lee', 'david.lee@fitprogym.com', '+91 9876543216', ARRAY['Powerlifting', 'Bodybuilding', 'Nutrition'], 10, ARRAY['NSCA-CSCS', 'Precision Nutrition'], 1800.00, 'Available', 4.7, 'Strength and conditioning coach with nutrition expertise'),
('Lisa', 'Chen', 'lisa.chen@fitprogym.com', '+91 9876543217', ARRAY['Pilates', 'Dance', 'Flexibility'], 6, ARRAY['PMA-CPT', 'Dance Fitness Certified'], 1300.00, 'Available', 4.8, 'Dance fitness and Pilates instructor with creative choreography');

-- Insert sample equipment
INSERT INTO equipment (name, category, serial_number, location, status, purchase_date, warranty_expiry, last_maintenance, next_maintenance) VALUES
('Treadmill Pro X1', 'Cardio', 'TM-2024-001', 'Cardio Zone', 'operational', '2024-01-15', '2026-01-15', '2024-03-15', '2024-06-15'),
('Olympic Barbell Set', 'Strength', 'OB-2023-045', 'Weight Room', 'maintenance', '2023-06-20', '2025-06-20', '2024-02-28', '2024-04-01'),
('Cable Machine Deluxe', 'Strength', 'CM-2022-012', 'Main Floor', 'out_of_order', '2022-08-10', '2024-08-10', '2024-01-20', 'Pending Repair'),
('Elliptical Trainer', 'Cardio', 'ET-2024-002', 'Cardio Zone', 'operational', '2024-02-01', '2026-02-01', '2024-03-01', '2024-06-01'),
('Leg Press Machine', 'Strength', 'LP-2023-020', 'Weight Room', 'operational', '2023-05-15', '2025-05-15', '2024-02-15', '2024-05-15');

-- Insert sample classes
INSERT INTO classes (name, trainer_id, start_time, end_time, capacity, location, difficulty, category, description, days_of_week) VALUES
('Morning Yoga', (SELECT id FROM trainers WHERE email = 'emma.wilson@fitprogym.com'), '08:00', '09:00', 15, 'Studio A', 'Beginner', 'Mind & Body', 'Gentle morning yoga to start your day', ARRAY['Monday', 'Wednesday', 'Friday']),
('HIIT Training', (SELECT id FROM trainers WHERE email = 'mike.johnson@fitprogym.com'), '10:00', '11:00', 20, 'Main Floor', 'Advanced', 'High Intensity', 'High-intensity interval training for maximum results', ARRAY['Tuesday', 'Thursday', 'Saturday']),
('Strength Training', (SELECT id FROM trainers WHERE email = 'david.lee@fitprogym.com'), '14:00', '15:30', 12, 'Weight Room', 'Intermediate', 'Strength', 'Build muscle and strength with proper form', ARRAY['Monday', 'Wednesday', 'Friday']),
('Evening Pilates', (SELECT id FROM trainers WHERE email = 'lisa.chen@fitprogym.com'), '18:00', '19:00', 20, 'Studio B', 'Beginner', 'Mind & Body', 'Core strengthening and flexibility', ARRAY['Tuesday', 'Thursday']);

-- Insert sample members
INSERT INTO members (first_name, last_name, email, phone, membership_plan_id, membership_price, amount_paid, join_date, expiry_date, emergency_contact, emergency_phone, notes) VALUES
('Kota', 'Akila', 'avinashn@email.com', '+91 9502055761', 
 (SELECT id FROM membership_plans WHERE name = 'Single - 3 Months'), 6900.00, 6900.00, 
 '2024-01-15', '2024-04-15', 'Ravi Akila', '+91 9876543210', 'Regular member, prefers morning classes'),

('Surya', 'Krishna', 'surya@email.com', '+91 8658324499', 
 (SELECT id FROM membership_plans WHERE name = 'Single - 1 Month'), 2500.00, 1500.00, 
 '2024-02-03', '2024-03-03', 'Lakshmi Krishna', '+91 9876543211', 'Partial payment pending'),

('Avvaru', 'Monika', 'monika@email.com', '+91 9955868422', 
 (SELECT id FROM membership_plans WHERE name = 'Couple - 6 Months'), 21000.00, 15000.00, 
 '2023-12-20', '2024-06-20', 'Ravi Avvaru', '+91 9876543212', 'Couple membership with spouse'),

('M', 'Bablu', 'bablu@email.com', '+91 7705889645', 
 (SELECT id FROM membership_plans WHERE name = 'Single - 1 Month'), 2500.00, 2500.00, 
 '2024-03-08', '2024-04-08', 'Sita Bablu', '+91 9876543213', 'Expiring soon, needs renewal reminder');

-- Insert sample payments
INSERT INTO payments (member_id, amount, payment_type, payment_method, status, transaction_id, payment_date) VALUES
((SELECT id FROM members WHERE email = 'avinashn@email.com'), 6900.00, 'Single - 3 Months', 'UPI', 'completed', 'TXN-001234', '2024-01-15'),
((SELECT id FROM members WHERE email = 'surya@email.com'), 1500.00, 'Partial Payment', 'Cash', 'completed', 'TXN-001235', '2024-02-03'),
((SELECT id FROM members WHERE email = 'monika@email.com'), 15000.00, 'Partial Payment', 'Bank Transfer', 'completed', 'TXN-001236', '2023-12-20'),
((SELECT id FROM members WHERE email = 'bablu@email.com'), 2500.00, 'Single - 1 Month', 'Credit Card', 'completed', 'TXN-001237', '2024-03-08');

-- Insert sample check-ins (some still active)
INSERT INTO check_ins (member_id, check_in_time, check_out_time) VALUES
((SELECT id FROM members WHERE email = 'avinashn@email.com'), '2024-03-20 08:30:00+00', '2024-03-20 10:00:00+00'),
((SELECT id FROM members WHERE email = 'monika@email.com'), '2024-03-20 09:15:00+00', '2024-03-20 10:00:00+00'),
((SELECT id FROM members WHERE email = 'bablu@email.com'), '2024-03-20 07:45:00+00', NULL); -- Still checked in