
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { maintenanceRequests } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertTriangle, 
  ArrowLeft, 
  Building, 
  Calendar, 
  Clock, 
  DollarSign, 
  User, 
  Wrench 
} from 'lucide-react';
import { MaintenanceRequestType } from '@/types';
import { useToast } from '@/components/ui/use-toast';

const MaintenanceRequestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const request = maintenanceRequests.find(req => req.id === Number(id));
  
  const [status, setStatus] = useState(request?.status || 'Pending');
  const [assignedVendor, setAssignedVendor] = useState('');
  const [cost, setCost] = useState('');
  
  if (!request) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-xl font-semibold">Maintenance Request Not Found</h2>
            <p className="text-muted-foreground mt-2">The requested maintenance request could not be found.</p>
            <Button className="mt-6" onClick={() => navigate('/maintenance')}>
              Go to Maintenance
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

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
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'Medium':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'Low':
        return <AlertTriangle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const handleAssignVendor = () => {
    if (!assignedVendor) {
      toast({
        title: "No vendor selected",
        description: "Please select a vendor to assign",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Vendor assigned",
      description: `${assignedVendor} has been assigned to this maintenance request`,
    });
  };

  const handleUpdateStatus = () => {
    toast({
      title: "Status updated",
      description: `Maintenance request status updated to ${status}`,
    });
  };

  const handleUpdateCost = () => {
    if (!cost || isNaN(Number(cost))) {
      toast({
        title: "Invalid cost",
        description: "Please enter a valid cost amount",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Cost updated",
      description: `Maintenance cost updated to $${Number(cost).toFixed(2)}`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">{request.title}</h1>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(request.status)}>
              {request.status}
            </Badge>
            <div className="flex items-center">
              {getPriorityIcon(request.priority)}
              <span className="ml-1 text-sm">{request.priority} Priority</span>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>All information about this maintenance request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p>{request.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Property</h3>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{request.property}</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Unit</h3>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{request.unit}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Reported Date</h3>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{request.date}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Reported By</h3>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Tenant</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdateStatus} className="w-full">Update Status</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assign Vendor</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={assignedVendor} onValueChange={setAssignedVendor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ABC Plumbing">ABC Plumbing</SelectItem>
                  <SelectItem value="XYZ Electric">XYZ Electric</SelectItem>
                  <SelectItem value="123 HVAC">123 HVAC</SelectItem>
                  <SelectItem value="Best Roofing">Best Roofing</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAssignVendor} className="w-full">
                <Wrench className="h-4 w-4 mr-2" />
                Assign Vendor
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <DollarSign className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  value={cost} 
                  onChange={(e) => setCost(e.target.value)} 
                  placeholder="Enter cost" 
                  className="pl-9"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdateCost} className="w-full">Update Cost</Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Enter additional notes about this maintenance request" rows={4} />
          </CardContent>
          <CardFooter>
            <Button>Save Notes</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default MaintenanceRequestDetailPage;
