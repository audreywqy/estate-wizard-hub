// Mock data for units and tenants

export const tenantsMockData = [
  {
    id: 1,
    propertyId: 1,
    businessName: "ABC Corp",
    unitNumber: "101",
    leaseStart: "2023-01-01",
    leaseEnd: "2027-12-31",
    monthlyRent: 5500,
    primaryContact: "John Smith",
    email: "john@abccorp.com",
    phone: "(555) 123-4567",
    leaseType: "NNN",
    realEstateTax: 850,
    commonAreaMaintenance: 650,
    insurance: 350,
    rentEscalation: [
      { startDate: "2023-01-01", endDate: "2024-12-31", monthlyRent: 5500 },
      { startDate: "2025-01-01", endDate: "2025-12-31", monthlyRent: 5775 },
      { startDate: "2026-01-01", endDate: "2027-12-31", monthlyRent: 6063 }
    ]
  },
  {
    id: 2,
    propertyId: 1,
    businessName: "XYZ Industries",
    unitNumber: "102",
    leaseStart: "2022-06-01",
    leaseEnd: "2025-05-31",
    monthlyRent: 4800,
    primaryContact: "Sarah Johnson",
    email: "sarah@xyzind.com",
    phone: "(555) 987-6543",
    leaseType: "Gross",
    rentEscalation: [
      { startDate: "2022-06-01", endDate: "2023-05-31", monthlyRent: 4800 },
      { startDate: "2023-06-01", endDate: "2024-05-31", monthlyRent: 4944 },
      { startDate: "2024-06-01", endDate: "2025-05-31", monthlyRent: 5092 }
    ]
  },
  {
    id: 3,
    propertyId: 2,
    businessName: "123 Tech",
    unitNumber: "A",
    leaseStart: "2023-03-15",
    leaseEnd: "2028-03-14",
    monthlyRent: 7200,
    primaryContact: "Mike Wilson",
    email: "mike@123tech.com",
    phone: "(555) 456-7890",
    leaseType: "NNN",
    realEstateTax: 1100,
    commonAreaMaintenance: 800,
    insurance: 500,
    rentEscalation: [
      { startDate: "2023-03-15", endDate: "2025-03-14", monthlyRent: 7200 },
      { startDate: "2025-03-15", endDate: "2027-03-14", monthlyRent: 7560 },
      { startDate: "2027-03-15", endDate: "2028-03-14", monthlyRent: 7938 }
    ]
  },
  {
    id: 4,
    propertyId: 2,
    businessName: "Global Shipping",
    unitNumber: "B",
    leaseStart: "2022-11-01",
    leaseEnd: "2027-10-31",
    monthlyRent: 6500,
    primaryContact: "Lisa Brown",
    email: "lisa@globalshipping.com",
    phone: "(555) 789-0123",
    leaseType: "Gross",
    rentEscalation: [
      { startDate: "2022-11-01", endDate: "2024-10-31", monthlyRent: 6500 },
      { startDate: "2024-11-01", endDate: "2026-10-31", monthlyRent: 6825 },
      { startDate: "2026-11-01", endDate: "2027-10-31", monthlyRent: 7166 }
    ]
  },
  {
    id: 5,
    propertyId: 3,
    businessName: "Legal Partners LLC",
    unitNumber: "201",
    leaseStart: "2023-02-01",
    leaseEnd: "2028-01-31",
    monthlyRent: 6200,
    primaryContact: "David Martinez",
    email: "david@legalpartners.com",
    phone: "(555) 234-5678",
    leaseType: "NNN",
    realEstateTax: 950,
    commonAreaMaintenance: 720,
    insurance: 430,
    rentEscalation: [
      { startDate: "2023-02-01", endDate: "2025-01-31", monthlyRent: 6200 },
      { startDate: "2025-02-01", endDate: "2027-01-31", monthlyRent: 6510 },
      { startDate: "2027-02-01", endDate: "2028-01-31", monthlyRent: 6835 }
    ]
  }
];

