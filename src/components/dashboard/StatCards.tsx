
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import { Building, DollarSign, Users } from 'lucide-react';

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Properties" 
        value="6" 
        icon={<Building className="h-5 w-5 text-navy" />} 
      />
      <StatCard 
        title="Total Units" 
        value="109" 
        icon={<Building className="h-5 w-5 text-navy" />} 
        change="5%" 
        positive={true} 
      />
      <StatCard 
        title="Total Tenants" 
        value="93" 
        icon={<Users className="h-5 w-5 text-navy" />} 
        change="3%" 
        positive={true} 
      />
      <StatCard 
        title="Revenue (Monthly)" 
        value="$124,500" 
        icon={<DollarSign className="h-5 w-5 text-navy" />}
        change="7%" 
        positive={true} 
      />
    </div>
  );
};

export default StatCards;
