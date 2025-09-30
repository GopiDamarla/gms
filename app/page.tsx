'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { UpcomingClasses } from '@/components/dashboard/UpcomingClasses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TriangleAlert as AlertTriangle, Clock, CreditCard, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);

  useEffect(() => {
    checkDatabaseConnection();
  }, []);

  const checkDatabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('members').select('count').limit(1);
      if (error) {
        console.error('Database connection error:', error);
        setDbConnected(false);
      } else {
        setDbConnected(true);
        // Load actual data from database
        loadMembers();
      }
    } catch (error) {
      console.error('Database connection failed:', error);
      setDbConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const loadMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading members:', error);
      } else {
        setMembers(data || []);
      }
    } catch (error) {
      console.error('Error loading members:', error);
    }
  };

  const isExpiringSoon = (expiryDate: string): boolean => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const isExpired = (expiryDate: string): boolean => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    return expiry < today;
  };

  const expiringMembers = members.filter(member => isExpiringSoon(member.expiry_date));
  const expiredMembers = members.filter(member => isExpired(member.expiry_date));
  const pendingPayments = members.filter(member => member.pending_amount > 0);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your gym today.</p>
        </div>
        
        {/* Database Connection Status */}
        {!loading && (
          <Card className={`border-2 ${dbConnected ? 'border-emerald-200 bg-emerald-50' : 'border-orange-200 bg-orange-50'}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${dbConnected ? 'text-emerald-800' : 'text-orange-800'}`}>
                {dbConnected ? (
                  <>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    Database Connected
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    Database Setup Required
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dbConnected ? (
                <p className="text-emerald-700">
                  Successfully connected to Supabase database. All features are available.
                </p>
              ) : (
                <div className="space-y-3">
                  <p className="text-orange-700">
                    Please set up your Supabase database to use all features.
                  </p>
                  <div className="text-sm text-orange-600">
                    <p>1. Check the <code className="bg-orange-100 px-1 rounded">README_SUPABASE_SETUP.md</code> file for detailed instructions</p>
                    <p>2. Update your <code className="bg-orange-100 px-1 rounded">.env.local</code> file with Supabase credentials</p>
                    <p>3. Run the database migrations in Supabase SQL Editor</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Alerts Section */}
        {(expiringMembers.length > 0 || expiredMembers.length > 0 || pendingPayments.length > 0) && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Attention Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {expiredMembers.length > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium text-red-800">{expiredMembers.length} Expired</p>
                      <p className="text-sm text-red-600">Memberships need renewal</p>
                    </div>
                  </div>
                )}
                
                {expiringMembers.length > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-orange-100 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-orange-800">{expiringMembers.length} Expiring Soon</p>
                      <p className="text-sm text-orange-600">Within 7 days</p>
                    </div>
                  </div>
                )}
                
                {pendingPayments.length > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-yellow-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">{pendingPayments.length} Pending Payments</p>
                      <p className="text-sm text-yellow-600">
                        ₹{pendingPayments.reduce((sum, member) => sum + (member.pending_amount || 0), 0).toLocaleString('en-IN')} total
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <RecentActivity />
            <UpcomingClasses />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </Layout>
  );
}