export const unitsMockData = [
  {
    id: 1,
    propertyId: 1,
    unitNumber: "101",
    size: 2500,
    squareFeet: 2500,
    occupied: true,
    status: "Occupied",
    tenant: "ABC Corp",
    tenantId: 1,
    type: "Office",
    rentAmount: 5500
  },
  {
    id: 2,
    propertyId: 1,
    unitNumber: "102",
    size: 2200,
    squareFeet: 2200,
    occupied: true,
    status: "Occupied",
    tenant: "XYZ Industries",
    tenantId: 2,
    type: "Office",
    rentAmount: 4800
  },
  {
    id: 3,
    propertyId: 1,
    unitNumber: "103",
    size: 2300,
    squareFeet: 2300,
    occupied: false,
    status: "Vacant",
    tenant: null,
    tenantId: null,
    type: "Office",
    rentAmount: 5000
  },
  {
    id: 4,
    propertyId: 2,
    unitNumber: "A",
    size: 3600,
    squareFeet: 3600,
    occupied: true,
    status: "Occupied",
    tenant: "123 Tech",
    tenantId: 3,
    type: "Retail",
    rentAmount: 7200
  },
  {
    id: 5,
    propertyId: 2,
    unitNumber: "B",
    size: 3200,
    squareFeet: 3200,
    occupied: true,
    status: "Occupied",
    tenant: "Global Shipping",
    tenantId: 4,
    type: "Retail",
    rentAmount: 6500
  },
  {
    id: 6,
    propertyId: 3,
    unitNumber: "201",
    size: 3000,
    squareFeet: 3000,
    occupied: true,
    status: "Occupied",
    tenant: "Legal Partners LLC",
    tenantId: 5,
    type: "Mixed Use",
    rentAmount: 6200
  },
  {
    id: 7,
    propertyId: 3,
    unitNumber: "202",
    size: 2800,
    squareFeet: 2800,
    occupied: false,
    status: "Vacant",
    tenant: null,
    tenantId: null,
    type: "Mixed Use",
    rentAmount: 5800
  }
];

// Adding missing mock data for documents
export const documentsMockData = [
  {
    id: 1,
    propertyId: 1,
    name: "Lease Agreement - ABC Corp",
    category: "Lease",
    tenant: "ABC Corp",
    dateUploaded: "Jan 15, 2023",
    size: "2.4 MB"
  },
  {
    id: 2,
    propertyId: 1,
    name: "Property Insurance Policy",
    category: "Insurance",
    tenant: null,
    dateUploaded: "Feb 10, 2023",
    size: "1.8 MB"
  },
  {
    id: 3,
    propertyId: 2,
    name: "Tax Assessment 2023",
    category: "Tax",
    tenant: null,
    dateUploaded: "Mar 22, 2023",
    size: "950 KB"
  },
  {
    id: 4,
    propertyId: 2,
    name: "Building Permits",
    category: "Permits",
    tenant: null,
    dateUploaded: "Apr 05, 2023",
    size: "1.2 MB"
  },
  {
    id: 5,
    propertyId: 3,
    name: "Lease Agreement - Legal Partners",
    category: "Lease",
    tenant: "Legal Partners LLC",
    dateUploaded: "Feb 05, 2023",
    size: "2.1 MB"
  }
];

// Adding missing mock data for expenses
export const expensesMockData = [
  {
    id: 1,
    propertyId: 1,
    date: "Jan 15, 2023",
    description: "HVAC Repair",
    category: "Maintenance",
    vendor: "Premium HVAC",
    amount: 1250
  },
  {
    id: 2,
    propertyId: 1,
    date: "Feb 03, 2023",
    description: "Property Insurance Payment",
    category: "Insurance",
    vendor: "SafeGuard Insurance",
    amount: 3500
  },
  {
    id: 3,
    propertyId: 1,
    date: "Mar 10, 2023",
    description: "Landscaping",
    category: "Maintenance",
    vendor: "Green Gardens",
    amount: 850
  },
  {
    id: 4,
    propertyId: 2,
    date: "Jan 22, 2023",
    description: "Plumbing Repair",
    category: "Maintenance",
    vendor: "City Plumbers",
    amount: 975
  },
  {
    id: 5,
    propertyId: 2,
    date: "Feb 15, 2023",
    description: "Property Tax",
    category: "Taxes",
    vendor: "City Government",
    amount: 4800
  },
  {
    id: 6,
    propertyId: 3,
    date: "Jan 05, 2023",
    description: "Electrical Maintenance",
    category: "Maintenance",
    vendor: "Electro Solutions",
    amount: 1100
  },
  {
    id: 7,
    propertyId: 3,
    date: "Mar 20, 2023",
    description: "Security System Upgrade",
    category: "Security",
    vendor: "SecureTech",
    amount: 2300
  }
];

// Adding mock data for expense breakdown
export const expenseBreakdownData = [
  {
    propertyId: 1,
    category: "Maintenance",
    amount: 2100
  },
  {
    propertyId: 1,
    category: "Insurance",
    amount: 3500
  },
  {
    propertyId: 1,
    category: "Taxes",
    amount: 4200
  },
  {
    propertyId: 1,
    category: "Utilities",
    amount: 1800
  },
  {
    propertyId: 2,
    category: "Maintenance",
    amount: 975
  },
  {
    propertyId: 2,
    category: "Insurance",
    amount: 2800
  },
  {
    propertyId: 2,
    category: "Taxes",
    amount: 4800
  },
  {
    propertyId: 2,
    category: "Utilities",
    amount: 1450
  },
  {
    propertyId: 3,
    category: "Maintenance",
    amount: 1100
  },
  {
    propertyId: 3,
    category: "Security",
    amount: 2300
  },
  {
    propertyId: 3,
    category: "Insurance",
    amount: 3100
  },
  {
    propertyId: 3,
    category: "Taxes",
    amount: 3900
  }
];

