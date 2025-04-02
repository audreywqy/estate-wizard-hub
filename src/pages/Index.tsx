import React from 'react';
import Layout from '@/components/Layout';
import StatCard from '@/components/dashboard/StatCard';
import PropertyCard from '@/components/dashboard/PropertyCard';
import MaintenanceRequestList from '@/components/dashboard/MaintenanceRequestList';
import { Building, DollarSign, Users, Wrench } from 'lucide-react';
import { properties, maintenanceRequests } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const occupancyData = [
  { name: 'Jan', rate: 88 },
  { name: 'Feb', rate: 90 },
  { name: 'Mar', rate: 89 },
  { name: 'Apr', rate: 91 },
  { name: 'May', rate: 92 },
  { name: 'Jun', rate: 93 },
];

const expenseData = [
  { name: 'Maintenance', value: 35000 },
  { name: 'Utilities', value: 22000 },
  { name: 'Insurance', value: 18000 },
  { name: 'Property Tax', value: 40000 },
  { name: 'Management', value: 15000 },
];

const EXPENSE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Index = () => {
  const navigate = useNavigate();
  
  const pendingRequests = maintenanceRequests.filter(req => req.status === 'Pending');
  const inProgressRequests = maintenanceRequests.filter(req => req.status === 'In Progress');
  const completedRequests = maintenanceRequests.filter(req => req.status === 'Completed');
  
  const navigateToMaintenanceWithFilter = (status: string) => {
    navigate(`/maintenance?status=${status}`);
  };

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

        {/* Charts - Occupancy and Expense */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Occupancy Chart - Now half width */}
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
          
          {/* Expense Chart - New addition */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center" style={{ position: 'relative', height: '320px' }}>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart margin={{ top: 20, right: 0, bottom: 30, left: 0 }}>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="45%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend 
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      wrapperStyle={{ 
                        marginBottom: '0px',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties section */}
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
                <div 
                  className="flex justify-between items-center p-2 rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigateToMaintenanceWithFilter('Pending')}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span>Pending</span>
                  </div>
                  <span className="font-semibold">{pendingRequests.length}</span>
                </div>
                <div 
                  className="flex justify-between items-center p-2 rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigateToMaintenanceWithFilter('In Progress')}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>In Progress</span>
                  </div>
                  <span className="font-semibold">{inProgressRequests.length}</span>
                </div>
                <div 
                  className="flex justify-between items-center p-2 rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigateToMaintenanceWithFilter('Completed')}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Completed</span>
                  </div>
                  <span className="font-semibold">{completedRequests.length}</span>
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
