
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MaintenanceRequestList from '@/components/dashboard/MaintenanceRequestList';
import { maintenanceRequests } from '@/data/mockData';

const RecentMaintenanceRequests = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Maintenance Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <MaintenanceRequestList requests={maintenanceRequests.slice(0, 3)} />
      </CardContent>
    </Card>
  );
};

export default RecentMaintenanceRequests;
