'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Class } from '@/components/classes/ClassCard';
import { Textarea } from '@/components/ui/textarea';

interface ClassFormProps {
  onSubmit: (data: Partial<Class>) => void;
  onCancel: () => void;
  initialData?: Class;
}

export function ClassForm({ onSubmit, onCancel, initialData }: ClassFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    trainer: initialData?.trainer || '',
    time: initialData?.time || '',
    duration: initialData?.duration || '',
    capacity: initialData?.capacity || '',
    location: initialData?.location || '',
    difficulty: initialData?.difficulty || '',
    category: initialData?.category || '',
    description: initialData?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Class Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="trainer">Trainer</Label>
          <Select value={formData.trainer} onValueChange={(value) => handleChange('trainer', value)}>
            <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200">
              <SelectValue placeholder="Select trainer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Emma Wilson">Emma Wilson</SelectItem>
              <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
              <SelectItem value="David Lee">David Lee</SelectItem>
              <SelectItem value="Lisa Chen">Lisa Chen</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            value={formData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            placeholder="e.g., 8:00 AM - 9:00 AM"
            className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Select value={formData.duration} onValueChange={(value) => handleChange('duration', value)}>
            <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30 minutes">30 minutes</SelectItem>
              <SelectItem value="45 minutes">45 minutes</SelectItem>
              <SelectItem value="60 minutes">60 minutes</SelectItem>
              <SelectItem value="90 minutes">90 minutes</SelectItem>
              <SelectItem value="120 minutes">120 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => handleChange('capacity', e.target.value)}
            min="1"
            max="50"
            className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select value={formData.location} onValueChange={(value) => handleChange('location', value)}>
            <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Studio A">Studio A</SelectItem>
              <SelectItem value="Studio B">Studio B</SelectItem>
              <SelectItem value="Main Floor">Main Floor</SelectItem>
              <SelectItem value="Weight Room">Weight Room</SelectItem>
              <SelectItem value="Cardio Zone">Cardio Zone</SelectItem>
              <SelectItem value="Outdoor Area">Outdoor Area</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select value={formData.difficulty} onValueChange={(value) => handleChange('difficulty', value)}>
            <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
            <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cardio">Cardio</SelectItem>
              <SelectItem value="Strength">Strength</SelectItem>
              <SelectItem value="Flexibility">Flexibility</SelectItem>
              <SelectItem value="Mind & Body">Mind & Body</SelectItem>
              <SelectItem value="High Intensity">High Intensity</SelectItem>
              <SelectItem value="Dance">Dance</SelectItem>
              <SelectItem value="Martial Arts">Martial Arts</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
          rows={3}
          placeholder="Brief description of the class..."
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button 
          type="submit" 
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
        >
          {initialData ? 'Update Class' : 'Add Class'}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="hover:bg-gray-50 transition-all duration-200"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}