import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, AlertTriangle, ArrowUpDown, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { expensesByCategoryMockData } from '@/data/mockUnitsData';
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddExpenseForm } from '@/components/property/AddExpenseForm';

interface PropertyExpensesProps {
  propertyId: number;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const PropertyExpenses: React.FC<PropertyExpensesProps> = ({ propertyId }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('all');
  const [showBudgetOverview, setShowBudgetOverview] = useState<boolean>(true);
  const [showExpenseDialog, setShowExpenseDialog] = useState<boolean>(false);
  
  const expenseData = expensesByCategoryMockData.find(exp => exp.propertyId === propertyId);
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const totalExpenses = expenseData 
    ? expenseData.categories.reduce((sum, category) => sum + category.amount, 0)
    : 0;
    
  const annualBudget = expenseData?.annualBudget || 25000;
  const budgetUsedPercentage = Math.min(Math.round((totalExpenses / annualBudget) * 100), 100);
  
  const monthlyData = expenseData?.monthlyData || [];
  
  const categoryByMonthData = months.map((month, index) => {
    const monthData = monthlyData[index] || { categories: [] };
    const result = { month, total: 0 };
    
    expenseData?.categories.forEach(category => {
      const monthlyCategoryAmount = monthData.categories.find(c => c.name === category.name)?.amount || 0;
      result[category.name] = monthlyCategoryAmount;
      result.total += monthlyCategoryAmount;
    });
    
    return result;
  });
  
  const filteredCategoryData = selectedMonth === 'All' 
    ? expenseData?.categories || []
    : (() => {
        const monthIndex = months.indexOf(selectedMonth);
        if (monthIndex === -1) return expenseData?.categories || [];
        
        const monthData = monthlyData[monthIndex] || { categories: [] };
        return expenseData?.categories.map(category => {
          const monthlyCategoryData = monthData.categories.find(c => c.name === category.name);
          return {
            ...category,
            amount: monthlyCategoryData?.amount || 0,
            budgetAmount: (category.budgetAmount || category.amount * 1.2) / 12
          };
        }) || [];
      })();
  
  const filteredTotalExpenses = filteredCategoryData.reduce((sum, category) => sum + category.amount, 0);
  
  const budgetComparisonData = filteredCategoryData.map(category => ({
    name: category.name,
    actual: category.amount,
    budget: category.budgetAmount || (selectedMonth === 'All' ? category.amount * 1.2 : category.amount * 1.2 / 12),
  }));

  const calculateProfitLoss = (month = 'All') => {
    const expenses = month === 'All' 
      ? totalExpenses 
      : monthlyData[months.indexOf(month)]?.categories.reduce((sum, cat) => sum + cat.amount, 0) || 0;
    
    const revenue = month === 'All' ? 150000 : 12500;
    const profit = revenue - expenses;
    
    return { revenue, expenses, profit };
  };

  const profitLossData = calculateProfitLoss(selectedMonth);

  const coloredProfitLossData = [
    { name: 'Revenue', value: profitLossData.revenue, color: '#4caf50' },
    { name: 'Expenses', value: profitLossData.expenses, color: '#f44336' },
    { name: 'Profit', value: profitLossData.profit, color: profitLossData.profit >= 0 ? '#2196f3' : '#f44336' },
  ];

  const handleAddExpense = () => {
    setShowExpenseDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Expenses by Category</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={showExpenseDialog} onOpenChange={setShowExpenseDialog}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={handleAddExpense}>
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Enter the details for the new expense.
                </DialogDescription>
              </DialogHeader>
              <AddExpenseForm propertyId={propertyId} onClose={() => setShowExpenseDialog(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {expenseData ? (
        <>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Annual Budget Overview</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowBudgetOverview(!showBudgetOverview)}>
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  {showBudgetOverview ? 'Hide Details' : 'Show Details'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Budget Used: ${totalExpenses.toLocaleString()} of ${annualBudget.toLocaleString()}</span>
                    <span className={`text-sm font-medium ${budgetUsedPercentage > 90 ? 'text-red-500' : budgetUsedPercentage > 75 ? 'text-amber-500' : 'text-green-500'}`}>
                      {budgetUsedPercentage}%
                    </span>
                  </div>
                  <Progress 
                    value={budgetUsedPercentage} 
                    className={`h-2 ${
                      budgetUsedPercentage > 90 ? "bg-red-100" : 
                      budgetUsedPercentage > 75 ? "bg-amber-100" : 
                      "bg-green-100"
                    }`}
                  />
                </div>
                
                {budgetUsedPercentage > 90 && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      You've used {budgetUsedPercentage}% of your annual budget. Consider reviewing your expenses.
                    </p>
                  </div>
                )}
                
                {showBudgetOverview && (
                  <div className="mt-4 pt-4 border-t">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Budget</TableHead>
                          <TableHead className="text-right">Actual</TableHead>
                          <TableHead className="text-right">Remaining</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {expenseData.categories.map((category, index) => {
                          const budget = category.budgetAmount || category.amount * 1.2;
                          const remaining = budget - category.amount;
                          const percentUsed = Math.round((category.amount / budget) * 100);
                          
                          return (
                            <TableRow key={index}>
                              <TableCell>{category.name}</TableCell>
                              <TableCell className="text-right">${budget.toLocaleString()}</TableCell>
                              <TableCell className="text-right">${category.amount.toLocaleString()}</TableCell>
                              <TableCell 
                                className={`text-right ${
                                  remaining < 0 ? 'text-red-500' : remaining < budget * 0.1 ? 'text-amber-500' : 'text-green-500'
                                }`}
                              >
                                ${remaining.toLocaleString()} ({percentUsed}%)
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow className="font-bold">
                          <TableCell>Total</TableCell>
                          <TableCell className="text-right">${annualBudget.toLocaleString()}</TableCell>
                          <TableCell className="text-right">${totalExpenses.toLocaleString()}</TableCell>
                          <TableCell 
                            className={`text-right ${
                              annualBudget - totalExpenses < 0 ? 'text-red-500' : 
                              annualBudget - totalExpenses < annualBudget * 0.1 ? 'text-amber-500' : 
                              'text-green-500'
                            }`}
                          >
                            ${(annualBudget - totalExpenses).toLocaleString()} ({budgetUsedPercentage}%)
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                  <SelectItem value="q1">Q1</SelectItem>
                  <SelectItem value="q2">Q2</SelectItem>
                  <SelectItem value="q3">Q3</SelectItem>
                  <SelectItem value="q4">Q4</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Custom Range
              </Button>
            </div>
          
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Months</SelectItem>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="monthly-trend">Monthly Trend</TabsTrigger>
              <TabsTrigger value="budget-comparison">Budget Comparison</TabsTrigger>
              <TabsTrigger value="profit-loss">Profit & Loss</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {selectedMonth === 'All' ? 'Annual' : selectedMonth} Expense Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={filteredCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="amount"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {filteredCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {selectedMonth === 'All' ? 'Annual' : selectedMonth} Expense Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredCategoryData.map((category, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded-full mr-2" 
                              style={{ backgroundColor: colors[index % colors.length] }}
                            ></div>
                            <span>{category.name}</span>
                          </div>
                          <span className="font-medium">${category.amount.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="pt-4 mt-4 border-t border-gray-200 flex justify-between items-center">
                        <span className="font-bold">Total</span>
                        <span className="font-bold">${filteredTotalExpenses.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="monthly-trend">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Expense Trend</CardTitle>
                </CardHeader>
                <CardContent className="w-full h-96">
                  <ChartContainer 
                    config={{
                      primary: { theme: { dark: '#0088FE', light: '#0088FE' }, label: "Maintenance" },
                      secondary: { theme: { dark: '#00C49F', light: '#00C49F' }, label: "Utilities" },
                      tertiary: { theme: { dark: '#FFBB28', light: '#FFBB28' }, label: "Insurance" },
                      quaternary: { theme: { dark: '#FF8042', light: '#FF8042' }, label: "Property Tax" },
                      quinary: { theme: { dark: '#8884d8', light: '#8884d8' }, label: "Management" },
                    }}
                    className="w-full h-full"
                  >
                    <LineChart data={categoryByMonthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      {expenseData.categories.map((category, index) => (
                        <Line 
                          key={category.name} 
                          type="monotone" 
                          dataKey={category.name} 
                          stroke={colors[index % colors.length]} 
                          activeDot={{ r: 8 }} 
                        />
                      ))}
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="budget-comparison">
              <Card className="col-span-full w-full">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {selectedMonth === 'All' ? 'Annual' : selectedMonth} Budget vs. Actual Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={budgetComparisonData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="budget" name="Budget" fill="#8884d8" />
                      <Bar dataKey="actual" name="Actual" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profit-loss">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-green-600">Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${profitLossData.revenue.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-red-600">Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${profitLossData.expenses.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Net Profit/Loss</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${profitLossData.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${profitLossData.profit.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {selectedMonth === 'All' ? 'Annual' : selectedMonth} Profit & Loss Statement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={coloredProfitLossData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                        <Bar dataKey="value" name="Amount">
                          {coloredProfitLossData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No expense data found for this property.</p>
          <Button className="mt-4" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add First Expense
          </Button>
        </div>
      )}
    </div>
  );
};

export default PropertyExpenses;
