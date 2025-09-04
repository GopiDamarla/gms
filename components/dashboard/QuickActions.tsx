'use client';

import { useRouter } from 'next/navigation';
import { UserPlus, Calendar, CreditCard, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const actions = [
  {
    name: 'Add Member',
    description: 'Register a new gym member',
    icon: UserPlus,
    color: 'bg-emerald-500 hover:bg-emerald-600',
    href: '/members',
  },
  {
    name: 'Schedule Class',
    description: 'Create a new fitness class',
    icon: Calendar,
    color: 'bg-blue-500 hover:bg-blue-600',
    href: '/classes',
  },
  {
    name: 'Process Payment',
    description: 'Handle membership payments',
    icon: CreditCard,
    color: 'bg-orange-500 hover:bg-orange-600',
    href: '/payments',
  },
  {
    name: 'View Analytics',
    description: 'Check performance reports',
    icon: FileText,
    color: 'bg-purple-500 hover:bg-purple-600',
    href: '/analytics',
  },
];

export function QuickActions() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <Button
              key={action.name}
              variant="outline"
              className="w-full justify-start h-auto p-4 hover:shadow-md transition-all duration-200 transform hover:scale-105"
              onClick={() => router.push(action.href)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeIn 0.5s ease-out forwards',
              }}
            >
              <div className={`p-2 rounded-md ${action.color} mr-3 transition-transform duration-200 group-hover:rotate-6`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">{action.name}</div>
                <div className="text-xs text-gray-500">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}