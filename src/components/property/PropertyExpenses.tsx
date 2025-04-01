
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { AddExpenseForm } from './AddExpenseForm';
import { expensesMockData, expenseBreakdownData, profitLossData } from '@/data/mockUnitsData';

// Define chart colors
const colors = ['#2196f3', '#4caf50', '#f44336'];

interface PropertyExpensesProps {
  propertyId: number;
}

const PropertyExpenses: React.FC<PropertyExpensesProps> = ({ propertyId }) => {
  const [expensePeriod, setExpensePeriod] = useState('month');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [showAddExpense, setShowAddExpense] = useState(false);

  // Filter expenses based on property and selected month
  let filteredExpenses = expensesMockData.filter(expense => expense.propertyId === propertyId);
  
  if (selectedMonth !== 'All') {
    filteredExpenses = filteredExpenses.filter(expense => 
      expense.date.includes(selectedMonth.substring(0, 3))
    );
  }

  // Calculate totals
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageMonthly = totalExpenses / (filteredExpenses.length ? Math.ceil(filteredExpenses.length / 4) : 1);

  // Prepare data for category breakdown chart
  const filteredBreakdownData = expenseBreakdownData
    .filter(item => item.propertyId === propertyId)
    .map(item => ({
      name: item.category,
      value: item.amount
    }));

  // Prepare data for profit/loss chart
  const filteredProfitLossData = profitLossData
    .filter(item => item.propertyId === propertyId)
    .map(item => ({
      name: item.month,
      income: item.income,
      expenses: item.expenses,
      profit: item.income - item.expenses
    }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Property Financial Analysis</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAddExpense(false)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button 
            size="sm"
            onClick={() => setShowAddExpense(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {showAddExpense ? (
        <AddExpenseForm propertyId={propertyId} onClose={() => setShowAddExpense(false)} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <CardDescription>All expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Monthly Average</CardTitle>
                <CardDescription>Average per month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${averageMonthly.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Expense Ratio</CardTitle>
                <CardDescription>Expenses / Income</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34%</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="expenses" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-4">
              <TabsTrigger value="expenses">Expense List</TabsTrigger>
              <TabsTrigger value="breakdown">Expense Breakdown</TabsTrigger>
              <TabsTrigger value="profitloss">Profit & Loss</TabsTrigger>
            </TabsList>
            <TabsContent value="expenses">
              <div className="flex justify-end mb-4">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Months</SelectItem>
                    <SelectItem value="Jan">January</SelectItem>
                    <SelectItem value="Feb">February</SelectItem>
                    <SelectItem value="Mar">March</SelectItem>
                    <SelectItem value="Apr">April</SelectItem>
                    <SelectItem value="May">May</SelectItem>
                    <SelectItem value="Jun">June</SelectItem>
                    <SelectItem value="Jul">July</SelectItem>
                    <SelectItem value="Aug">August</SelectItem>
                    <SelectItem value="Sep">September</SelectItem>
                    <SelectItem value="Oct">October</SelectItem>
                    <SelectItem value="Nov">November</SelectItem>
                    <SelectItem value="Dec">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses.length > 0 ? (
                      filteredExpenses.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell>{expense.date}</TableCell>
                          <TableCell className="font-medium">{expense.description}</TableCell>
                          <TableCell>{expense.category}</TableCell>
                          <TableCell>{expense.vendor}</TableCell>
                          <TableCell className="text-right">${expense.amount.toLocaleString()}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">
                          No expenses found for this property.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="breakdown">
              <div className="bg-white rounded-lg shadow p-4">
                <h4 className="font-medium mb-4">Expense Distribution by Category</h4>
                <div className="flex flex-col space-y-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={filteredBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {filteredBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="profitloss">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Monthly Income vs. Expenses</h4>
                  <Select value={expensePeriod} onValueChange={setExpensePeriod}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Monthly</SelectItem>
                      <SelectItem value="quarter">Quarterly</SelectItem>
                      <SelectItem value="year">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredProfitLossData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Bar dataKey="income" name="Income">
                      {filteredProfitLossData.map((_, index) => (
                        <Cell key={`cell-income-${index}`} fill={colors[1]} />
                      ))}
                    </Bar>
                    <Bar dataKey="expenses" name="Expenses">
                      {filteredProfitLossData.map((_, index) => (
                        <Cell key={`cell-expenses-${index}`} fill={colors[2]} />
                      ))}
                    </Bar>
                    <Bar dataKey="profit" name="Profit">
                      {filteredProfitLossData.map((_, index) => (
                        <Cell key={`cell-profit-${index}`} fill={colors[0]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default PropertyExpenses;
