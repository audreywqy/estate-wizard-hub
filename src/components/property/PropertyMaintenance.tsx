
import React from 'react';
import { Button } from '@/components/ui/button';
import { maintenanceRequests, properties } from '@/data/mockData';
import { Plus, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface PropertyMaintenanceProps {
  propertyId: number;
}

const PropertyMaintenance: React.FC<PropertyMaintenanceProps> = ({ propertyId }) => {
  const requests = maintenanceRequests.filter(req => 
    req.property === properties.find(p => p.id === propertyId)?.name
  );

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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'Medium':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'Low':
        return <AlertTriangle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Maintenance Requests</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.length > 0 ? (
          requests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  <div className="flex items-center">
                    {getPriorityIcon(request.priority)}
                    <span className="text-xs ml-1">{request.priority}</span>
                  </div>
                </div>
                <CardTitle className="text-lg mt-2">{request.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                <div className="text-sm">
                  <div className="flex justify-between mt-2">
                    <span className="text-muted-foreground">Unit:</span>
                    <span>{request.unit}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{request.date}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">Assign</Button>
                <Button size="sm">View Details</Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No maintenance requests found for this property.</p>
            <Button className="mt-4" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create First Request
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyMaintenance;
