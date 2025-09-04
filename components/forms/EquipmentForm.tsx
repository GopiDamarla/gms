'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface EquipmentFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export function EquipmentForm({ onSubmit, onCancel, initialData }: EquipmentFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    location: initialData?.location || '',
    serialNumber: initialData?.serialNumber || '',
    purchaseDate: initialData?.purchaseDate || '',
    warrantyExpiry: initialData?.warrantyExpiry || '',
    nextMaintenance: initialData?.nextMaintenance || '',
    notes: initialData?.notes || '',
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
          <Label htmlFor="name">Equipment Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            required
          />
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
              <SelectItem value="Free Weights">Free Weights</SelectItem>
              <SelectItem value="Functional">Functional</SelectItem>
              <SelectItem value="Recovery">Recovery</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select value={formData.location} onValueChange={(value) => handleChange('location', value)}>
            <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Main Floor">Main Floor</SelectItem>
              <SelectItem value="Weight Room">Weight Room</SelectItem>
              <SelectItem value="Cardio Zone">Cardio Zone</SelectItem>
              <SelectItem value="Studio A">Studio A</SelectItem>
              <SelectItem value="Studio B">Studio B</SelectItem>
              <SelectItem value="Storage">Storage</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="serialNumber">Serial Number</Label>
          <Input
            id="serialNumber"
            value={formData.serialNumber}
            onChange={(e) => handleChange('serialNumber', e.target.value)}
            className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="purchaseDate">Purchase Date</Label>
          <Input
            id="purchaseDate"
            type="date"
            value={formData.purchaseDate}
            onChange={(e) => handleChange('purchaseDate', e.target.value)}
            className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="warrantyExpiry">Warranty Expiry</Label>
          <Input
            id="warrantyExpiry"
            type="date"
            value={formData.warrantyExpiry}
            onChange={(e) => handleChange('warrantyExpiry', e.target.value)}
            className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nextMaintenance">Next Maintenance Date</Label>
        <Input
          id="nextMaintenance"
          type="date"
          value={formData.nextMaintenance}
          onChange={(e) => handleChange('nextMaintenance', e.target.value)}
          className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
          rows={3}
          placeholder="Any additional notes about the equipment..."
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button 
          type="submit" 
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
        >
          {initialData ? 'Update Equipment' : 'Add Equipment'}
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