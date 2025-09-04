'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { membershipPlans } from '@/lib/data/mockData';

interface MemberFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export function MemberForm({ onSubmit, onCancel, initialData }: MemberFormProps) {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    membershipType: initialData?.membershipType || '',
    membershipPrice: initialData?.membershipPrice || 0,
    amountPaid: initialData?.amountPaid || 0,
    emergencyContact: initialData?.emergencyContact || '',
    emergencyPhone: initialData?.emergencyPhone || '',
    notes: initialData?.notes || '',
  });

  const selectedPlan = membershipPlans.find(plan => plan.name === formData.membershipType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pendingAmount = formData.membershipPrice - formData.amountPaid;
    
    // Calculate expiry date based on membership duration
    const joinDate = new Date();
    const expiryDate = new Date();
    if (selectedPlan) {
      expiryDate.setMonth(expiryDate.getMonth() + selectedPlan.duration);
    }
    
    onSubmit({
      ...formData,
      pendingAmount,
      joinDate: joinDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      expiryDate: expiryDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
    });
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMembershipChange = (planName: string) => {
    const plan = membershipPlans.find(p => p.name === planName);
    setFormData(prev => ({
      ...prev,
      membershipType: planName,
      membershipPrice: plan?.price || 0,
      amountPaid: plan?.price || 0, // Default to full amount
    }));
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

      <div className="space-y-2">
        <Label htmlFor="membershipType">Membership Plan</Label>
        <Select value={formData.membershipType} onValueChange={handleMembershipChange}>
          <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200">
            <SelectValue placeholder="Select membership plan" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Single Plans</div>
            {membershipPlans.filter(plan => plan.type === 'single').map(plan => (
              <SelectItem key={plan.id} value={plan.name}>
                {plan.name} - ₹{plan.price.toLocaleString('en-IN')}
              </SelectItem>
            ))}
            <div className="p-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Couple Plans</div>
            {membershipPlans.filter(plan => plan.type === 'couple').map(plan => (
              <SelectItem key={plan.id} value={plan.name}>
                {plan.name} - ₹{plan.price.toLocaleString('en-IN')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedPlan && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="membershipPrice">Total Amount (₹)</Label>
            <Input
              id="membershipPrice"
              type="number"
              value={formData.membershipPrice}
              onChange={(e) => handleChange('membershipPrice', parseInt(e.target.value) || 0)}
              className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amountPaid">Amount Paid (₹)</Label>
            <Input
              id="amountPaid"
              type="number"
              value={formData.amountPaid}
              onChange={(e) => handleChange('amountPaid', parseInt(e.target.value) || 0)}
              max={formData.membershipPrice}
              className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              required
            />
          </div>
        </div>
      )}

      {formData.membershipPrice > 0 && formData.amountPaid < formData.membershipPrice && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Pending Amount:</strong> ₹{(formData.membershipPrice - formData.amountPaid).toLocaleString('en-IN')}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input
            id="emergencyContact"
            value={formData.emergencyContact}
            onChange={(e) => handleChange('emergencyContact', e.target.value)}
            className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergencyPhone">Emergency Phone</Label>
          <Input
            id="emergencyPhone"
            type="tel"
            value={formData.emergencyPhone}
            onChange={(e) => handleChange('emergencyPhone', e.target.value)}
            className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
          rows={3}
          placeholder="Any additional notes about the member..."
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button 
          type="submit" 
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
        >
          {initialData ? 'Update Member' : 'Add Member'}
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