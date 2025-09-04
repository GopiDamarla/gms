'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PaymentCard } from '@/components/payments/PaymentCard';
import { PaymentForm } from '@/components/forms/PaymentForm';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Search, Filter, Plus } from 'lucide-react';

const mockPayments = [
  {
    id: '1',
    memberName: 'Sarah Johnson',
    amount: 49.99,
    type: 'Monthly Membership',
    status: 'completed',
    date: '2024-03-15',
    method: 'Credit Card',
    transactionId: 'TXN-001234',
  },
  {
    id: '2',
    memberName: 'Mike Chen',
    amount: 29.99,
    type: 'Monthly Membership',
    status: 'completed',
    date: '2024-03-14',
    method: 'Bank Transfer',
    transactionId: 'TXN-001235',
  },
  {
    id: '3',
    memberName: 'Emma Wilson',
    amount: 79.99,
    type: 'Monthly Membership',
    status: 'pending',
    date: '2024-03-13',
    method: 'Credit Card',
    transactionId: 'TXN-001236',
  },
  {
    id: '4',
    memberName: 'Alex Rodriguez',
    amount: 19.99,
    type: 'Monthly Membership',
    status: 'failed',
    date: '2024-03-12',
    method: 'Credit Card',
    transactionId: 'TXN-001237',
  },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState(mockPayments);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddPayment = (data: any) => {
    const newPayment = {
      id: Date.now().toString(),
      memberName: data.memberName,
      amount: parseFloat(data.amount),
      type: data.type,
      status: 'completed' as const,
      date: new Date().toISOString().split('T')[0],
      method: data.method,
      transactionId: `TXN-${Date.now()}`,
    };
    setPayments(prev => [newPayment, ...prev]);
    setShowAddForm(false);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
            <p className="text-gray-600">Track membership payments and transactions</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search payments or transaction IDs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredPayments.map((payment, index) => (
            <div
              key={payment.id}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              <PaymentCard payment={payment} />
            </div>
          ))}
        </div>

        <Modal open={showAddForm} onClose={() => setShowAddForm(false)} title="Record New Payment">
          <PaymentForm
            onSubmit={handleAddPayment}
            onCancel={() => setShowAddForm(false)}
          />
        </Modal>
      </div>
    </Layout>
  );
}