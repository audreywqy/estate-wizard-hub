
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { tenants } from '@/data/mockData';

interface TenantNNNInvoiceProps {
  tenantId: number;
}

const TenantNNNInvoice: React.FC<TenantNNNInvoiceProps> = ({ tenantId }) => {
  const tenant = tenants.find(t => t.id === tenantId);
  
  if (!tenant || tenant.leaseType !== 'NNN') {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No NNN charges applicable for this tenant.</p>
      </div>
    );
  }

  const currentYear = new Date().getFullYear();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">NNN Charges ({currentYear})</h3>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Annual NNN Invoice</CardTitle>
          <CardDescription>These charges remain the same throughout the year</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Charge Type</TableHead>
                <TableHead className="text-right">Monthly Amount</TableHead>
                <TableHead className="text-right">Annual Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Real Estate Tax</TableCell>
                <TableCell className="text-right">${tenant.realEstateTax?.toLocaleString() || '0'}</TableCell>
                <TableCell className="text-right">${((tenant.realEstateTax || 0) * 12).toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Common Area Maintenance</TableCell>
                <TableCell className="text-right">${tenant.commonAreaMaintenance?.toLocaleString() || '0'}</TableCell>
                <TableCell className="text-right">${((tenant.commonAreaMaintenance || 0) * 12).toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Insurance</TableCell>
                <TableCell className="text-right">${tenant.insurance?.toLocaleString() || '0'}</TableCell>
                <TableCell className="text-right">${((tenant.insurance || 0) * 12).toLocaleString()}</TableCell>
              </TableRow>
              <TableRow className="font-bold">
                <TableCell>Total NNN Charges</TableCell>
                <TableCell className="text-right">
                  ${((tenant.realEstateTax || 0) + 
                     (tenant.commonAreaMaintenance || 0) + 
                     (tenant.insurance || 0)).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${(((tenant.realEstateTax || 0) + 
                      (tenant.commonAreaMaintenance || 0) + 
                      (tenant.insurance || 0)) * 12).toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantNNNInvoice;