// Adding mock data for profit/loss
export const profitLossData = [
  {
    propertyId: 1,
    month: "Jan",
    income: 10300,
    expenses: 4750
  },
  {
    propertyId: 1,
    month: "Feb",
    income: 10300,
    expenses: 3500
  },
  {
    propertyId: 1,
    month: "Mar",
    income: 10300,
    expenses: 850
  },
  {
    propertyId: 1,
    month: "Apr",
    income: 10300,
    expenses: 1200
  },
  {
    propertyId: 1,
    month: "May",
    income: 10300,
    expenses: 1500
  },
  {
    propertyId: 1,
    month: "Jun",
    income: 10300,
    expenses: 2200
  },
  {
    propertyId: 2,
    month: "Jan",
    income: 13700,
    expenses: 975
  },
  {
    propertyId: 2,
    month: "Feb",
    income: 13700,
    expenses: 4800
  },
  {
    propertyId: 2,
    month: "Mar",
    income: 13700,
    expenses: 1200
  },
  {
    propertyId: 2,
    month: "Apr",
    income: 13700,
    expenses: 1650
  },
  {
    propertyId: 2,
    month: "May",
    income: 13700,
    expenses: 900
  },
  {
    propertyId: 2,
    month: "Jun",
    income: 13700,
    expenses: 2500
  },
  {
    propertyId: 3,
    month: "Jan",
    income: 6200,
    expenses: 1100
  },
  {
    propertyId: 3,
    month: "Feb",
    income: 6200,
    expenses: 1300
  },
  {
    propertyId: 3,
    month: "Mar",
    income: 6200,
    expenses: 2300
  },
  {
    propertyId: 3,
    month: "Apr",
    income: 6200,
    expenses: 900
  },
  {
    propertyId: 3,
    month: "May",
    income: 6200,
    expenses: 1100
  },
  {
    propertyId: 3,
    month: "Jun",
    income: 6200,
    expenses: 1800
  }
];

// Adding mock data for ledgers
export const ledgersMockData = [
  {
    id: 1,
    propertyId: 1,
    date: "Jan 01, 2023",
    description: "Rent Payment - ABC Corp",
    unitOrTenant: "101 / ABC Corp",
    category: "Rent",
    type: "Income",
    amount: 5500
  },
  {
    id: 2,
    propertyId: 1,
    date: "Jan 01, 2023",
    description: "Rent Payment - XYZ Industries",
    unitOrTenant: "102 / XYZ Industries",
    category: "Rent",
    type: "Income",
    amount: 4800
  },
  {
    id: 3,
    propertyId: 1,
    date: "Jan 15, 2023",
    description: "HVAC Repair",
    unitOrTenant: "Property Wide",
    category: "Maintenance",
    type: "Expense",
    amount: 1250
  },
  {
    id: 4,
    propertyId: 1,
    date: "Feb 01, 2023",
    description: "Rent Payment - ABC Corp",
    unitOrTenant: "101 / ABC Corp",
    category: "Rent",
    type: "Income",
    amount: 5500
  },
  {
    id: 5,
    propertyId: 1,
    date: "Feb 01, 2023",
    description: "Rent Payment - XYZ Industries",
    unitOrTenant: "102 / XYZ Industries",
    category: "Rent",
    type: "Income",
    amount: 4800
  },
  {
    id: 6,
    propertyId: 1,
    date: "Feb 03, 2023",
    description: "Property Insurance Payment",
    unitOrTenant: "Property Wide",
    category: "Insurance",
    type: "Expense",
    amount: 3500
  },
  {
    id: 7,
    propertyId: 2,
    date: "Jan 01, 2023",
    description: "Rent Payment - 123 Tech",
    unitOrTenant: "A / 123 Tech",
    category: "Rent",
    type: "Income",
    amount: 7200
  },
  {
    id: 8,
    propertyId: 2,
    date: "Jan 01, 2023",
    description: "Rent Payment - Global Shipping",
    unitOrTenant: "B / Global Shipping",
    category: "Rent",
    type: "Income",
    amount: 6500
  },
  {
    id: 9,
    propertyId: 2,
    date: "Jan 22, 2023",
    description: "Plumbing Repair",
    unitOrTenant: "A / 123 Tech",
    category: "Maintenance",
    type: "Expense",
    amount: 975
  },
  {
    id: 10,
    propertyId: 3,
    date: "Jan 01, 2023",
    description: "Rent Payment - Legal Partners LLC",
    unitOrTenant: "201 / Legal Partners LLC",
    category: "Rent",
    type: "Income",
    amount: 6200
  },
  {
    id: 11,
    propertyId: 3,
    date: "Jan 05, 2023",
    description: "Electrical Maintenance",
    unitOrTenant: "Property Wide",
    category: "Maintenance",
    type: "Expense",
    amount: 1100
  }
];

