'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { UpcomingClasses } from '@/components/dashboard/UpcomingClasses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, CreditCard, Users } from 'lucide-react';
import { mockMembers, isExpiringSoon, isExpired } from '@/lib/data/mockData';

export default function Home() {
  const expiringMembers = mockMembers.filter(member => isExpiringSoon(member.expiryDate));
  const expiredMembers = mockMembers.filter(member => isExpired(member.expiryDate));
  const pendingPayments = mockMembers.filter(member => member.pendingAmount > 0);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your gym today.</p>
        </div>
        
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
                        ₹{pendingPayments.reduce((sum, member) => sum + member.pendingAmount, 0).toLocaleString('en-IN')} total
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