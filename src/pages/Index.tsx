
import React from 'react';
import Layout from '@/components/Layout';
import StatCard from '@/components/dashboard/StatCard';
import PropertyCard from '@/components/dashboard/PropertyCard';
import MaintenanceRequestList from '@/components/dashboard/MaintenanceRequestList';
import { Building, DollarSign, Users, Wrench } from 'lucide-react';
import { properties, maintenanceRequests } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const occupancyData = [
  { name: 'Jan', rate: 88 },
  { name: 'Feb', rate: 90 },
  { name: 'Mar', rate: 89 },
  { name: 'Apr', rate: 91 },
  { name: 'May', rate: 92 },
  { name: 'Jun', rate: 93 },
];

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Export</Button>
            <Button>Add Property</Button>
          </div>
        </div>

        {/* Stats */}
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

        {/* Occupancy Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Bar dataKey="rate" fill="#0F3460" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Properties section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Featured Properties</h2>
            <Button variant="link">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        {/* Maintenance Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Maintenance Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <MaintenanceRequestList requests={maintenanceRequests.slice(0, 3)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span>Pending</span>
                  </div>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>In Progress</span>
                  </div>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Completed</span>
                  </div>
                  <span className="font-semibold">1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