// Adding mock data for maintenance schedule
export const maintenanceScheduleMockData = [
  {
    id: 1,
    propertyId: 1,
    title: "HVAC System Inspection",
    description: "Regular inspection and maintenance of the HVAC system",
    recurrence: "Quarterly",
    nextDueDate: "Sep 15, 2023",
    estimatedCost: 800,
    vendor: "Premium HVAC"
  },
  {
    id: 2,
    propertyId: 1,
    title: "Roof Inspection",
    description: "Annual roof inspection to check for leaks and damage",
    recurrence: "Yearly",
    nextDueDate: "Nov 20, 2023",
    estimatedCost: 1200,
    vendor: "TopNotch Roofing"
  },
  {
    id: 3,
    propertyId: 1,
    title: "Landscaping",
    description: "Regular lawn maintenance and landscaping",
    recurrence: "Monthly",
    nextDueDate: "Aug 05, 2023",
    estimatedCost: 850,
    vendor: "Green Gardens"
  },
  {
    id: 4,
    propertyId: 2,
    title: "Elevator Inspection",
    description: "Safety inspection of elevator systems",
    recurrence: "Quarterly",
    nextDueDate: "Sep 10, 2023",
    estimatedCost: 950,
    vendor: "Elevator Experts"
  },
  {
    id: 5,
    propertyId: 2,
    title: "Fire Alarm Testing",
    description: "Mandatory testing of fire alarm systems",
    recurrence: "Monthly",
    nextDueDate: "Aug 12, 2023",
    estimatedCost: 600,
    vendor: "FireSafe Systems"
  },
  {
    id: 6,
    propertyId: 3,
    title: "Security System Check",
    description: "Comprehensive review of all security systems",
    recurrence: "Quarterly",
    nextDueDate: "Oct 01, 2023",
    estimatedCost: 750,
    vendor: "SecureTech"
  },
  {
    id: 7,
    propertyId: 3,
    title: "Plumbing System Inspection",
    description: "Check all plumbing systems for leaks and functionality",
    recurrence: "Yearly",
    nextDueDate: "Dec 15, 2023",
    estimatedCost: 1100,
    vendor: "City Plumbers"
  }
];

// Add loan mock data
export const loanMockData = [
  {
    id: 1,
    propertyId: 1,
    loanAmount: 1600000,
    downPayment: 400000,
    interestRate: 4.25,
    term: 30,
    rateType: 'Fixed',
    monthlyPayment: 7865.21,
    originationDate: '2020-03-15',
    maturityDate: '2050-03-15',
    lender: 'First National Bank',
    loanNumber: 'L-102938476',
    principalPaid: 125000,
    paymentDueDay: '1st',
    contactName: 'John Smith',
    contactTitle: 'Loan Officer',
    contactPhone: '(555) 123-4567',
    contactEmail: 'jsmith@firstnational.com'
  },
  {
    id: 2,
    propertyId: 2,
    loanAmount: 2200000,
    downPayment: 800000,
    interestRate: 3.875,
    term: 25,
    rateType: 'Fixed',
    monthlyPayment: 11450.67,
    originationDate: '2021-05-22',
    maturityDate: '2046-05-22',
    lender: 'Commercial Trust',
    loanNumber: 'C-987654321',
    principalPaid: 98000,
    paymentDueDay: '5th',
    contactName: 'Sarah Johnson',
    contactTitle: 'Senior Loan Officer',
    contactPhone: '(555) 987-6543',
    contactEmail: 'sjohnson@commercialtrust.com'
  },
  {
    id: 3,
    propertyId: 3,
    loanAmount: 3500000,
    downPayment: 1500000,
    interestRate: 4.5,
    term: 20,
    rateType: 'ARM',
    monthlyPayment: 22182.09,
    originationDate: '2019-11-10',
    maturityDate: '2039-11-10',
    lender: 'Pacific Investment Bank',
    loanNumber: 'PIB-567890123',
    principalPaid: 350000,
    paymentDueDay: '15th',
    contactName: 'Michael Wong',
    contactTitle: 'VP Commercial Lending',
    contactPhone: '(555) 456-7890',
    contactEmail: 'mwong@pacificinvestment.com'
  }
];
