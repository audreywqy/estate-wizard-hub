
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Clock, MoreHorizontal } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { maintenanceScheduleMockData } from '@/data/mockUnitsData';

interface PropertyScheduleProps {
  propertyId: number;
}

const PropertySchedule: React.FC<PropertyScheduleProps> = ({ propertyId }) => {
  const schedules = maintenanceScheduleMockData.filter(
    schedule => schedule.propertyId === propertyId
  );

  const getRecurrenceColor = (recurrence: string) => {
    switch (recurrence) {
      case 'Weekly':
        return 'bg-blue-100 text-blue-800';
      case 'Monthly':
        return 'bg-purple-100 text-purple-800';
      case 'Quarterly':
        return 'bg-indigo-100 text-indigo-800';
      case 'Yearly':
        return 'bg-cyan-100 text-cyan-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Maintenance Schedule</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Reminder
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <Card key={schedule.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Badge className={getRecurrenceColor(schedule.recurrence)}>
                    {schedule.recurrence}
                  </Badge>
                  <div className="flex items-center">
                    <Badge 
                      variant={schedule.vendor ? 'outline' : 'secondary'} 
                      className="font-normal"
                    >
                      {schedule.vendor || 'No Vendor'}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg mt-2">{schedule.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{schedule.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Next Due: {schedule.nextDueDate}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Estimated Cost: ${schedule.estimatedCost.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                    <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No maintenance schedules found for this property.</p>
            <Button className="mt-4" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create First Schedule
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySchedule;
