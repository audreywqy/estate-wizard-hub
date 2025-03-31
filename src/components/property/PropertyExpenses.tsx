
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Download, Filter, Plus, ArrowDownWideNarrow, ArrowUpNarrow, ChevronDown } from 'lucide-react';
import { Cell, BarChart, Bar, PieChart, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface PropertyExpensesProps {
  propertyId: number;
}

// Sample expense categories with subcategories
const expenseCategories = [
  { 
    id: 1, 
    name: 'Utilities', 
    subcategories: [
      { id: 101, name: 'Electricity' },
      { id: 102, name: 'Water' },
      { id: 103, name: 'Gas' },
      { id: 104, name: 'Internet/Cable' }
    ]
  },
  { 
    id: 2, 
    name: 'Maintenance', 
    subcategories: [
      { id: 201, name: 'Repairs' },
      { id: 202, name: 'Cleaning' },
      { id: 203, name: 'Landscaping' },
      { id: 204, name: 'Snow Removal' }
    ]
  },
  { 
    id: 3, 
    name: 'Insurance', 
    subcategories: [
      { id: 301, name: 'Property Insurance' },
      { id: 302, name: 'Liability Insurance' }
    ]
  },
  { 
    id: 4, 
    name: 'Taxes', 
    subcategories: [
      { id: 401, name: 'Property Taxes' },
      { id: 402, name: 'Income Taxes' }
    ]
  },
  { 
    id: 5, 
    name: 'Professional Services', 
    subcategories: [
      { id: 501, name: 'Legal Fees' },
      { id: 502, name: 'Accounting Fees' },
      { id: 503, name: 'Property Management' }
    ]
  },
  { 
    id: 6, 
    name: 'Administrative', 
    subcategories: [
      { id: 601, name: 'Office Supplies' },
      { id: 602, name: 'Software/Technology' },
      { id: 603, name: 'Marketing' }
    ]
  }
];

// Sample tenants
const tenants = [
  { id: 1, name: 'John Smith', unit: '101' },
  { id: 2, name: 'Sarah Johnson', unit: '102' },
  { id: 3, name: 'Michael Brown', unit: '201' },
  { id: 4, name: 'Emily Davis', unit: '202' }
];

// Sample revenue data (by month)
const revenueData = [
  { month: 'Jan', rent: 12000, other: 500 },
  { month: 'Feb', rent: 12000, other: 300 },
  { month: 'Mar', rent: 12000, other: 600 },
  { month: 'Apr', rent: 12500, other: 400 },
  { month: 'May', rent: 12500, other: 350 },
  { month: 'Jun', rent: 12500, other: 450 },
  { month: 'Jul', rent: 13000, other: 500 },
  { month: 'Aug', rent: 13000, other: 550 },
  { month: 'Sep', rent: 13000, other: 600 },
  { month: 'Oct', rent: 13500, other: 400 },
  { month: 'Nov', rent: 13500, other: 450 },
  { month: 'Dec', rent: 13500, other: 700 }
];

// Sample expenses by category and month
const expensesData = [
  { 
    category: 'Utilities',
    Jan: 2200, Feb: 2100, Mar: 2300, Apr: 2150, May: 2050, Jun: 2400,
    Jul: 2500, Aug: 2600, Sep: 2400, Oct: 2100, Nov: 2250, Dec: 2300,
    subcategories: [
      { 
        name: 'Electricity',
        Jan: 800, Feb: 750, Mar: 820, Apr: 780, May: 760, Jun: 900,
        Jul: 950, Aug: 1000, Sep: 920, Oct: 800, Nov: 830, Dec: 850
      },
      { 
        name: 'Water',
        Jan: 400, Feb: 380, Mar: 420, Apr: 400, May: 390, Jun: 430,
        Jul: 450, Aug: 460, Sep: 440, Oct: 410, Nov: 420, Dec: 430
      },
      { 
        name: 'Gas',
        Jan: 600, Feb: 580, Mar: 650, Apr: 600, May: 550, Jun: 620,
        Jul: 650, Aug: 670, Sep: 630, Oct: 580, Nov: 600, Dec: 620
      },
      { 
        name: 'Internet/Cable',
        Jan: 400, Feb: 390, Mar: 410, Apr: 370, May: 350, Jun: 450,
        Jul: 450, Aug: 470, Sep: 410, Oct: 310, Nov: 400, Dec: 400
      }
    ]
  },
  { 
    category: 'Maintenance',
    Jan: 1800, Feb: 1200, Mar: 2100, Apr: 1600, May: 1500, Jun: 1700,
    Jul: 1900, Aug: 2000, Sep: 1800, Oct: 1600, Nov: 1700, Dec: 2200,
    subcategories: [
      { 
        name: 'Repairs',
        Jan: 800, Feb: 500, Mar: 1200, Apr: 700, May: 600, Jun: 800,
        Jul: 900, Aug: 1000, Sep: 800, Oct: 700, Nov: 800, Dec: 1200
      },
      { 
        name: 'Cleaning',
        Jan: 400, Feb: 400, Mar: 400, Apr: 400, May: 400, Jun: 400,
        Jul: 450, Aug: 450, Sep: 450, Oct: 400, Nov: 400, Dec: 450
      },
      { 
        name: 'Landscaping',
        Jan: 300, Feb: 0, Mar: 200, Apr: 300, May: 300, Jun: 300,
        Jul: 350, Aug: 350, Sep: 350, Oct: 300, Nov: 300, Dec: 200
      },
      { 
        name: 'Snow Removal',
        Jan: 300, Feb: 300, Mar: 300, Apr: 200, May: 200, Jun: 200,
        Jul: 200, Aug: 200, Sep: 200, Oct: 200, Nov: 200, Dec: 350
      }
    ]
  },
  { 
    category: 'Insurance',
    Jan: 1200, Feb: 1200, Mar: 1200, Apr: 1200, May: 1200, Jun: 1200,
    Jul: 1300, Aug: 1300, Sep: 1300, Oct: 1300, Nov: 1300, Dec: 1300,
    subcategories: [
      { 
        name: 'Property Insurance',
        Jan: 900, Feb: 900, Mar: 900, Apr: 900, May: 900, Jun: 900,
        Jul: 1000, Aug: 1000, Sep: 1000, Oct: 1000, Nov: 1000, Dec: 1000
      },
      { 
        name: 'Liability Insurance',
        Jan: 300, Feb: 300, Mar: 300, Apr: 300, May: 300, Jun: 300,
        Jul: 300, Aug: 300, Sep: 300, Oct: 300, Nov: 300, Dec: 300
      }
    ]
  },
  { 
    category: 'Taxes',
    Jan: 3000, Feb: 0, Mar: 0, Apr: 3000, May: 0, Jun: 0,
    Jul: 3000, Aug: 0, Sep: 0, Oct: 3000, Nov: 0, Dec: 0,
    subcategories: [
      { 
        name: 'Property Taxes',
        Jan: 3000, Feb: 0, Mar: 0, Apr: 3000, May: 0, Jun: 0,
        Jul: 3000, Aug: 0, Sep: 0, Oct: 3000, Nov: 0, Dec: 0
      }
    ]
  },
  { 
    category: 'Professional Services',
    Jan: 1000, Feb: 500, Mar: 500, Apr: 1000, May: 500, Jun: 500,
    Jul: 1000, Aug: 500, Sep: 500, Oct: 1000, Nov: 500, Dec: 500,
    subcategories: [
      { 
        name: 'Legal Fees',
        Jan: 500, Feb: 0, Mar: 0, Apr: 500, May: 0, Jun: 0,
        Jul: 500, Aug: 0, Sep: 0, Oct: 500, Nov: 0, Dec: 0
      },
      { 
        name: 'Accounting Fees',
        Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
        Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
      },
      { 
        name: 'Property Management',
        Jan: 500, Feb: 500, Mar: 500, Apr: 500, May: 500, Jun: 500,
        Jul: 500, Aug: 500, Sep: 500, Oct: 500, Nov: 500, Dec: 500
      }
    ]
  },
  { 
    category: 'Administrative',
    Jan: 800, Feb: 600, Mar: 700, Apr: 750, May: 650, Jun: 700,
    Jul: 850, Aug: 700, Sep: 750, Oct: 800, Nov: 700, Dec: 750,
    subcategories: [
      { 
        name: 'Office Supplies',
        Jan: 200, Feb: 100, Mar: 150, Apr: 200, May: 100, Jun: 150,
        Jul: 200, Aug: 150, Sep: 200, Oct: 200, Nov: 150, Dec: 200
      },
      { 
        name: 'Software/Technology',
        Jan: 400, Feb: 400, Mar: 400, Apr: 400, May: 400, Jun: 400,
        Jul: 450, Aug: 450, Sep: 450, Oct: 450, Nov: 450, Dec: 450
      },
      { 
        name: 'Marketing',
        Jan: 200, Feb: 100, Mar: 150, Apr: 150, May: 150, Jun: 150,
        Jul: 200, Aug: 100, Sep: 100, Oct: 150, Nov: 100, Dec: 100
      }
    ]
  }
];

// Calculate monthly totals for each category to create chart data
const getChartData = () => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthNames.map(month => {
    const monthData = { name: month };
    // Sum all expenses for this month
    let total = 0;
    expensesData.forEach(category => {
      total += category[month] || 0;
    });
    monthData.value = total;
    
    // Calculate revenue for this month
    const revenueItem = revenueData.find(item => item.month === month);
    const revenue = revenueItem ? revenueItem.rent + revenueItem.other : 0;
    
    // Profit is revenue minus expenses
    monthData.profit = revenue - total;
    
    return monthData;
  });
};

