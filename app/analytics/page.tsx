'use client';

import { Layout } from '@/components/layout/Layout';
import { MetricsChart } from '@/components/analytics/MetricsChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, TrendingUp, Users, Calendar } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Track performance and business metrics</p>
          </div>
          <Select defaultValue="30days">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$52,100</div>
              <p className="text-xs text-emerald-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-blue-600">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classes This Month</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-orange-600">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-red-600">-3% from last month</p>
            </CardContent>
          </Card>
        </div>

        <MetricsChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Classes</CardTitle>
              <CardDescription>Most attended classes this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'HIIT Training', attendance: 95, trainer: 'Mike Johnson' },
                  { name: 'Morning Yoga', attendance: 88, trainer: 'Emma Wilson' },
                  { name: 'Strength Training', attendance: 82, trainer: 'David Lee' },
                  { name: 'Evening Pilates', attendance: 76, trainer: 'Lisa Chen' },
                ].map((classItem, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{classItem.name}</p>
                      <p className="text-sm text-gray-600">with {classItem.trainer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-orange-600">{classItem.attendance}%</p>
                      <p className="text-xs text-gray-500">attendance</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Membership Distribution</CardTitle>
              <CardDescription>Current membership plan breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { plan: 'Premium', count: 456, percentage: 37, color: 'bg-orange-500' },
                  { plan: 'Basic', count: 389, percentage: 32, color: 'bg-blue-500' },
                  { plan: 'VIP', count: 234, percentage: 19, color: 'bg-purple-500' },
                  { plan: 'Student', count: 155, percentage: 12, color: 'bg-emerald-500' },
                ].map((plan, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900">{plan.plan}</span>
                      <span className="text-gray-600">{plan.count} members</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 ${plan.color} rounded-full transition-all duration-500`}
                        style={{ width: `${plan.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}