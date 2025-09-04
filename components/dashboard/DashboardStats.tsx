'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  {
    name: 'Total Members',
    value: '1,234',
    change: '+12%',
    changeType: 'increase',
    description: 'vs last month',
  },
  {
    name: 'Active Today',
    value: '89',
    change: '+5%',
    changeType: 'increase',
    description: 'members checked in',
  },
  {
    name: 'Monthly Revenue',
    value: '₹45,678',
    change: '+8%',
    changeType: 'increase',
    description: 'vs last month',
  },
  {
    name: 'Class Occupancy',
    value: '78%',
    change: '-3%',
    changeType: 'decrease',
    description: 'average this week',
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card 
          key={stat.name} 
          className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md"
          style={{
            animationDelay: `${index * 100}ms`,
            animation: 'fadeInUp 0.6s ease-out forwards',
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.name}</CardTitle>
            <div className={`flex items-center gap-1 text-sm ${
              stat.changeType === 'increase' ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {stat.changeType === 'increase' ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {stat.change}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <CardDescription className="text-xs text-gray-500 mt-1">
              {stat.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}