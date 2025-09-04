'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ClassCard, Class } from '@/components/classes/ClassCard';
import { ClassForm } from '@/components/forms/ClassForm';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Search, Filter } from 'lucide-react';
import { mockClasses } from '@/lib/data/mockData';

export default function ClassesPage() {
  const [classes, setClasses] = useState(mockClasses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.trainer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || classItem.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const handleAddClass = (data: any) => {
    const newClass = {
      id: Date.now().toString(),
      name: data.name,
      trainer: data.trainer,
      time: data.time,
      duration: data.duration,
      participants: 0,
      capacity: parseInt(data.capacity),
      location: data.location,
      difficulty: data.difficulty,
      category: data.category,
    };
    setClasses(prev => [...prev, newClass]);
    setShowAddForm(false);
  };

  const handleBookClass = (classItem: any) => {
    setClasses(prev => prev.map(c => 
      c.id === classItem.id 
        ? { ...c, participants: Math.min(c.participants + 1, c.capacity) }
        : c
    ));
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Classes</h1>
            <p className="text-gray-600">Manage fitness classes and schedules</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Add Class
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search classes or trainers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classItem, index) => (
            <div
              key={classItem.id}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              <ClassCard
                classItem={classItem}
                onBook={handleBookClass}
                onEdit={(classItem) => setEditingClass(classItem)}
              />
            </div>
          ))}
        </div>

        <Modal open={showAddForm} onClose={() => setShowAddForm(false)} title="Add New Class">
          <ClassForm
            onSubmit={handleAddClass}
            onCancel={() => setShowAddForm(false)}
          />
        </Modal>

        <Modal open={!!editingClass} onClose={() => setEditingClass(null)} title="Edit Class">
          {editingClass && (
            <ClassForm
              onSubmit={(data) => {
                setClasses(prev => prev.map(c => 
                  c.id === editingClass.id ? { ...c, ...data } : c
                ));
                setEditingClass(null);
              }}
              onCancel={() => setEditingClass(null)}
              initialData={editingClass}
            />
          )}
        </Modal>
      </div>
    </Layout>
  );
}