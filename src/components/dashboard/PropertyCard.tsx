import React from 'react';
import { Building, MapPin, Users, DollarSign } from 'lucide-react';
import { PropertyType } from '@/types';
import { Badge } from '../ui/badge';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

interface PropertyCardProps {
  property: PropertyType;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  // Calculate occupancy rate as a percentage
  const occupancyRate = Math.round((property.occupied / property.units) * 100);
  
  return (
    <Link to={`/properties/${property.id}`} className="block">
      <div className="property-card group transition-all hover:shadow-md">
        <div className="relative h-48">
          <img 
            src={property.imageUrl} 
            alt={property.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge 
              variant={occupancyRate < 50 ? "destructive" : occupancyRate < 80 ? "secondary" : "default"}
              className={occupancyRate >= 80 ? "bg-green-500 hover:bg-green-600" : ""}
            >
              {occupancyRate}% Occupied
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{property.name}</h3>
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.address}</span>
          </div>
          
          <div className="mt-2 mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span>Occupancy</span>
              <span>{property.occupied}/{property.units} units</span>
            </div>
            <Progress value={occupancyRate} className="h-2" />
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
    </Link>
  );
};

export default PropertyCard;
