
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, MoreHorizontal } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { unitsMockData } from '@/data/mockUnitsData';

interface PropertyUnitsProps {
  propertyId: number;
}

const PropertyUnits: React.FC<PropertyUnitsProps> = ({ propertyId }) => {
  const [units, setUnits] = useState(
    unitsMockData.filter(unit => unit.propertyId === propertyId)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Property Units</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Unit
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.length > 0 ? (
          units.map((unit) => (
            <Card key={unit.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{unit.unitNumber}</CardTitle>
                    <CardDescription>{unit.type}</CardDescription>
                  </div>
                  <Badge variant={unit.status === 'Occupied' ? 'secondary' : 'outline'}>
                    {unit.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">{unit.squareFeet} sq ft</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Rent:</span>
                    <span className="font-medium">${unit.rentAmount.toLocaleString()}</span>
                  </div>
                  {unit.status === 'Occupied' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tenant:</span>
                      <span className="font-medium">{unit.tenant}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Unit
                    </DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    {unit.status === 'Vacant' && (
                      <DropdownMenuItem>Add Tenant</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No units found for this property.</p>
            <Button className="mt-4" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add First Unit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyUnits;
