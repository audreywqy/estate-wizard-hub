
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { properties } from '@/data/mockData';
import PropertyCard from '@/components/dashboard/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { PropertyType } from '@/types';
import { Plus, Search } from 'lucide-react';

const PropertiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = propertyType === 'all' || property.type === propertyType;
    
    return matchesSearch && matchesType;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search properties..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Office">Office</SelectItem>
              <SelectItem value="Retail">Retail</SelectItem>
              <SelectItem value="Industrial">Industrial</SelectItem>
              <SelectItem value="Mixed Use">Mixed Use</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No properties found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PropertiesPage;
