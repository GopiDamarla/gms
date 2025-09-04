'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface TrainerFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export function TrainerForm({ onSubmit, onCancel, initialData }: TrainerFormProps) {
  const [formData, setFormData] = useState({
    firstName: initialData?.name?.split(' ')[0] || '',
    lastName: initialData?.name?.split(' ')[1] || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    specializations: initialData?.specializations?.join(', ') || '',
    experience: initialData?.experience || '',
    certifications: initialData?.certifications?.join(', ') || '',
    availability: initialData?.availability || 'Available',
    hourlyRate: initialData?.hourlyRate || '',
    bio: initialData?.bio || '',
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
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="experience">Experience</Label>
          <Select value={formData.experience} onValueChange={(value) => handleChange('experience', value)}>
            <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 year">1 year</SelectItem>
              <SelectItem value="2 years">2 years</SelectItem>
              <SelectItem value="3 years">3 years</SelectItem>
              <SelectItem value="4 years">4 years</SelectItem>
              <SelectItem value="5 years">5 years</SelectItem>
              <SelectItem value="6+ years">6+ years</SelectItem>
              <SelectItem value="10+ years">10+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="availability">Availability</Label>
          <Select value={formData.availability} onValueChange={(value) => handleChange('availability', value)}>
            <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200">
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Busy">Busy</SelectItem>
              <SelectItem value="Off Duty">Off Duty</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specializations">Specializations</Label>
        <Input
          id="specializations"
          value={formData.specializations}
          onChange={(e) => handleChange('specializations', e.target.value)}
          placeholder="e.g., Yoga, HIIT, Strength Training (comma separated)"
          className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="certifications">Certifications</Label>
        <Input
          id="certifications"
          value={formData.certifications}
          onChange={(e) => handleChange('certifications', e.target.value)}
          placeholder="e.g., NASM-CPT, RYT-500 (comma separated)"
          className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
        <Input
          id="hourlyRate"
          type="number"
          value={formData.hourlyRate}
          onChange={(e) => handleChange('hourlyRate', e.target.value)}
          min="0"
          step="0.01"
          className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
          rows={3}
          placeholder="Brief bio about the trainer..."
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button 
          type="submit" 
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
        >
          {initialData ? 'Update Trainer' : 'Add Trainer'}
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