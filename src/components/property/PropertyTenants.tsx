
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Mail, Phone, MoreHorizontal, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { tenantsMockData } from '@/data/mockUnitsData';

interface PropertyTenantsProps {
  propertyId: number;
}

const PropertyTenants: React.FC<PropertyTenantsProps> = ({ propertyId }) => {
  const tenants = tenantsMockData.filter(tenant => tenant.propertyId === propertyId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Property Tenants</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Tenant
        </Button>
      </div>
      
      {tenants.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Lease Term</TableHead>
                <TableHead>Lease Type</TableHead>
                <TableHead>Primary Contact</TableHead>
                <TableHead>Monthly Rent</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">
                    <Link 
                      to={`/tenants/${tenant.id}`} 
                      className="flex items-center hover:underline"
                    >
                      {tenant.businessName}
                      <ExternalLink className="ml-1 h-3 w-3 text-muted-foreground" />
                    </Link>
                  </TableCell>
                  <TableCell>{tenant.unitNumber}</TableCell>
                  <TableCell>
                    {tenant.leaseStart} to {tenant.leaseEnd}
                  </TableCell>
                  <TableCell>
                    <Badge variant={tenant.leaseType === "Gross" ? "outline" : "secondary"}>
                      {tenant.leaseType}
                    </Badge>
                  </TableCell>
                  <TableCell>{tenant.primaryContact}</TableCell>
                  <TableCell>${tenant.monthlyRent.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" title={tenant.email}>
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title={tenant.phone}>
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/tenants/${tenant.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Tenant</DropdownMenuItem>
                        <DropdownMenuItem>View Contacts</DropdownMenuItem>
                        <DropdownMenuItem>View Ledger</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No tenants found for this property.</p>
          <Button className="mt-4" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add First Tenant
          </Button>
        </div>
      )}
    </div>
  );
};

export default PropertyTenants;
