'use client';

import { Calendar, Phone, Mail, CreditCard, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { isExpiringSoon, isExpired } from '@/lib/data/mockData';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  membershipPrice: number;
  amountPaid: number;
  pendingAmount: number;
  joinDate: string;
  expiryDate: string;
  status: 'active' | 'inactive' | 'expired' | 'expiring_soon';
  image?: string;
  emergencyContact: string;
  emergencyPhone: string;
}

interface MemberCardProps {
  member: Member;
  onEdit?: (member: Member) => void;
  onView?: (member: Member) => void;
}

export function MemberCard({ member, onEdit, onView }: MemberCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'expiring_soon': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMemberStatus = () => {
    if (isExpired(member.expiryDate)) return 'expired';
    if (isExpiringSoon(member.expiryDate)) return 'expiring_soon';
    return member.status;
  };

  const currentStatus = getMemberStatus();
  const hasPendingAmount = member.pendingAmount > 0;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 ring-2 ring-orange-200 group-hover:ring-orange-400 transition-all duration-200">
              <AvatarImage src={member.image} alt={member.name} />
              <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600">{member.membershipType}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className={`${getStatusColor(currentStatus)} border-0 transition-all duration-200 group-hover:scale-105`}>
              {currentStatus === 'expiring_soon' ? 'Expiring Soon' : currentStatus}
            </Badge>
            {hasPendingAmount && (
              <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                ₹{member.pendingAmount.toLocaleString('en-IN')} pending
              </Badge>
            )}
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span>{member.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{member.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Expires: {member.expiryDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CreditCard className="h-4 w-4" />
            <span>₹{member.amountPaid.toLocaleString('en-IN')} / ₹{member.membershipPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {(currentStatus === 'expiring_soon' || currentStatus === 'expired') && (
          <div className={`p-3 rounded-lg mb-4 ${
            currentStatus === 'expired' ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'
          }`}>
            <div className="flex items-center gap-2">
              {currentStatus === 'expired' ? (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              ) : (
                <Clock className="h-4 w-4 text-orange-600" />
              )}
              <p className={`text-sm font-medium ${
                currentStatus === 'expired' ? 'text-red-800' : 'text-orange-800'
              }`}>
                {currentStatus === 'expired' ? 'Membership Expired' : 'Membership Expiring Soon'}
              </p>
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onView?.(member)}
            className="flex-1 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
          >
            View Details
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit?.(member)}
            className="flex-1 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}