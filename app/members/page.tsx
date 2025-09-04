'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { MemberCard } from '@/components/members/MemberCard';
import { MemberDetailsModal } from '@/components/members/MemberDetailsModal';
import { MemberForm } from '@/components/forms/MemberForm';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Search, Filter, AlertTriangle, Clock,CreditCard } from 'lucide-react';
import { mockMembers, isExpiringSoon, isExpired } from '@/lib/data/mockData';

export default function MembersPage() {
  const [members, setMembers] = useState(mockMembers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [viewingMember, setViewingMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getExpiringMembers = () => {
    return members.filter(member => isExpiringSoon(member.expiryDate));
  };

  const getExpiredMembers = () => {
    return members.filter(member => isExpired(member.expiryDate));
  };

  const getPendingPayments = () => {
    return members.filter(member => member.pendingAmount > 0);
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter === 'expired') {
      matchesStatus = isExpired(member.expiryDate);
    } else if (statusFilter === 'expiring_soon') {
      matchesStatus = isExpiringSoon(member.expiryDate);
    } else if (statusFilter === 'pending_payment') {
      matchesStatus = member.pendingAmount > 0;
    } else if (statusFilter !== 'all') {
      matchesStatus = member.status === statusFilter;
    }
    
    return matchesSearch && matchesStatus;
  });

  const handleAddMember = (data: any) => {
    const newMember = {
      id: Date.now().toString(),
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      membershipType: data.membershipType,
      membershipPrice: data.membershipPrice,
      amountPaid: data.amountPaid,
      pendingAmount: data.pendingAmount,
      joinDate: data.joinDate,
      expiryDate: data.expiryDate,
      status: 'active' as const,
      emergencyContact: data.emergencyContact,
      emergencyPhone: data.emergencyPhone,
    };
    setMembers(prev => [...prev, newMember]);
    setShowAddForm(false);
  };

  const handleEditMember = (data: any) => {
    setMembers(prev => prev.map(member => 
      member.id === editingMember?.id 
        ? { 
            ...member, 
            name: `${data.firstName} ${data.lastName}`, 
            email: data.email, 
            phone: data.phone, 
            membershipType: data.membershipType,
            membershipPrice: data.membershipPrice,
            amountPaid: data.amountPaid,
            pendingAmount: data.pendingAmount,
            emergencyContact: data.emergencyContact,
            emergencyPhone: data.emergencyPhone,
          }
        : member
    ));
    setEditingMember(null);
  };

  const expiringMembers = getExpiringMembers();
  const expiredMembers = getExpiredMembers();
  const pendingPayments = getPendingPayments();

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Members</h1>
            <p className="text-gray-600">Manage your gym members and memberships</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>

        {/* Alerts Section */}
        {(expiringMembers.length > 0 || expiredMembers.length > 0 || pendingPayments.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {expiredMembers.length > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-red-800 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Expired Memberships
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-900">{expiredMembers.length}</div>
                  <p className="text-xs text-red-600">members need renewal</p>
                </CardContent>
              </Card>
            )}

            {expiringMembers.length > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-orange-800 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Expiring Soon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-900">{expiringMembers.length}</div>
                  <p className="text-xs text-orange-600">expire within 7 days</p>
                </CardContent>
              </Card>
            )}

            {pendingPayments.length > 0 && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-yellow-800 flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Pending Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-900">{pendingPayments.length}</div>
                  <p className="text-xs text-yellow-600">members with dues</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search members..."
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
              <SelectItem value="all">All Members</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
              <SelectItem value="pending_payment">Pending Payment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, index) => (
            <div
              key={member.id}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              <MemberCard
                member={member}
                onEdit={(member) => setEditingMember(member)}
                onView={(member) => setViewingMember(member)}
              />
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No members found matching your criteria.</p>
          </div>
        )}

        <Modal open={showAddForm} onClose={() => setShowAddForm(false)} title="Add New Member">
          <MemberForm
            onSubmit={handleAddMember}
            onCancel={() => setShowAddForm(false)}
          />
        </Modal>

        <Modal open={!!editingMember} onClose={() => setEditingMember(null)} title="Edit Member">
          {editingMember && (
            <MemberForm
              onSubmit={handleEditMember}
              onCancel={() => setEditingMember(null)}
              initialData={{
                firstName: editingMember.name.split(' ')[0],
                lastName: editingMember.name.split(' ')[1] || '',
                email: editingMember.email,
                phone: editingMember.phone,
                membershipType: editingMember.membershipType,
                membershipPrice: editingMember.membershipPrice,
                amountPaid: editingMember.amountPaid,
                emergencyContact: editingMember.emergencyContact,
                emergencyPhone: editingMember.emergencyPhone,
              }}
            />
          )}
        </Modal>

        <Modal open={!!viewingMember} onClose={() => setViewingMember(null)} title="Member Details">
          {viewingMember && (
            <MemberDetailsModal
              member={viewingMember}
              onClose={() => setViewingMember(null)}
              onEdit={(member) => {
                setViewingMember(null);
                setEditingMember(member);
              }}
            />
          )}
        </Modal>
      </div>
    </Layout>
  );
}