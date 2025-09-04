'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { CheckInCard } from '@/components/checkin/CheckInCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Search, Clock, Users, TrendingUp } from 'lucide-react';

const mockCheckedInMembers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    membershipType: 'Premium',
    checkInTime: '08:30 AM',
    duration: '1h 30m',
    status: 'active',
  },
  {
    id: '2',
    name: 'Mike Chen',
    membershipType: 'Basic',
    checkInTime: '09:15 AM',
    duration: '45m',
    status: 'active',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    membershipType: 'VIP',
    checkInTime: '07:45 AM',
    duration: '2h 15m',
    status: 'active',
  },
];

export default function CheckInPage() {
  const [checkedInMembers, setCheckedInMembers] = useState(mockCheckedInMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [memberIdInput, setMemberIdInput] = useState('');

  const handleCheckIn = () => {
    if (!memberIdInput.trim()) return;
    
    const newCheckIn = {
      id: Date.now().toString(),
      name: `Member ${memberIdInput}`,
      membershipType: 'Basic',
      checkInTime: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      duration: '0m',
      status: 'active',
    };
    
    setCheckedInMembers(prev => [newCheckIn, ...prev]);
    setMemberIdInput('');
  };

  const handleCheckOut = (memberId: string) => {
    setCheckedInMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const filteredMembers = checkedInMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Check-In System</h1>
          <p className="text-gray-600">Monitor member attendance and gym capacity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Currently In Gym</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{checkedInMembers.length}</div>
              <p className="text-xs text-gray-600">members checked in</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6-8 PM</div>
              <p className="text-xs text-gray-600">busiest time today</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Check-ins</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-emerald-600">+12% vs yesterday</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Check-In</CardTitle>
            <CardDescription>Check in members using their member ID or name</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter member ID or scan card..."
                value={memberIdInput}
                onChange={(e) => setMemberIdInput(e.target.value)}
                className="flex-1 focus:ring-orange-500 focus:border-orange-500"
                onKeyPress={(e) => e.key === 'Enter' && handleCheckIn()}
              />
              <Button 
                onClick={handleCheckIn}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Check In
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Currently Checked In ({checkedInMembers.length})</CardTitle>
            <CardDescription>Members currently using the gym facilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search checked-in members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              {filteredMembers.map((member, index) => (
                <CheckInCard
                  key={member.id}
                  member={member}
                  onCheckOut={() => handleCheckOut(member.id)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                  }}
                />
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No members currently checked in.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}