
import React from 'react';
import DashboardHeader from './DashboardHeader';
import StatCards from './StatCards';
import OccupancyChart from './OccupancyChart';
import ExpenseChart from './ExpenseChart';
import FeaturedProperties from './FeaturedProperties';
import RecentMaintenanceRequests from './RecentMaintenanceRequests';
import MaintenanceStatus from './MaintenanceStatus';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <StatCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OccupancyChart />
        <ExpenseChart />
      </div>

      <FeaturedProperties />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentMaintenanceRequests />
        <MaintenanceStatus />
      </div>
    </div>
  );
};

export default Dashboard;
