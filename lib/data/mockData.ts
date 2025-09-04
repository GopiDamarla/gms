export const membershipPlans = [
  // Single Plans
  { id: 'single-1m', name: 'Single - 1 Month', duration: 1, type: 'single', price: 2500 },
  { id: 'single-3m', name: 'Single - 3 Months', duration: 3, type: 'single', price: 6900 },
  { id: 'single-6m', name: 'Single - 6 Months', duration: 6, type: 'single', price: 12500 },
  { id: 'single-12m', name: 'Single - 12 Months', duration: 12, type: 'single', price: 22000 },
  
  // Couple Plans
  { id: 'couple-1m', name: 'Couple - 1 Month', duration: 1, type: 'couple', price: 4200 },
  { id: 'couple-3m', name: 'Couple - 3 Months', duration: 3, type: 'couple', price: 11500 },
  { id: 'couple-6m', name: 'Couple - 6 Months', duration: 6, type: 'couple', price: 21000 },
  { id: 'couple-12m', name: 'Couple - 12 Months', duration: 12, type: 'couple', price: 38000 },
];

export const personalTrainingRates = [
  { id: 'pt-single', name: 'Single Session', price: 1500, duration: '60 minutes' },
  { id: 'pt-5pack', name: '5 Session Package', price: 6800, duration: '60 minutes each', savings: 900 },
  { id: 'pt-10pack', name: '10 Session Package', price: 12500, duration: '60 minutes each', savings: 2500 },
  { id: 'pt-monthly', name: 'Monthly Unlimited', price: 18000, duration: 'Unlimited sessions', savings: 'Best Value' },
];

export const mockMembers = [
  {
    id: '1',
    name: 'Kota Akila',
    email: 'avinashn@email.com',
    phone: '+91 9502055761',
    membershipType: 'Single - 3 Months',
    membershipPrice: 6900,
    amountPaid: 6900,
    pendingAmount: 0,
    joinDate: 'Jan 15, 2024',
    expiryDate: 'Apr 15, 2024',
    status: 'active' as const,
    image: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=400',
    emergencyContact: 'Ravi Akila',
    emergencyPhone: '+91 9876543210',
  },
  {
    id: '2',
    name: 'Surya Krishna',
    email: 'surya@email.com',
    phone: '+91 8658324499',
    membershipType: 'Single - 1 Month',
    membershipPrice: 2500,
    amountPaid: 1500,
    pendingAmount: 1000,
    joinDate: 'Feb 3, 2024',
    expiryDate: 'Mar 3, 2024',
    status: 'expired' as const,
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    emergencyContact: 'Lakshmi Krishna',
    emergencyPhone: '+91 9876543211',
  },
  {
    id: '3',
    name: 'Avvaru Monika',
    email: 'monika@email.com',
    phone: '+91 9955868422',
    membershipType: 'Couple - 6 Months',
    membershipPrice: 21000,
    amountPaid: 15000,
    pendingAmount: 6000,
    joinDate: 'Dec 20, 2023',
    expiryDate: 'Jun 20, 2024',
    status: 'active' as const,
    image: 'https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&cs=tinysrgb&w=400',
    emergencyContact: 'Ravi Avvaru',
    emergencyPhone: '+91 9876543212',
  },
  {
    id: '4',
    name: 'M Bablu',
    email: 'bablu@email.com',
    phone: '+91 7705889645',
    membershipType: 'Single - 1 Month',
    membershipPrice: 2500,
    amountPaid: 2500,
    pendingAmount: 0,
    joinDate: 'Mar 8, 2024',
    expiryDate: 'Apr 8, 2024',
    status: 'expiring_soon' as const,
    emergencyContact: 'Sita Bablu',
    emergencyPhone: '+91 9876543213',
  },
];

export const mockTrainers = [
  {
    id: '1',
    name: 'Emma Wilson',
    specializations: ['Yoga', 'Pilates', 'Flexibility'],
    experience: '5 years',
    rating: 4.9,
    activeClasses: 8,
    availability: 'Available' as const,
    certifications: ['RYT-500', 'Pilates Method Alliance'],
    image: 'https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&cs=tinysrgb&w=400',
    email: 'emma.wilson@fitprogym.com',
    phone: '+91 9876543214',
    hourlyRate: 1200,
  },
  {
    id: '2',
    name: 'Mike Johnson',
    specializations: ['HIIT', 'CrossFit', 'Strength Training'],
    experience: '8 years',
    rating: 4.8,
    activeClasses: 12,
    availability: 'Busy' as const,
    certifications: ['NASM-CPT', 'CrossFit Level 2'],
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    email: 'mike.johnson@fitprogym.com',
    phone: '+91 9876543215',
    hourlyRate: 1500,
  },
  {
    id: '3',
    name: 'David Lee',
    specializations: ['Powerlifting', 'Bodybuilding', 'Nutrition'],
    experience: '10 years',
    rating: 4.7,
    activeClasses: 6,
    availability: 'Available' as const,
    certifications: ['NSCA-CSCS', 'Precision Nutrition'],
    email: 'david.lee@fitprogym.com',
    phone: '+91 9876543216',
    hourlyRate: 1800,
  },
];

export const mockEquipment = [
  {
    id: '1',
    name: 'Treadmill Pro X1',
    category: 'Cardio',
    status: 'operational' as const,
    lastMaintenance: 'Mar 15, 2024',
    nextMaintenance: 'Jun 15, 2024',
    location: 'Cardio Zone',
    serialNumber: 'TM-2024-001',
  },
  {
    id: '2',
    name: 'Olympic Barbell Set',
    category: 'Strength',
    status: 'maintenance' as const,
    lastMaintenance: 'Feb 28, 2024',
    nextMaintenance: 'Apr 1, 2024',
    location: 'Weight Room',
    serialNumber: 'OB-2023-045',
  },
  {
    id: '3',
    name: 'Cable Machine Deluxe',
    category: 'Strength',
    status: 'out_of_order' as const,
    lastMaintenance: 'Jan 20, 2024',
    nextMaintenance: 'Pending Repair',
    location: 'Main Floor',
    serialNumber: 'CM-2022-012',
  },
];

export const mockClasses = [
  {
    id: '1',
    name: 'Morning Yoga',
    trainer: 'Emma Wilson',
    time: '8:00 AM - 9:00 AM',
    duration: '60 minutes',
    participants: 12,
    capacity: 15,
    location: 'Studio A',
    difficulty: 'Beginner' as const,
    category: 'Mind & Body',
  },
  {
    id: '2',
    name: 'HIIT Training',
    trainer: 'Mike Johnson',
    time: '10:00 AM - 11:00 AM',
    duration: '60 minutes',
    participants: 20,
    capacity: 20,
    location: 'Main Floor',
    difficulty: 'Advanced' as const,
    category: 'High Intensity',
  },
  {
    id: '3',
    name: 'Strength Training',
    trainer: 'David Lee',
    time: '2:00 PM - 3:00 PM',
    duration: '90 minutes',
    participants: 8,
    capacity: 12,
    location: 'Weight Room',
    difficulty: 'Intermediate' as const,
    category: 'Strength',
  },
];

// Helper function to check if membership expires soon (within 7 days)
export const isExpiringSoon = (expiryDate: string): boolean => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7 && diffDays > 0;
};

// Helper function to check if membership is expired
export const isExpired = (expiryDate: string): boolean => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  return expiry < today;
};