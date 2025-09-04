'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { EquipmentCard } from '@/components/equipment/EquipmentCard';
import { EquipmentForm } from '@/components/forms/EquipmentForm';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dumbbell, Search, Filter } from 'lucide-react';
import { mockEquipment } from '@/lib/data/mockData';

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState(mockEquipment);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddEquipment = (data: any) => {
    const newEquipment = {
      id: Date.now().toString(),
      name: data.name,
      category: data.category,
      status: 'operational' as const,
      lastMaintenance: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      nextMaintenance: data.nextMaintenance,
      location: data.location,
      serialNumber: data.serialNumber,
    };
    setEquipment(prev => [...prev, newEquipment]);
    setShowAddForm(false);
  };

  const handleMaintenance = (equipmentItem: any) => {
    setEquipment(prev => prev.map(item => 
      item.id === equipmentItem.id 
        ? { 
            ...item, 
            status: 'maintenance' as const,
            lastMaintenance: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })
          }
        : item
    ));
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Equipment</h1>
            <p className="text-gray-600">Manage gym equipment and maintenance schedules</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
          >
            <Dumbbell className="h-4 w-4 mr-2" />
            Add Equipment
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search equipment..."
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
              <SelectItem value="all">All Equipment</SelectItem>
              <SelectItem value="operational">Operational</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="out_of_order">Out of Order</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((equipmentItem, index) => (
            <div
              key={equipmentItem.id}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              <EquipmentCard
                equipment={equipmentItem}
                onMaintenance={handleMaintenance}
                onEdit={(equipment) => setEditingEquipment(equipment)}
              />
            </div>
          ))}
        </div>

        <Modal open={showAddForm} onClose={() => setShowAddForm(false)} title="Add New Equipment">
          <EquipmentForm
            onSubmit={handleAddEquipment}
            onCancel={() => setShowAddForm(false)}
          />
        </Modal>

        <Modal open={!!editingEquipment} onClose={() => setEditingEquipment(null)} title="Edit Equipment">
          {editingEquipment && (
            <EquipmentForm
              onSubmit={(data) => {
                setEquipment(prev => prev.map(e => 
                  e.id === editingEquipment.id ? { ...e, ...data } : e
                ));
                setEditingEquipment(null);
              }}
              onCancel={() => setEditingEquipment(null)}
              initialData={editingEquipment}
            />
          )}
        </Modal>
      </div>
    </Layout>
  );
}