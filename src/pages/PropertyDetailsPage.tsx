
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { properties } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Building, Users, Wrench, Receipt, Calendar, ArrowLeft, FileText, DollarSign, Briefcase } from 'lucide-react';
import PropertyUnits from '@/components/property/PropertyUnits';
import PropertyTenants from '@/components/property/PropertyTenants';
import PropertyMaintenance from '@/components/property/PropertyMaintenance';
import PropertyLedger from '@/components/property/PropertyLedger';
import PropertySchedule from '@/components/property/PropertySchedule';
import PropertyDocuments from '@/components/property/PropertyDocuments';
import PropertyExpenses from '@/components/property/PropertyExpenses';
import PropertyVendors from '@/components/property/PropertyVendors';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const propertyId = parseInt(id || '0');
  
  const property = properties.find(p => p.id === propertyId);
  
  if (!property) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <p className="mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/properties">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Calculate occupancy rate
  const occupancyRate = Math.round((property.occupied / property.units) * 100);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link to="/properties">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{property.name}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Property Value</CardTitle>
              <CardDescription>Current estimated value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${property.value.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Units</CardTitle>
              <CardDescription>Available spaces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{property.units}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Occupancy</CardTitle>
              <CardDescription>Occupied units</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <div className="text-2xl font-bold mb-1">{property.occupied} / {property.units}</div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Occupancy Rate</span>
                  <span className={occupancyRate >= 80 ? "text-green-600" : occupancyRate >= 50 ? "text-amber-600" : "text-red-600"}>
                    {occupancyRate}%
                  </span>
                </div>
                <Progress 
                  value={occupancyRate} 
                  className={`h-2 ${
                    occupancyRate >= 80 ? "bg-green-100" : 
                    occupancyRate >= 50 ? "bg-amber-100" : 
                    "bg-red-100"
                  }`}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <CardDescription>From all units</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,500</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="units" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-8 w-full">
            <TabsTrigger value="units" className="flex items-center gap-2">
              <Building className="h-4 w-4" /> Units
            </TabsTrigger>
            <TabsTrigger value="tenants" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Tenants
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" /> Maintenance
            </TabsTrigger>
            <TabsTrigger value="ledger" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" /> Ledger
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Schedule
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Documents
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Expenses
            </TabsTrigger>
            <TabsTrigger value="vendors" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Vendors
            </TabsTrigger>
          </TabsList>
          <TabsContent value="units" className="py-4">
            <PropertyUnits propertyId={propertyId} />
          </TabsContent>
          <TabsContent value="tenants" className="py-4">
            <PropertyTenants propertyId={propertyId} />
          </TabsContent>
          <TabsContent value="maintenance" className="py-4">
            <PropertyMaintenance propertyId={propertyId} />
          </TabsContent>
          <TabsContent value="ledger" className="py-4">
            <PropertyLedger propertyId={propertyId} />
          </TabsContent>
          <TabsContent value="schedule" className="py-4">
            <PropertySchedule propertyId={propertyId} />
          </TabsContent>
          <TabsContent value="documents" className="py-4">
            <PropertyDocuments propertyId={propertyId} />
          </TabsContent>
          <TabsContent value="expenses" className="py-4">
            <PropertyExpenses propertyId={propertyId} />
          </TabsContent>
          <TabsContent value="vendors" className="py-4">
            <PropertyVendors propertyId={propertyId} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PropertyDetailsPage;
