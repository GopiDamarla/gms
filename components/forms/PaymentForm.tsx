'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockMembers, personalTrainingRates } from '@/lib/data/mockData';

interface PaymentFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export function PaymentForm({ onSubmit, onCancel, initialData }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    memberName: initialData?.memberName || '',
    amount: initialData?.amount || '',
    type: initialData?.type || '',
    method: initialData?.method || '',
    notes: initialData?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTypeChange = (type: string) => {
    setFormData(prev => ({ ...prev, type }));
    
    // Auto-fill amount for personal training packages
    if (type.startsWith('Personal Training -')) {
      const packageName = type.replace('Personal Training - ', '');
      const ptRate = personalTrainingRates.find(rate => rate.name === packageName);
      if (ptRate) {
        setFormData(prev => ({ ...prev, amount: ptRate.price.toString() }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="memberName">Member Name</Label>
          <Select value={formData.memberName} onValueChange={(value) => handleChange('memberName', value)}>
            <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200">
              <SelectValue placeholder="Select member" />
            </SelectTrigger>
            <SelectContent>
              {mockMembers.map(member => (
                <SelectItem key={member.id} value={member.name}>
                  {member.name}
                  {member.pendingAmount > 0 && (
                    <span className="text-red-600 ml-2">
                      (₹{member.pendingAmount.toLocaleString('en-IN')} due)
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₹)</Label>
          <Input
            id="amount"
            type="number"
            step="1"
            min="0"
            value={formData.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Payment Type</Label>
          <Select value={formData.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200">
              <SelectValue placeholder="Select payment type" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Membership</div>
              <SelectItem value="Monthly Membership">Monthly Membership</SelectItem>
              <SelectItem value="Quarterly Membership">Quarterly Membership</SelectItem>
              <SelectItem value="Half-Yearly Membership">Half-Yearly Membership</SelectItem>
              <SelectItem value="Annual Membership">Annual Membership</SelectItem>
              <SelectItem value="Partial Payment">Partial Payment</SelectItem>
              
              <div className="p-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Personal Training</div>
              {personalTrainingRates.map(rate => (
                <SelectItem key={rate.id} value={`Personal Training - ${rate.name}`}>
                  Personal Training - {rate.name} (₹{rate.price.toLocaleString('en-IN')})
                </SelectItem>
              ))}
              
              <div className="p-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Other</div>
              <SelectItem value="Day Pass">Day Pass</SelectItem>
              <SelectItem value="Equipment Rental">Equipment Rental</SelectItem>
              <SelectItem value="Late Fee">Late Fee</SelectItem>
              <SelectItem value="Registration Fee">Registration Fee</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="method">Payment Method</Label>
          <Select value={formData.method} onValueChange={(value) => handleChange('method', value)}>
            <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cash">Cash</SelectItem>
              <SelectItem value="Credit Card">Credit Card</SelectItem>
              <SelectItem value="Debit Card">Debit Card</SelectItem>
              <SelectItem value="UPI">UPI</SelectItem>
              <SelectItem value="Net Banking">Net Banking</SelectItem>
              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              <SelectItem value="Cheque">Cheque</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
          rows={3}
          placeholder="Any additional notes about the payment..."
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button 
          type="submit" 
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
        >
          Record Payment
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