
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <div className="flex items-center space-x-2">
        <Button variant="outline">Export</Button>
        <Button>Add Property</Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
