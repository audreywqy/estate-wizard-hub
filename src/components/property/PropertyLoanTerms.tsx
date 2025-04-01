
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Plus, Landmark, Percent, Calendar, User } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { loanMockData } from '@/data/mockUnitsData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface PropertyLoanTermsProps {
  propertyId: number;
}

const PropertyLoanTerms: React.FC<PropertyLoanTermsProps> = ({ propertyId }) => {
  const [showAddLoan, setShowAddLoan] = useState(false);
  
  // Filter loans based on property
  const propertyLoan = loanMockData.find(loan => loan.propertyId === propertyId);
  
  // Generate amortization data for the chart
  const generateAmortizationData = () => {
    if (!propertyLoan) return [];
    
    const monthlyRate = propertyLoan.interestRate / 100 / 12;
    const totalPayments = propertyLoan.term * 12;
    const monthlyPayment = propertyLoan.monthlyPayment;
    
    let balance = propertyLoan.loanAmount;
    const amortizationData = [];
    
    for (let year = 1; year <= Math.min(propertyLoan.term, 30); year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      
      for (let month = 1; month <= 12; month++) {
        if ((year - 1) * 12 + month > totalPayments) break;
        
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        
        yearlyPrincipal += principalPayment;
        yearlyInterest += interestPayment;
        balance -= principalPayment;
      }
      
      amortizationData.push({
        year: `Year ${year}`,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        balance: Math.round(balance)
      });
    }
    
    return amortizationData;
  };

  const amortizationData = generateAmortizationData();
  
  if (!propertyLoan) {
    return (
      <div className="text-center py-8">
        <Landmark className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium">No Loan Information</h3>
        <p className="mt-1 text-sm text-gray-500">This property doesn't have any loan information yet.</p>
        <Button onClick={() => setShowAddLoan(true)} className="mt-4">
          <Plus className="mr-2 h-4 w-4" /> Add Loan Information
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Loan Information</h3>
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" /> Edit Loan Details
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Loan Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${propertyLoan.loanAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Down Payment: ${propertyLoan.downPayment.toLocaleString()} ({Math.round((propertyLoan.downPayment / (propertyLoan.loanAmount + propertyLoan.downPayment)) * 100)}%)</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${propertyLoan.monthlyPayment.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Paid: ${(propertyLoan.monthlyPayment * propertyLoan.term * 12).toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Interest Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{propertyLoan.interestRate}%</div>
            <p className="text-sm text-muted-foreground">
              {propertyLoan.rateType === 'Fixed' ? 'Fixed Rate' : 'Adjustable Rate'} | {propertyLoan.term} Year Term
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Loan Details</TabsTrigger>
          <TabsTrigger value="amortization">Amortization Schedule</TabsTrigger>
          <TabsTrigger value="analytics">Loan Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="pt-4">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Lender Information</h4>
                  <div className="mt-2 border-t border-gray-200 pt-2">
                    <p className="font-medium">{propertyLoan.lender}</p>
                    <p className="text-sm text-gray-600">Loan #: {propertyLoan.loanNumber}</p>
                    <p className="text-sm text-gray-600">Origination Date: {propertyLoan.originationDate}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Loan Terms</h4>
                  <div className="mt-2 border-t border-gray-200 pt-2">
                    <p className="text-sm text-gray-600">Principal: ${propertyLoan.loanAmount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Rate Type: {propertyLoan.rateType}</p>
                    <p className="text-sm text-gray-600">Term: {propertyLoan.term} years</p>
                    <p className="text-sm text-gray-600">Maturity Date: {propertyLoan.maturityDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Payment Information</h4>
                  <div className="mt-2 border-t border-gray-200 pt-2">
                    <p className="text-sm text-gray-600">Monthly Payment: ${propertyLoan.monthlyPayment.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Payment Due: {propertyLoan.paymentDueDay} of each month</p>
                    <p className="text-sm text-gray-600">Principal Paid: ${propertyLoan.principalPaid.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Remaining Balance: ${(propertyLoan.loanAmount - propertyLoan.principalPaid).toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                  <div className="mt-2 border-t border-gray-200 pt-2">
                    <p className="font-medium">{propertyLoan.contactName}</p>
                    <p className="text-sm text-gray-600">{propertyLoan.contactTitle}</p>
                    <p className="text-sm text-gray-600">{propertyLoan.contactPhone}</p>
                    <p className="text-sm text-gray-600">{propertyLoan.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="amortization" className="pt-4">
          <div className="bg-white rounded-lg shadow overflow-hidden p-6">
            <h4 className="font-medium mb-4">Amortization Schedule</h4>
            <div className="mb-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={amortizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Line type="monotone" dataKey="balance" name="Loan Balance" stroke="#2196f3" activeDot={{ r: 8 }} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Principal</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Remaining Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amortizationData.slice(0, 10).map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.year}</TableCell>
                      <TableCell>${data.principal.toLocaleString()}</TableCell>
                      <TableCell>${data.interest.toLocaleString()}</TableCell>
                      <TableCell>${data.balance.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="pt-4">
          <div className="bg-white rounded-lg shadow overflow-hidden p-6">
            <h4 className="font-medium mb-4">Payment Breakdown</h4>
            <div className="mb-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={amortizationData.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="principal" name="Principal" fill="#4caf50" />
                  <Bar dataKey="interest" name="Interest" fill="#f44336" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Interest</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">
                    ${((propertyLoan.monthlyPayment * propertyLoan.term * 12) - propertyLoan.loanAmount).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Loan to Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">
                    {Math.round((propertyLoan.loanAmount / (propertyLoan.loanAmount + propertyLoan.downPayment)) * 100)}%
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Payoff Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">
                    {Math.round((propertyLoan.principalPaid / propertyLoan.loanAmount) * 100)}%
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyLoanTerms;