// Generate data for category breakdown pie chart
const getCategoryBreakdownData = () => {
  return expensesData.map(category => {
    // Sum all months for this category
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let total = 0;
    months.forEach(month => {
      total += category[month] || 0;
    });
    
    return {
      name: category.category,
      value: total
    };
  });
};

// Colors for charts
const pieColors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
const barColors = {
  profit: '#4caf50',  // Green for profit
  loss: '#f44336',    // Red for loss
  expense: '#2196f3'  // Blue for expense
};

const PropertyExpenses: React.FC<PropertyExpensesProps> = ({ propertyId }) => {
  const [tab, setTab] = useState('expenses');
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [selectedTenant, setSelectedTenant] = useState<string>('');
  const [billableToTenant, setBillableToTenant] = useState<boolean>(false);
  const [plViewMode, setPlViewMode] = useState<string>('month');
  const [plTimeRange, setPlTimeRange] = useState<string>('year');
  const [plPropertyFilter, setPlPropertyFilter] = useState<string>(propertyId.toString());
  const [plMonthFilter, setPlMonthFilter] = useState<string>('all');
  const [plStartDate, setPlStartDate] = useState<Date | undefined>(undefined);
  const [plEndDate, setPlEndDate] = useState<Date | undefined>(undefined);
  
  // Get subcategories for the selected category
  const subcategories = expenseCategories.find(cat => cat.id.toString() === selectedCategory)?.subcategories || [];
  
  // Chart data
  const chartData = getChartData();
  const categoryBreakdownData = getCategoryBreakdownData();
  
  // Calculate profit/loss data for bar chart with colors
  const profitLossData = chartData.map(item => ({
    name: item.name,
    value: item.profit,
    color: item.profit >= 0 ? barColors.profit : barColors.loss
  }));
  
  const coloredProfitLossData = profitLossData.map(item => ({
    name: item.name,
    value: item.value,
    color: item.value >= 0 ? barColors.profit : barColors.loss
  }));
  
  // Get all months for the year
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Calculate total revenue, expenses, and profit for the year
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.rent + item.other, 0);
  const totalExpenses = expensesData.reduce((sum, category) => {
    return sum + months.reduce((monthSum, month) => monthSum + (category[month] || 0), 0);
  }, 0);
  const totalProfit = totalRevenue - totalExpenses;
  
  // Helper function to render the P&L table based on view mode
  const renderProfitLossTable = () => {
    // Determine columns based on view mode
    let columns: string[] = [];
    if (plViewMode === 'month') {
      if (plMonthFilter !== 'all') {
        columns = ['Category', 'Amount'];
      } else {
        columns = ['Category', ...months];
      }
    } else if (plViewMode === 'property') {
      columns = ['Category', 'Property 1', 'Property 2', 'Property 3', 'Property 4'];
    } else if (plViewMode === 'custom') {
      columns = ['Category', 'Amount'];
    }
    
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index} className={index === 0 ? 'w-[250px]' : ''}>
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Revenue Section */}
          <TableRow className="font-bold bg-muted/30">
            <TableCell>Revenue</TableCell>
            {plViewMode === 'month' && plMonthFilter === 'all' ? (
              months.map((month, idx) => {
                const monthRevenue = revenueData.find(item => item.month === month);
                const total = monthRevenue ? monthRevenue.rent + monthRevenue.other : 0;
                return (
                  <TableCell key={idx} className="text-right">
                    ${total.toLocaleString()}
                  </TableCell>
                );
              })
            ) : (
              <TableCell className="text-right">${totalRevenue.toLocaleString()}</TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell className="pl-6">Rental Income</TableCell>
            {plViewMode === 'month' && plMonthFilter === 'all' ? (
              months.map((month, idx) => {
                const monthRevenue = revenueData.find(item => item.month === month);
                return (
                  <TableCell key={idx} className="text-right">
                    ${(monthRevenue?.rent || 0).toLocaleString()}
                  </TableCell>
                );
              })
            ) : (
              <TableCell className="text-right">
                ${revenueData.reduce((sum, item) => sum + item.rent, 0).toLocaleString()}
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell className="pl-6">Other Income</TableCell>
            {plViewMode === 'month' && plMonthFilter === 'all' ? (
              months.map((month, idx) => {
                const monthRevenue = revenueData.find(item => item.month === month);
                return (
                  <TableCell key={idx} className="text-right">
                    ${(monthRevenue?.other || 0).toLocaleString()}
                  </TableCell>
                );
              })
            ) : (
              <TableCell className="text-right">
                ${revenueData.reduce((sum, item) => sum + item.other, 0).toLocaleString()}
              </TableCell>
            )}
          </TableRow>
          
          {/* Spacer Row */}
          <TableRow>
            <TableCell className="h-4" colSpan={columns.length}></TableCell>
          </TableRow>
          
          {/* Expenses Section */}
          <TableRow className="font-bold bg-muted/30">
            <TableCell>Expenses</TableCell>
            {plViewMode === 'month' && plMonthFilter === 'all' ? (
              months.map((month, idx) => {
                const monthExpenses = expensesData.reduce((sum, category) => sum + (category[month] || 0), 0);
                return (
                  <TableCell key={idx} className="text-right">
                    ${monthExpenses.toLocaleString()}
                  </TableCell>
                );
              })
            ) : (
              <TableCell className="text-right">${totalExpenses.toLocaleString()}</TableCell>
            )}
          </TableRow>
          
          {/* Render each expense category */}
          {expensesData.map((category, catIndex) => (
            <React.Fragment key={catIndex}>
              <TableRow>
                <TableCell className="pl-6 font-medium">{category.category}</TableCell>
                {plViewMode === 'month' && plMonthFilter === 'all' ? (
                  months.map((month, idx) => (
                    <TableCell key={idx} className="text-right">
                      ${(category[month] || 0).toLocaleString()}
                    </TableCell>
                  ))
                ) : (
                  <TableCell className="text-right">
                    ${months.reduce((sum, month) => sum + (category[month] || 0), 0).toLocaleString()}
                  </TableCell>
                )}
              </TableRow>
              
              {/* Render subcategories */}
              {category.subcategories.map((subcat, subIdx) => (
                <TableRow key={`${catIndex}-${subIdx}`} className="text-sm text-muted-foreground">
                  <TableCell className="pl-10">{subcat.name}</TableCell>
                  {plViewMode === 'month' && plMonthFilter === 'all' ? (
                    months.map((month, idx) => (
                      <TableCell key={idx} className="text-right">
                        ${(subcat[month] || 0).toLocaleString()}
                      </TableCell>
                    ))
                  ) : (
                    <TableCell className="text-right">
                      ${months.reduce((sum, month) => sum + (subcat[month] || 0), 0).toLocaleString()}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
          
          {/* Spacer Row */}
          <TableRow>
            <TableCell className="h-4" colSpan={columns.length}></TableCell>
          </TableRow>
          
          {/* Net Profit/Loss Row */}
          <TableRow className="font-bold text-lg">
            <TableCell>Net Profit/Loss</TableCell>
            {plViewMode === 'month' && plMonthFilter === 'all' ? (
              months.map((month, idx) => {
                const monthRevenue = revenueData.find(item => item.month === month);
                const revenue = monthRevenue ? monthRevenue.rent + monthRevenue.other : 0;
                const expenses = expensesData.reduce((sum, category) => sum + (category[month] || 0), 0);
                const profit = revenue - expenses;
                
                return (
                  <TableCell 
                    key={idx} 
                    className={cn(
                      "text-right",
                      profit >= 0 ? "text-green-600" : "text-red-600"
                    )}
                  >
                    ${profit.toLocaleString()}
                  </TableCell>
                );
              })
            ) : (
              <TableCell 
                className={cn(
                  "text-right",
                  totalProfit >= 0 ? "text-green-600" : "text-red-600"
                )}
              >
                ${totalProfit.toLocaleString()}
              </TableCell>
            )}
          </TableRow>
        </TableBody>
      </Table>
    );
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Property Expenses</h2>
        <Button onClick={() => setAddExpenseOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>
      
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="profit-loss">Profit & Loss</TabsTrigger>
        </TabsList>
        
        <TabsContent value="expenses" className="space-y-4">
          {/* Expenses List */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Expense Transactions</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Billable To</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>01/15/2023</TableCell>
                    <TableCell>Utilities - Electricity</TableCell>
                    <TableCell>Monthly Electric Bill</TableCell>
                    <TableCell>$840.00</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>01/10/2023</TableCell>
                    <TableCell>Maintenance - Plumbing</TableCell>
                    <TableCell>Repair leaking pipes in unit 202</TableCell>
                    <TableCell>$485.00</TableCell>
                    <TableCell>Sarah Johnson (Unit 102)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>01/05/2023</TableCell>
                    <TableCell>Utilities - Water</TableCell>
                    <TableCell>Monthly Water Bill</TableCell>
                    <TableCell>$420.00</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>01/02/2023</TableCell>
                    <TableCell>Insurance - Property</TableCell>
                    <TableCell>Monthly Premium</TableCell>
                    <TableCell>$950.00</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>12/28/2022</TableCell>
                    <TableCell>Taxes - Property</TableCell>
                    <TableCell>Quarterly Property Tax</TableCell>
                    <TableCell>$3,200.00</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Expenses Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Expenses Trend</CardTitle>
                <CardDescription>Expenses over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                    <Bar dataKey="value" name="Expenses" fill={barColors.expense} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Monthly Profit/Loss */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Profit/Loss</CardTitle>
                <CardDescription>Net profit or loss by month</CardDescription>
              </CardHeader>
              <CardContent className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={coloredProfitLossData}>
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
            
            {/* Expense Categories Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>Breakdown by expense category</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryBreakdownData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Expense Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>Annual Expense Summary</CardTitle>
                <CardDescription>Total expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expensesData.map((category, index) => {
                    // Calculate total for this category
                    const total = months.reduce((sum, month) => sum + (category[month] || 0), 0);
                    // Calculate percentage of total expenses
                    const percentage = (total / totalExpenses) * 100;
                    
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{category.category}</span>
                          <span>${total.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground text-right">
                          {percentage.toFixed(1)}% of total
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="profit-loss" className="space-y-6">
          {/* Filters for P&L Statement */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Profit & Loss Statement</CardTitle>
              <CardDescription>View financial performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label htmlFor="viewMode">View By</Label>
                  <Select value={plViewMode} onValueChange={setPlViewMode}>
                    <SelectTrigger id="viewMode">
                      <SelectValue placeholder="Select view mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="property">Property</SelectItem>
                      <SelectItem value="custom">Custom Date Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {plViewMode === 'month' && (
                  <div>
                    <Label htmlFor="monthFilter">Month</Label>
                    <Select value={plMonthFilter} onValueChange={setPlMonthFilter}>
                      <SelectTrigger id="monthFilter">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Months</SelectItem>
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
                )}
                
                {plViewMode === 'property' && (
                  <div>
                    <Label htmlFor="propertyFilter">Property</Label>
                    <Select value={plPropertyFilter} onValueChange={setPlPropertyFilter}>
                      <SelectTrigger id="propertyFilter">
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Properties</SelectItem>
                        <SelectItem value="1">Sunset Apartments</SelectItem>
                        <SelectItem value="2">Mountain View Complex</SelectItem>
                        <SelectItem value="3">Downtown Lofts</SelectItem>
                        <SelectItem value="4">Riverside Condos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {plViewMode === 'custom' && (
                  <>
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            id="startDate"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {plStartDate ? format(plStartDate, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={plStartDate}
                            onSelect={setPlStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            id="endDate"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {plEndDate ? format(plEndDate, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={plEndDate}
                            onSelect={setPlEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </>
                )}
                
                <div className="flex items-end">
                  <Button className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
              </div>
              
              {/* P&L Statement Table */}
              <div className="rounded-md border overflow-auto">
                {renderProfitLossTable()}
              </div>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export as CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Expense Dialog */}
      <Dialog open={addExpenseOpen} onOpenChange={setAddExpenseOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
            <DialogDescription>
              Enter the details of the expense for this property.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Pick a date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select expense category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map(category => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedCategory && (
              <div className="grid gap-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                  <SelectTrigger id="subcategory">
                    <SelectValue placeholder="Select expense subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories.map(subcategory => (
                      <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Brief description of the expense" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Label htmlFor="billable" className="flex items-center space-x-2 cursor-pointer">
                <input
                  id="billable"
                  type="checkbox"
                  className="form-checkbox h-4 w-4"
                  checked={billableToTenant}
                  onChange={(e) => setBillableToTenant(e.target.checked)}
                />
                <span>Billable to tenant</span>
              </Label>
            </div>
            
            {billableToTenant && (
              <div className="grid gap-2">
                <Label htmlFor="tenant">Select Tenant</Label>
                <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                  <SelectTrigger id="tenant">
                    <SelectValue placeholder="Select tenant" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenants.map(tenant => (
                      <SelectItem key={tenant.id} value={tenant.id.toString()}>
                        {tenant.name} (Unit {tenant.unit})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="receipt">Upload Receipt</Label>
              <Input id="receipt" type="file" className="cursor-pointer" />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setAddExpenseOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Expense</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyExpenses;
