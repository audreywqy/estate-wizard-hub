
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, PieChart, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { expensesByCategoryMockData } from '@/data/mockUnitsData';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PropertyExpensesProps {
  propertyId: number;
}

const PropertyExpenses: React.FC<PropertyExpensesProps> = ({ propertyId }) => {
  const expenseData = expensesByCategoryMockData.find(exp => exp.propertyId === propertyId);
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const totalExpenses = expenseData 
    ? expenseData.categories.reduce((sum, category) => sum + category.amount, 0)
    : 0;

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
