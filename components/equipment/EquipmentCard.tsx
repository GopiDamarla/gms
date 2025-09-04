'use client';

import { Settings, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Equipment {
  id: string;
  name: string;
  category: string;
  status: 'operational' | 'maintenance' | 'out_of_order';
  lastMaintenance: string;
  nextMaintenance: string;
  location: string;
  serialNumber: string;
}

interface EquipmentCardProps {
  equipment: Equipment;
  onMaintenance?: (equipment: Equipment) => void;
  onEdit?: (equipment: Equipment) => void;
}

export function EquipmentCard({ equipment, onMaintenance, onEdit }: EquipmentCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'operational':
        return {
          color: 'bg-emerald-100 text-emerald-800',
          icon: CheckCircle,
          iconColor: 'text-emerald-600',
        };
      case 'maintenance':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: Settings,
          iconColor: 'text-yellow-600',
        };
      case 'out_of_order':
        return {
          color: 'bg-red-100 text-red-800',
          icon: AlertTriangle,
          iconColor: 'text-red-600',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: Settings,
          iconColor: 'text-gray-600',
        };
    }
  };

  const statusConfig = getStatusConfig(equipment.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-200">
              <StatusIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
                {equipment.name}
              </h3>
              <p className="text-sm text-gray-600">{equipment.category}</p>
            </div>
          </div>
          <Badge className={`${statusConfig.color} border-0 transition-all duration-200 group-hover:scale-105`}>
            <StatusIcon className={`h-3 w-3 mr-1 ${statusConfig.iconColor}`} />
            {equipment.status.replace('_', ' ')}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Location:</span>
            <span className="text-gray-900">{equipment.location}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Serial:</span>
            <span className="text-gray-900 font-mono text-xs">{equipment.serialNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Last Service:</span>
            <span className="text-gray-900">{equipment.lastMaintenance}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Next Service:</span>
            <span className="text-gray-900">{equipment.nextMaintenance}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
            onClick={() => onMaintenance?.(equipment)}
          >
            <Settings className="h-4 w-4 mr-1" />
            Maintenance
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit?.(equipment)}
            className="hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}