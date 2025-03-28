
import React from 'react';
import { MaintenanceRequestType } from '@/types';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface MaintenanceRequestListProps {
  requests: MaintenanceRequestType[];
}

const MaintenanceRequestList: React.FC<MaintenanceRequestListProps> = ({ requests }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium">Recent Maintenance Requests</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {requests.map((request) => (
          <div key={request.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{request.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{request.property}</p>
              </div>
              <Badge className={cn("font-normal", getStatusColor(request.status))}>
                {request.status}
              </Badge>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-500">Reported: {request.date}</span>
              <span className="text-xs text-gray-500">Unit: {request.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceRequestList;
