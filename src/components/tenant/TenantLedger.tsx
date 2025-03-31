
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Plus, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data - in a real app this would come from the API
const tenantLedgerData = [
  {
    id: 1,
    date: "06/01/2023",
    description: "Rent Payment",
    category: "Rent",
    type: "Income",
    amount: 5800
  },
  {
    id: 2,
    date: "06/01/2023",
    description: "Real Estate Tax",
    category: "Tax",
    type: "Income",
    amount: 950
  },
  {
    id: 3,
    date: "06/01/2023",
    description: "CAM Fee",
    category: "Maintenance",
    type: "Income",
    amount: 750
  },
  {
    id: 4,
    date: "06/01/2023",
    description: "Insurance Fee",
    category: "Insurance",
    type: "Income",
    amount: 350
  },
  {
    id: 5,
    date: "06/15/2023",
    description: "Late Fee",
    category: "Fee",
    type: "Income",
    amount: 250
  },
  {
    id: 6,
    date: "07/01/2023",
    description: "Rent Payment",
    category: "Rent",
    type: "Income",
    amount: 5800
  },
  {
    id: 7,
    date: "07/01/2023",
    description: "Real Estate Tax",
    category: "Tax",
    type: "Income",
    amount: 950
  },
  {
    id: 8,
    date: "07/01/2023",
    description: "CAM Fee",
    category: "Maintenance",
    type: "Income",
    amount: 750
  }
];

interface TenantLedgerProps {
  tenantId: number;
}

const TenantLedger: React.FC<TenantLedgerProps> = ({ tenantId }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  
  // Filter transactions based on selected month - in a real app, this would filter API data
  let transactions = tenantLedgerData;
  
  if (selectedMonth !== 'All') {
    // Simple month filtering
    transactions = transactions.filter(transaction => 
      transaction.date.includes(selectedMonth.substring(0, 2))
    );
  }
  
  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Tenant Ledger</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Transaction
          </Button>
        </div>
      </div>

      <div className="flex justify-end mb-2">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Months</SelectItem>
            <SelectItem value="01">January</SelectItem>
            <SelectItem value="02">February</SelectItem>
            <SelectItem value="03">March</SelectItem>
            <SelectItem value="04">April</SelectItem>
            <SelectItem value="05">May</SelectItem>
            <SelectItem value="06">June</SelectItem>
            <SelectItem value="07">July</SelectItem>
            <SelectItem value="08">August</SelectItem>
            <SelectItem value="09">September</SelectItem>
            <SelectItem value="10">October</SelectItem>
            <SelectItem value="11">November</SelectItem>
            <SelectItem value="12">December</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${balance.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={transaction.type === 'Income' ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600'}
                  >
                    {transaction.type === 'Income' ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  <span className={transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}>
                    ${transaction.amount.toLocaleString()}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TenantLedger;
