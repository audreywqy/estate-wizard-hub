
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { tenantsMockData } from '@/data/mockUnitsData';
import { Badge } from '@/components/ui/badge';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PropertyRentRollProps {
  propertyId: number;
}

const PropertyRentRoll: React.FC<PropertyRentRollProps> = ({ propertyId }) => {
  const tenants = tenantsMockData.filter(tenant => tenant.propertyId === propertyId);
  const [openTenants, setOpenTenants] = useState<number[]>([]);
  
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

  const toggleTenant = (id: number) => {
    setOpenTenants(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

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
                <TableHead className="w-10"></TableHead>
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
                
                const isOpen = openTenants.includes(tenant.id);
                
                return (
                  <React.Fragment key={tenant.id}>
                    <TableRow className="cursor-pointer" onClick={() => toggleTenant(tenant.id)}>
                      <TableCell className="p-2">
                        {isOpen ? 
                          <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        }
                      </TableCell>
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
                    
                    {isOpen && tenant.rentEscalation && tenant.rentEscalation.length > 0 && (
                      <TableRow>
                        <TableCell colSpan={10}>
                          <div className="bg-gray-50 p-4 rounded-md border">
                            <h4 className="font-medium text-sm mb-2">Rent Escalation Schedule</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Period</TableHead>
                                  <TableHead className="text-right">Monthly Base Rent</TableHead>
                                  <TableHead className="text-right">Annual Base Rent</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {tenant.rentEscalation.map((escalation, index) => (
                                  <TableRow key={index}>
                                    <TableCell>
                                      {escalation.startDate} - {escalation.endDate}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      ${escalation.monthlyRent.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      ${(escalation.monthlyRent * 12).toLocaleString()}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
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
