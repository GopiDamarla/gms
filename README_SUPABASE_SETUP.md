# Supabase Setup Guide for Gym Management System

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: `gym-management-system`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
6. Click "Create new project"
7. Wait for the project to be created (2-3 minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Update Environment Variables

1. In your project, update the `.env.local` file with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 4: Run Database Migrations

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the content from `supabase/migrations/create_gym_schema.sql`
4. Click "Run" to create all tables
5. Create another new query
6. Copy and paste the content from `supabase/migrations/seed_initial_data.sql`
7. Click "Run" to populate sample data

## Step 5: Set Up Authentication (Optional)

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Under "Site URL", add your development URL: `http://localhost:3000`
3. Under "Redirect URLs", add: `http://localhost:3000/**`
4. Disable email confirmation for development:
   - Go to **Authentication** → **Settings** → **Email**
   - Turn off "Enable email confirmations"

## Step 6: Verify Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see all tables: `members`, `trainers`, `classes`, `equipment`, etc.
3. Check that sample data is populated in the tables

## Step 7: Test the Application

1. Restart your development server: `npm run dev`
2. The application should now connect to your Supabase database
3. Try adding a new member or viewing existing data

## Troubleshooting

### If you get connection errors:
1. Double-check your environment variables
2. Make sure the Supabase project is fully initialized
3. Check that RLS policies are properly set up

### If data doesn't appear:
1. Verify the migrations ran successfully
2. Check the browser console for any errors
3. Ensure the API functions are working in the Network tab

### Common Issues:
- **CORS errors**: Make sure your site URL is added in Supabase settings
- **RLS errors**: Ensure you're authenticated or policies allow public access
- **Type errors**: Make sure all TypeScript types match your database schema

## Database Schema Overview

### Main Tables:
- **membership_plans**: Available membership packages with Indian pricing
- **members**: Member profiles with payment tracking
- **trainers**: Trainer information and specializations
- **classes**: Fitness class schedules and details
- **equipment**: Gym equipment and maintenance tracking
- **payments**: Payment history and transactions
- **personal_training_sessions**: One-on-one training bookings
- **check_ins**: Member attendance tracking
- **class_bookings**: Class participation records

### Key Features:
- **Automatic calculations**: Pending amounts, expiry dates
- **Indian pricing**: All amounts in INR (₹)
- **Flexible payments**: Support for partial payments
- **Real-time sync**: All data updates across the application
- **Security**: Row Level Security enabled on all tables