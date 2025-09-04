'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { TrainerCard } from '@/components/trainers/TrainerCard';
import { TrainerForm } from '@/components/forms/TrainerForm';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCheck, Search, Filter } from 'lucide-react';
import { mockTrainers } from '@/lib/data/mockData';

export default function TrainersPage() {
  const [trainers, setTrainers] = useState(mockTrainers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainer.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesAvailability = availabilityFilter === 'all' || trainer.availability === availabilityFilter;
    return matchesSearch && matchesAvailability;
  });

  const handleAddTrainer = (data: any) => {
    const newTrainer = {
      id: Date.now().toString(),
      name: `${data.firstName} ${data.lastName}`,
      specializations: data.specializations.split(',').map((s: string) => s.trim()),
      experience: data.experience,
      rating: 5.0,
      activeClasses: 0,
      availability: 'Available' as const,
      certifications: data.certifications.split(',').map((s: string) => s.trim()),
    };
    setTrainers(prev => [...prev, newTrainer]);
    setShowAddForm(false);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trainers</h1>
            <p className="text-gray-600">Manage your fitness trainers and instructors</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
          >
            <UserCheck className="h-4 w-4 mr-2" />
            Add Trainer
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search trainers or specializations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trainers</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Busy">Busy</SelectItem>
              <SelectItem value="Off Duty">Off Duty</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainers.map((trainer, index) => (
            <div
              key={trainer.id}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              <TrainerCard
                trainer={trainer}
                onEdit={(trainer) => setEditingTrainer(trainer)}
                onView={(trainer) => console.log('View trainer:', trainer)}
              />
            </div>
          ))}
        </div>

        <Modal open={showAddForm} onClose={() => setShowAddForm(false)} title="Add New Trainer">
          <TrainerForm
            onSubmit={handleAddTrainer}
            onCancel={() => setShowAddForm(false)}
          />
        </Modal>

        <Modal open={!!editingTrainer} onClose={() => setEditingTrainer(null)} title="Edit Trainer">
          {editingTrainer && (
            <TrainerForm
              onSubmit={(data) => {
                setTrainers(prev => prev.map(t => 
                  t.id === editingTrainer.id ? { ...t, ...data } : t
                ));
                setEditingTrainer(null);
              }}
              onCancel={() => setEditingTrainer(null)}
              initialData={editingTrainer}
            />
          )}
        </Modal>
      </div>
    </Layout>
  );
}