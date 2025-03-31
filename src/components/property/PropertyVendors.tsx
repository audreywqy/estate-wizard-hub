
import React, { useState } from 'react';
import { vendors } from '@/data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Plus, Phone, Mail, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PropertyVendorsProps {
  propertyId: number;
}

const PropertyVendors: React.FC<PropertyVendorsProps> = ({ propertyId }) => {
  const [addVendorOpen, setAddVendorOpen] = useState(false);
  
  // Filter vendors for this property
  const propertyVendors = vendors.filter(vendor => 
    vendor.propertyIds.includes(propertyId)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Property Vendors</h2>
        <Button onClick={() => setAddVendorOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {propertyVendors.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Last Service</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propertyVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                        {vendor.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {vendor.serviceType}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        {vendor.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {vendor.email}
                      </div>
                    </TableCell>
                    <TableCell>{vendor.lastService}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>No Vendors</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            There are no vendors assigned to this property yet.
          </CardContent>
        </Card>
      )}

      <Dialog open={addVendorOpen} onOpenChange={setAddVendorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Vendor to Property</DialogTitle>
            <DialogDescription>
              Add an existing vendor or create a new vendor for this property.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="vendorType">Vendor Type</Label>
              <Select>
                <SelectTrigger id="vendorType">
                  <SelectValue placeholder="Select vendor type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="existing">Existing Vendor</SelectItem>
                  <SelectItem value="new">New Vendor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="vendor">Vendor</Label>
              <Select>
                <SelectTrigger id="vendor">
                  <SelectValue placeholder="Select a vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map(vendor => (
                    <SelectItem key={vendor.id} value={vendor.id.toString()}>
                      {vendor.name} - {vendor.serviceType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="note">Note</Label>
              <Input id="note" placeholder="Special instructions or notes" />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setAddVendorOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Vendor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyVendors;
