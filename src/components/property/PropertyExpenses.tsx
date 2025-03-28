import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { expensesByCategoryMockData } from '@/data/mockUnitsData';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Progress } from '@/components/ui/progress';

interface PropertyExpensesProps {
  propertyId: number;
}

const PropertyExpenses: React.FC<PropertyExpensesProps> = ({ propertyId }) => {
  const expenseData = expensesByCategoryMockData.find(exp => exp.propertyId === propertyId);
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const totalExpenses = expenseData 
    ? expenseData.categories.reduce((sum, category) => sum + category.amount, 0)
    : 0;
    
  const annualBudget = expenseData?.annualBudget || 25000;
  const budgetUsedPercentage = Math.min(Math.round((totalExpenses / annualBudget) * 100), 100);
  
  const budgetComparisonData = expenseData?.categories.map(category => ({
    name: category.name,
    actual: category.amount,
    budget: category.budgetAmount || category.amount * 1.2,
  })) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Expenses by Category</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>
      
      {expenseData ? (
        <>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Annual Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Budget Used: ${totalExpenses.toLocaleString()} of ${annualBudget.toLocaleString()}</span>
                    <span className={`text-sm font-medium ${budgetUsedPercentage > 90 ? 'text-red-500' : ''}`}>
                      {budgetUsedPercentage}%
                    </span>
                  </div>
                  <Progress value={budgetUsedPercentage} className="h-2" />
                </div>
                
                {budgetUsedPercentage > 90 && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      You've used {budgetUsedPercentage}% of your annual budget. Consider reviewing your expenses.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Expense Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={expenseData.categories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {expenseData.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Expense Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseData.categories.map((category, index) => (
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
                    <span className="font-bold">${totalExpenses.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="col-span-full">
            <CardHeader>
              <CardTitle className="text-lg">Budget vs. Actual Expenses</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={budgetComparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="budget" name="Budget" fill="#8884d8" />
                  <Bar dataKey="actual" name="Actual" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
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
