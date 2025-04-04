
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { maintenanceRequests } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const MaintenanceStatus = () => {
  const navigate = useNavigate();
  
  const pendingRequests = maintenanceRequests.filter(req => req.status === 'Pending');
  const inProgressRequests = maintenanceRequests.filter(req => req.status === 'In Progress');
  const completedRequests = maintenanceRequests.filter(req => req.status === 'Completed');
  
  const navigateToMaintenanceWithFilter = (status: string) => {
    navigate(`/maintenance?status=${status}`);
  };

  return (
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
  );
};

export default MaintenanceStatus;
