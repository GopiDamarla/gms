'use client';

import { Calendar, Phone, Mail, CreditCard, User, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface MemberDetailsModalProps {
  member: Member;
  onClose: () => void;
  onEdit: (member: Member) => void;
}

export function MemberDetailsModal({ member, onClose, onEdit }: MemberDetailsModalProps) {
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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20 ring-4 ring-orange-200">
          <AvatarImage src={member.image} alt={member.name} />
          <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl">
            {member.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
          <p className="text-gray-600">{member.membershipType}</p>
          <div className="flex gap-2 mt-2">
            <Badge className={`${getStatusColor(currentStatus)} border-0`}>
              {currentStatus === 'expiring_soon' ? 'Expiring Soon' : currentStatus}
            </Badge>
            {hasPendingAmount && (
              <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                ₹{member.pendingAmount.toLocaleString('en-IN')} pending
              </Badge>
            )}
          </div>
        </div>
      </div>

      {(currentStatus === 'expiring_soon' || currentStatus === 'expired') && (
        <div className={`p-4 rounded-lg ${
          currentStatus === 'expired' ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'
        }`}>
          <div className="flex items-center gap-2">
            {currentStatus === 'expired' ? (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            ) : (
              <Clock className="h-5 w-5 text-orange-600" />
            )}
            <div>
              <p className={`font-medium ${
                currentStatus === 'expired' ? 'text-red-800' : 'text-orange-800'
              }`}>
                {currentStatus === 'expired' ? 'Membership Expired' : 'Membership Expiring Soon'}
              </p>
              <p className={`text-sm ${
                currentStatus === 'expired' ? 'text-red-600' : 'text-orange-600'
              }`}>
                {currentStatus === 'expired' 
                  ? 'Please renew membership to continue access' 
                  : 'Membership expires on ' + member.expiryDate
                }
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{member.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Emergency Contact</p>
                <p className="font-medium">{member.emergencyContact}</p>
                <p className="text-sm text-gray-500">{member.emergencyPhone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Membership Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Join Date</p>
                <p className="font-medium">{member.joinDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Expiry Date</p>
                <p className="font-medium">{member.expiryDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Payment Status</p>
                <p className="font-medium">
                  ₹{member.amountPaid.toLocaleString('en-IN')} / ₹{member.membershipPrice.toLocaleString('en-IN')}
                </p>
                {hasPendingAmount && (
                  <p className="text-sm text-red-600">
                    ₹{member.pendingAmount.toLocaleString('en-IN')} pending
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3 pt-4">
        <Button 
          onClick={() => onEdit(member)}
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
        >
          Edit Member
        </Button>
        {hasPendingAmount && (
          <Button 
            variant="outline"
            className="flex-1 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 transition-all duration-200"
          >
            Collect Payment
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={onClose}
          className="hover:bg-gray-50 transition-all duration-200"
        >
          Close
        </Button>
      </div>
    </div>
  );
}