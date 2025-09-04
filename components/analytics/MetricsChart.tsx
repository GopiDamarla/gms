'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const membershipData = [
  { month: 'Jan', members: 950, revenue: 42000 },
  { month: 'Feb', members: 1020, revenue: 45100 },
  { month: 'Mar', members: 1150, revenue: 48200 },
  { month: 'Apr', members: 1180, revenue: 49800 },
  { month: 'May', members: 1220, revenue: 51200 },
  { month: 'Jun', members: 1234, revenue: 52100 },
];

const checkInData = [
  { day: 'Mon', checkIns: 180 },
  { day: 'Tue', checkIns: 165 },
  { day: 'Wed', checkIns: 195 },
  { day: 'Thu', checkIns: 170 },
  { day: 'Fri', checkIns: 220 },
  { day: 'Sat', checkIns: 280 },
  { day: 'Sun', checkIns: 150 },
];

export function MetricsChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Membership Growth</CardTitle>
          <CardDescription>Total members and revenue over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={membershipData}>
              <defs>
                <linearGradient id="memberGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Area 
                type="monotone" 
                dataKey="members" 
                stroke="#F97316" 
                fillOpacity={1} 
                fill="url(#memberGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Weekly Check-ins</CardTitle>
          <CardDescription>Daily member attendance this week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={checkInData}>
              <XAxis dataKey="day" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="checkIns" 
                stroke="#1E40AF" 
                strokeWidth={3}
                dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#1E40AF', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}