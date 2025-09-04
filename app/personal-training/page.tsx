'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Star, Users, CheckCircle } from 'lucide-react';
import { personalTrainingRates, mockTrainers } from '@/lib/data/mockData';

export default function PersonalTrainingPage() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Personal Training</h1>
          <p className="text-gray-600">One-on-one training sessions with certified trainers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personalTrainingRates.map((rate, index) => (
            <Card 
              key={rate.id} 
              className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md group cursor-pointer"
              onClick={() => setSelectedPackage(rate)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-lg group-hover:text-orange-600 transition-colors duration-200">
                  {rate.name}
                </CardTitle>
                <div className="text-3xl font-bold text-gray-900">
                  ₹{rate.price.toLocaleString('en-IN')}
                </div>
                <p className="text-sm text-gray-600">{rate.duration}</p>
                {rate.savings && (
                  <Badge className="bg-emerald-100 text-emerald-800 border-0">
                    {typeof rate.savings === 'number' ? `Save ₹${rate.savings}` : rate.savings}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200">
                  Select Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Trainers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTrainers.map((trainer, index) => (
                <Card 
                  key={trainer.id}
                  className="hover:shadow-md transition-all duration-300 border-0 shadow-sm"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={trainer.image} alt={trainer.name} />
                        <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          {trainer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{trainer.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{trainer.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Rate:</span>
                        <span className="font-medium">₹{trainer.hourlyRate}/hour</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Experience:</span>
                        <span className="font-medium">{trainer.experience}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Specializations:</p>
                      <div className="flex flex-wrap gap-1">
                        {trainer.specializations.slice(0, 3).map((spec, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
                    >
                      Book Session
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}