
import React from 'react';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/dashboard/PropertyCard';
import { properties } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const FeaturedProperties = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Featured Properties</h2>
        <Button variant="link" onClick={() => navigate('/properties')}>View All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.slice(0, 3).map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
