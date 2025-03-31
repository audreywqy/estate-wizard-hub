
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { tenantsMockData } from '@/data/mockUnitsData';
import { Badge } from '@/components/ui/badge';

interface PropertyRentRollProps {
  propertyId: number;
}

const PropertyRentRoll: React.FC<PropertyRentRollProps> = ({ propertyId }) => {
  const tenants = tenantsMockData.filter(tenant => tenant.propertyId === propertyId);
  
  // Calculate annual totals
  const annualBaseRent = tenants.reduce((sum, tenant) => sum + tenant.monthlyRent * 12, 0);
  const annualReTax = tenants.reduce((sum, tenant) => {
    return sum + (tenant.leaseType === 'NNN' && tenant.realEstateTax ? tenant.realEstateTax * 12 : 0);
  }, 0);
  const annualCAM = tenants.reduce((sum, tenant) => {
    return sum + (tenant.leaseType === 'NNN' && tenant.commonAreaMaintenance ? tenant.commonAreaMaintenance * 12 : 0);
  }, 0);
  const annualInsurance = tenants.reduce((sum, tenant) => {
    return sum + (tenant.leaseType === 'NNN' && tenant.insurance ? tenant.insurance * 12 : 0);
  }, 0);
  const annualTotal = annualBaseRent + annualReTax + annualCAM + annualInsurance;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Rent Roll</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Annual Base Rent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${annualBaseRent.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Annual RE Tax</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${annualReTax.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Annual CAM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${annualCAM.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Annual Insurance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${annualInsurance.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Annual Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${annualTotal.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
      
      {tenants.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Lease Term</TableHead>
                <TableHead>Lease Type</TableHead>
                <TableHead className="text-right">Base Rent (Monthly)</TableHead>
                <TableHead className="text-right">RE Tax (Monthly)</TableHead>
                <TableHead className="text-right">CAM (Monthly)</TableHead>
                <TableHead className="text-right">Insurance (Monthly)</TableHead>
                <TableHead className="text-right">Total (Monthly)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => {
                // Calculate individual tenant total
                const totalMonthly = tenant.monthlyRent + 
                  (tenant.leaseType === 'NNN' ? 
                    (tenant.realEstateTax || 0) + 
                    (tenant.commonAreaMaintenance || 0) + 
                    (tenant.insurance || 0) : 0);
                
                return (
                  <TableRow key={tenant.id}>
                    <TableCell className="font-medium">{tenant.businessName}</TableCell>
                    <TableCell>{tenant.unitNumber}</TableCell>
                    <TableCell>{tenant.leaseStart} - {tenant.leaseEnd}</TableCell>
                    <TableCell>
                      <Badge variant={tenant.leaseType === "Gross" ? "outline" : "secondary"}>
                        {tenant.leaseType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${tenant.monthlyRent.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      {tenant.leaseType === 'NNN' && tenant.realEstateTax ? 
                        `$${tenant.realEstateTax.toLocaleString()}` : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      {tenant.leaseType === 'NNN' && tenant.commonAreaMaintenance ? 
                        `$${tenant.commonAreaMaintenance.toLocaleString()}` : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      {tenant.leaseType === 'NNN' && tenant.insurance ? 
                        `$${tenant.insurance.toLocaleString()}` : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right font-bold">${totalMonthly.toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No tenants found for this property.</p>
        </div>
      )}
    </div>
  );
};

export default PropertyRentRoll;
