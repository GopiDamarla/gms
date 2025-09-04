'use client';

import { Clock, User, LogOut } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CheckedInMember {
  id: string;
  name: string;
  membershipType: string;
  checkInTime: string;
  duration: string;
  status: string;
}

interface CheckInCardProps {
  member: CheckedInMember;
  onCheckOut: () => void;
  style?: React.CSSProperties;
}

export function CheckInCard({ member, onCheckOut, style }: CheckInCardProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-orange-500" style={style}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-gray-900">{member.name}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>In: {member.checkInTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{member.membershipType}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              {member.duration}
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onCheckOut}
              className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Check Out
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}