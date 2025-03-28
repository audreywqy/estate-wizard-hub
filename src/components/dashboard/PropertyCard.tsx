
import React from 'react';
import { Building, MapPin, Users, DollarSign } from 'lucide-react';
import { PropertyType } from '@/types';
import { Badge } from '../ui/badge';

interface PropertyCardProps {
  property: PropertyType;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="property-card">
      <div className="relative h-48">
        <img 
          src={property.imageUrl} 
          alt={property.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={property.vacant ? "destructive" : "secondary"}>
            {property.vacant ? "Vacant" : "Occupied"}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{property.name}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{property.address}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center">
            <Building className="h-4 w-4 mr-1 text-navy" />
            <span className="text-sm">{property.type}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-navy" />
            <span className="text-sm">{property.units} Units</span>
          </div>
          <div className="flex items-center col-span-2">
            <DollarSign className="h-4 w-4 mr-1 text-navy" />
            <span className="text-sm">${property.value.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
