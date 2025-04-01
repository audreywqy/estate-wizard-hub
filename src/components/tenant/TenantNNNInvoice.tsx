
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { tenants } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText } from 'lucide-react';

interface TenantNNNInvoiceProps {
  tenantId: number;
}

const TenantNNNInvoice: React.FC<TenantNNNInvoiceProps> = ({ tenantId }) => {
  const tenant = tenants.find(t => t.id === tenantId);
  
  if (!tenant || tenant.leaseType !== 'NNN') {
    return (
      <div className="text-center py-6 border rounded-lg bg-gray-50">
        <p className="text-muted-foreground">No NNN charges applicable for this tenant.</p>
        <p className="text-xs text-muted-foreground mt-1">This tenant has a Gross lease type.</p>
      </div>
    );
  }

  const currentYear = new Date().getFullYear();
  
  // Calculate the total
  const totalMonthly = (tenant.realEstateTax || 0) + 
                       (tenant.commonAreaMaintenance || 0) + 
                       (tenant.insurance || 0);
  
  const totalAnnual = totalMonthly * 12;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium">NNN Charges</h3>
          <Badge variant="outline">{currentYear}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <span>January 1 - December 31, {currentYear}</span>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Annual NNN Invoice</CardTitle>
              <CardDescription>These charges remain the same throughout the year</CardDescription>
            </div>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
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
                  ${totalMonthly.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${totalAnnual.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h4 className="text-sm font-medium mb-2">Important Notes</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• NNN charges are billed monthly in addition to base rent</li>
              <li>• These rates are fixed for the calendar year {currentYear}</li>
              <li>• Rates may be adjusted annually based on actual expenses</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantNNNInvoice;
