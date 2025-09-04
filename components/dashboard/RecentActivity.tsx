'use client';

import { Clock, UserPlus, Calendar, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const activities = [
  {
    id: 1,
    type: 'member_join',
    title: 'New member joined',
    description: 'Sarah Johnson signed up for Premium plan',
    time: '2 minutes ago',
    icon: UserPlus,
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 2,
    type: 'class_booking',
    title: 'Class fully booked',
    description: 'Evening Yoga class is now at capacity',
    time: '15 minutes ago',
    icon: Calendar,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment received',
    description: 'Mike Chen paid monthly membership fee',
    time: '1 hour ago',
    icon: CreditCard,
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    id: 4,
    type: 'checkin',
    title: 'Peak hour alert',
    description: '45 members currently in the gym',
    time: '2 hours ago',
    icon: Clock,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your gym</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideInLeft 0.5s ease-out forwards',
              }}
            >
              <div className={`p-2 rounded-full ${activity.bgColor} transition-transform duration-200 hover:scale-110`}>
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}