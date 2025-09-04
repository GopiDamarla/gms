'use client';

import { Clock, Users, MapPin, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export interface Class {
  id: string;
  name: string;
  trainer: string;
  time: string;
  duration: string;
  participants: number;
  capacity: number;
  location: string;
  difficulty: string;
  category: string;
}


interface Class {
  id: string;
  name: string;
  trainer: string;
  time: string;
  duration: string;
  participants: number;
  capacity: number;
  location: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

interface ClassCardProps {
  classItem: Class;
  onBook: (classItem: Class) => void;
  onEdit: (classItem: Class) => void;
}

export function ClassCard({ classItem, onBook, onEdit }: ClassCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isFullyBooked = classItem.participants >= classItem.capacity;
  const occupancyPercentage = (classItem.participants / classItem.capacity) * 100;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md group overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
              {classItem.name}
            </h3>
            <p className="text-sm text-gray-600">{classItem.category}</p>
          </div>
          <Badge className={`${getDifficultyColor(classItem.difficulty)} border-0`}>
            {classItem.difficulty}
          </Badge>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
              {classItem.trainer.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-700">{classItem.trainer}</span>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{classItem.time} ({classItem.duration})</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{classItem.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{classItem.participants}/{classItem.capacity} participants</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Capacity</span>
            <span>{occupancyPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
              style={{ width: `${occupancyPercentage}%` }}
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={isFullyBooked ? "secondary" : "default"} 
            size="sm" 
            className="flex-1 transition-all duration-200"
            disabled={isFullyBooked}
            onClick={() => onBook?.(classItem)}
          >
            {isFullyBooked ? 'Fully Booked' : 'Book Class'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit?.(classItem)}
            className="hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}