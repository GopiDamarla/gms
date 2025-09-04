'use client';

import { CreditCard, Calendar, User, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Payment {
  id: string;
  memberName: string;
  amount: number;
  type: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method: string;
  transactionId: string;
}

interface PaymentCardProps {
  payment: Payment;
}

export function PaymentCard({ payment }: PaymentCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          color: 'bg-emerald-100 text-emerald-800',
          icon: CheckCircle,
          iconColor: 'text-emerald-600',
        };
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: Clock,
          iconColor: 'text-yellow-600',
        };
      case 'failed':
        return {
          color: 'bg-red-100 text-red-800',
          icon: XCircle,
          iconColor: 'text-red-600',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: Clock,
          iconColor: 'text-gray-600',
        };
    }
  };

  const statusConfig = getStatusConfig(payment.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-200">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
                ₹{payment.amount.toFixed(2)}
              </h3>
              <p className="text-sm text-gray-600">{payment.type}</p>
            </div>
          </div>
          <Badge className={`${statusConfig.color} border-0 transition-all duration-200 group-hover:scale-105`}>
            <StatusIcon className={`h-3 w-3 mr-1 ${statusConfig.iconColor}`} />
            {payment.status}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>{payment.memberName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{new Date(payment.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CreditCard className="h-4 w-4" />
            <span>{payment.method}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500 font-mono">{payment.transactionId}</span>
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}