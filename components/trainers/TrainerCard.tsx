'use client';

import { Star, Users, Clock, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Trainer {
  id: string;
  name: string;
  specializations: string[];
  experience: string;
  rating: number;
  activeClasses: number;
  availability: 'Available' | 'Busy' | 'Off Duty';
  certifications: string[];
  image?: string;
}

interface TrainerCardProps {
  trainer: Trainer;
  onView?: (trainer: Trainer) => void;
  onEdit?: (trainer: Trainer) => void;
}

export function TrainerCard({ trainer, onView, onEdit }: TrainerCardProps) {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-emerald-100 text-emerald-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      case 'Off Duty': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-orange-200 group-hover:ring-orange-400 transition-all duration-200">
              <AvatarImage src={trainer.image} alt={trainer.name} />
              <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg">
                {trainer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
                {trainer.name}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{trainer.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <Badge className={`${getAvailabilityColor(trainer.availability)} border-0`}>
            {trainer.availability}
          </Badge>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Award className="h-4 w-4" />
            <span>{trainer.experience} experience</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{trainer.activeClasses} active classes</span>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Specializations:</p>
          <div className="flex flex-wrap gap-1">
            {trainer.specializations.map((spec, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs hover:bg-orange-100 transition-colors duration-200"
              >
                {spec}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Certifications:</p>
          <div className="flex flex-wrap gap-1">
            {trainer.certifications.map((cert, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
              >
                {cert}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
            onClick={() => onView?.(trainer)}
          >
            View Profile
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit?.(trainer)}
            className="hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}