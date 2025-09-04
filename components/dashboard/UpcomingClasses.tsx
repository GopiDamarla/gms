'use client';

import { Clock, Users, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const classes = [
  {
    id: 1,
    name: 'Morning Yoga',
    trainer: 'Emma Wilson',
    time: '8:00 AM - 9:00 AM',
    participants: 12,
    capacity: 15,
    location: 'Studio A',
    status: 'upcoming',
  },
  {
    id: 2,
    name: 'HIIT Training',
    trainer: 'Mike Johnson',
    time: '10:00 AM - 11:00 AM',
    participants: 20,
    capacity: 20,
    location: 'Main Floor',
    status: 'full',
  },
  {
    id: 3,
    name: 'Strength Training',
    trainer: 'David Lee',
    time: '2:00 PM - 3:00 PM',
    participants: 8,
    capacity: 12,
    location: 'Weight Room',
    status: 'available',
  },
  {
    id: 4,
    name: 'Evening Pilates',
    trainer: 'Lisa Chen',
    time: '6:00 PM - 7:00 PM',
    participants: 18,
    capacity: 20,
    location: 'Studio B',
    status: 'upcoming',
  },
];

export function UpcomingClasses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Classes</CardTitle>
        <CardDescription>Scheduled fitness classes and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {classes.map((classItem, index) => (
            <div 
              key={classItem.id} 
              className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all duration-200 hover:border-orange-200"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideInRight 0.5s ease-out forwards',
              }}
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    {classItem.trainer.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-gray-900">{classItem.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {classItem.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {classItem.location}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">with {classItem.trainer}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{classItem.participants}/{classItem.capacity}</span>
                </div>
                <Badge 
                  variant={classItem.status === 'full' ? 'destructive' : 
                          classItem.status === 'available' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {classItem.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}