
export const unitsMockData = [
  {
    id: 1,
    propertyId: 1,
    unitNumber: "Suite 101",
    type: "Office",
    squareFeet: 1200,
    rentAmount: 2400,
    status: "Occupied",
    tenant: "Acme Corporation"
  },
  {
    id: 2,
    propertyId: 1,
    unitNumber: "Suite 102",
    type: "Office",
    squareFeet: 950,
    rentAmount: 1900,
    status: "Vacant",
    tenant: null
  },
  {
    id: 3,
    propertyId: 1,
    unitNumber: "Suite 103",
    type: "Office",
    squareFeet: 1500,
    rentAmount: 3000,
    status: "Occupied",
    tenant: "Tech Innovations Inc."
  },
  {
    id: 4,
    propertyId: 2,
    unitNumber: "Store 100",
    type: "Retail",
    squareFeet: 2000,
    rentAmount: 3500,
    status: "Occupied",
    tenant: "Global Retail Inc."
  },
  {
    id: 5,
    propertyId: 2,
    unitNumber: "Store 101",
    type: "Retail",
    squareFeet: 1800,
    rentAmount: 3200,
    status: "Occupied",
    tenant: "Fashion Boutique LLC"
  },
  {
    id: 6,
    propertyId: 3,
    unitNumber: "Warehouse A",
    type: "Industrial",
    squareFeet: 5000,
    rentAmount: 6000,
    status: "Occupied",
    tenant: "Logistics Solutions LLC"
  },
  {
    id: 7,
    propertyId: 4,
    unitNumber: "Unit 101",
    type: "Commercial",
    squareFeet: 1000,
    rentAmount: 2200,
    status: "Occupied",
    tenant: "Urban Café"
  },
  {
    id: 8,
    propertyId: 5,
    unitNumber: "Suite 500",
    type: "Office",
    squareFeet: 2500,
    rentAmount: 5000,
    status: "Occupied",
    tenant: "TechStart Inc."
  }
];

export const tenantsMockData = [
  {
    id: 1,
    propertyId: 1,
    businessName: "Acme Corporation",
    unitNumber: "Suite 101",
    leaseStart: "01/01/2023",
    leaseEnd: "12/31/2025",
    monthlyRent: 2400,
    primaryContact: "John Smith",
    email: "john@acmecorp.com",
    phone: "(555) 123-4567"
  },
  {
    id: 2,
    propertyId: 1,
    businessName: "Tech Innovations Inc.",
    unitNumber: "Suite 103",
    leaseStart: "02/15/2023",
    leaseEnd: "02/14/2026",
    monthlyRent: 3000,
    primaryContact: "Sarah Johnson",
    email: "sarah@techinnovations.com",
    phone: "(555) 987-6543"
  },
  {
    id: 3,
    propertyId: 2,
    businessName: "Global Retail Inc.",
    unitNumber: "Store 100",
    leaseStart: "03/15/2022",
    leaseEnd: "03/14/2027",
    monthlyRent: 3500,
    primaryContact: "Michael Brown",
    email: "leasing@globalretail.com",
    phone: "(555) 234-5678"
  },
  {
    id: 4,
    propertyId: 2,
    businessName: "Fashion Boutique LLC",
    unitNumber: "Store 101",
    leaseStart: "04/01/2023",
    leaseEnd: "03/31/2025",
    monthlyRent: 3200,
    primaryContact: "Emma Wilson",
    email: "emma@fashionboutique.com",
    phone: "(555) 876-5432"
  },
  {
    id: 5,
    propertyId: 3,
    businessName: "Logistics Solutions LLC",
    unitNumber: "Warehouse A",
    leaseStart: "07/01/2022",
    leaseEnd: "06/30/2027",
    monthlyRent: 6000,
    primaryContact: "David Miller",
    email: "operations@logisticssolutions.com",
    phone: "(555) 345-6789"
  }
];

export const ledgersMockData = [
  {
    id: 1,
    propertyId: 1,
    date: "06/01/2023",
    description: "Monthly Rent - Acme Corp",
    unitOrTenant: "Suite 101 - Acme Corporation",
    category: "Rent",
    type: "Income",
    amount: 2400
  },
  {
    id: 2,
    propertyId: 1,
    date: "06/01/2023",
    description: "Monthly Rent - Tech Innovations",
    unitOrTenant: "Suite 103 - Tech Innovations Inc.",
    category: "Rent",
    type: "Income",
    amount: 3000
  },
  {
    id: 3,
    propertyId: 1,
    date: "06/05/2023",
    description: "HVAC Repair",
    unitOrTenant: "Building Common Area",
    category: "Maintenance",
    type: "Expense",
    amount: 850
  },
  {
    id: 4,
    propertyId: 1,
    date: "06/10/2023",
    description: "Property Insurance",
    unitOrTenant: "Entire Property",
    category: "Insurance",
    type: "Expense",
    amount: 1200
  },
  {
    id: 5,
    propertyId: 1,
    date: "06/15/2023",
    description: "Late Fee - Acme Corp",
    unitOrTenant: "Suite 101 - Acme Corporation",
    category: "Fee",
    type: "Income",
    amount: 100
  },
  {
    id: 6,
    propertyId: 2,
    date: "06/01/2023",
    description: "Monthly Rent - Global Retail",
    unitOrTenant: "Store 100 - Global Retail Inc.",
    category: "Rent",
    type: "Income",
    amount: 3500
  },
  {
    id: 7,
    propertyId: 2,
    date: "06/01/2023",
    description: "Monthly Rent - Fashion Boutique",
    unitOrTenant: "Store 101 - Fashion Boutique LLC",
    category: "Rent",
    type: "Income",
    amount: 3200
  },
  {
    id: 8,
    propertyId: 2,
    date: "06/12/2023",
    description: "Cleaning Services",
    unitOrTenant: "Common Areas",
    category: "Maintenance",
    type: "Expense",
    amount: 450
  }
];

export const maintenanceScheduleMockData = [
  {
    id: 1,
    propertyId: 1,
    title: "HVAC System Inspection",
    description: "Regular inspection and maintenance of HVAC systems throughout the building",
    recurrence: "Quarterly",
    nextDueDate: "09/15/2023",
    estimatedCost: 750,
    vendor: "Quality HVAC Services"
  },
  {
    id: 2,
    propertyId: 1,
    title: "Elevator Maintenance",
    description: "Routine maintenance and safety checks for building elevators",
    recurrence: "Monthly",
    nextDueDate: "07/05/2023",
    estimatedCost: 500,
    vendor: "City Elevator Co."
  },
  {
    id: 3,
    propertyId: 1,
    title: "Fire Safety Equipment Check",
    description: "Inspection of fire extinguishers, smoke detectors, and sprinkler systems",
    recurrence: "Yearly",
    nextDueDate: "11/10/2023",
    estimatedCost: 1200,
    vendor: "FireSafe Inspections"
  },
  {
    id: 4,
    propertyId: 2,
    title: "Parking Lot Maintenance",
    description: "Cleaning, line repainting, and pothole repairs in the parking area",
    recurrence: "Yearly",
    nextDueDate: "08/20/2023",
    estimatedCost: 2500,
    vendor: "PaveCo Services"
  },
  {
    id: 5,
    propertyId: 2,
    title: "Common Area Cleaning",
    description: "Deep cleaning of common areas including floors, windows, and bathrooms",
    recurrence: "Weekly",
    nextDueDate: "06/28/2023",
    estimatedCost: 350,
    vendor: "CleanSweep Janitorial"
  },
  {
    id: 6,
    propertyId: 3,
    title: "Roof Inspection",
    description: "Inspection of roof integrity, drainage systems, and repairs as needed",
    recurrence: "Quarterly",
    nextDueDate: "07/15/2023",
    estimatedCost: 900,
    vendor: "TopTier Roofing"
  }
];

export const documentsMockData = [
  {
    id: 1,
    propertyId: 1,
    name: "Lease Agreement - Acme Corp",
    type: "PDF",
    category: "Lease",
    tenant: "Acme Corporation",
    dateUploaded: "01/01/2023",
    size: "1.2 MB"
  },
  {
    id: 2,
    propertyId: 1,
    name: "Insurance Policy 2023",
    type: "PDF",
    category: "Insurance",
    tenant: null,
    dateUploaded: "02/15/2023",
    size: "3.5 MB"
  },
  {
    id: 3,
    propertyId: 1,
    name: "Property Tax Statement",
    type: "PDF",
    category: "Tax",
    tenant: null,
    dateUploaded: "03/10/2023",
    size: "750 KB"
  },
  {
    id: 4,
    propertyId: 2,
    name: "Lease Agreement - Global Retail",
    type: "PDF",
    category: "Lease",
    tenant: "Global Retail Inc.",
    dateUploaded: "03/15/2022",
    size: "1.5 MB"
  },
  {
    id: 5,
    propertyId: 2,
    name: "Renovation Permit",
    type: "PDF",
    category: "Permits",
    tenant: null,
    dateUploaded: "05/20/2023",
    size: "2.1 MB"
  }
];

export const expensesByCategoryMockData = [
  {
    propertyId: 1,
    annualBudget: 25000,
    categories: [
      { name: "Maintenance", amount: 4500, budgetAmount: 5000 },
      { name: "Utilities", amount: 3200, budgetAmount: 3000 },
      { name: "Insurance", amount: 1800, budgetAmount: 2000 },
      { name: "Property Tax", amount: 5500, budgetAmount: 5000 },
      { name: "Management", amount: 2000, budgetAmount: 2500 }
    ],
    monthlyData: [
      {
        month: "January",
        categories: [
          { name: "Maintenance", amount: 320 },
          { name: "Utilities", amount: 280 },
          { name: "Insurance", amount: 150 },
          { name: "Property Tax", amount: 458 },
          { name: "Management", amount: 166 }
        ]
      },
      {
        month: "February",
        categories: [
          { name: "Maintenance", amount: 350 },
          { name: "Utilities", amount: 265 },
          { name: "Insurance", amount: 150 },
          { name: "Property Tax", amount: 458 },
          { name: "Management", amount: 166 }
        ]
      },
      {
        month: "March",
        categories: [
          { name: "Maintenance", amount: 410 },
          { name: "Utilities", amount: 255 },
          { name: "Insurance", amount: 150 },
          { name: "Property Tax", amount: 458 },
          { name: "Management", amount: 166 }
        ]
      },
      {
        month: "April",
        categories: [
          { name: "Maintenance", amount: 380 },
          { name: "Utilities", amount: 240 },
          { name: "Insurance", amount: 150 },
          { name: "Property Tax", amount: 458 },
          { name: "Management", amount: 166 }
        ]
      },
      {
        month: "May",
        categories: [
          { name: "Maintenance", amount: 420 },
          { name: "Utilities", amount: 270 },
          { name: "Insurance", amount: 150 },
          { name: "Property Tax", amount: 458 },
          { name: "Management", amount: 166 }
        ]
      },
      {
        month: "June",
        categories: [
          { name: "Maintenance", amount: 450 },
          { name: "Utilities", amount: 310 },
          { name: "Insurance", amount: 150 },
          { name: "Property Tax", amount: 458 },
          { name: "Management", amount: 166 }
        ]
      },
      {
        month: "July",
        categories: [
          { name: "Maintenance", amount: 470 },
          { name: "Utilities", amount: 320 },
          { name: "Insurance", amount: 150 },
          { name: "Property Tax", amount: 458 },
          { name: "Management", amount: 166 }
        ]
      },
      {
        month: "August",
        categories: [
          { name: "Maintenance", amount: 390 },
          { name: "Utilities", amount: 290 },
          { name: "Insurance", amount: 150 },
          { name: "Property Tax", amount: 458 },
          { name: "Management", amount: 168 }
        ]
      },
      {
        month: "September",
        categories: [
          { name: "Maintenance", amount: 410 },
          { name: "Utilities", amount: 270 },
          { name: "Insurance", amount: 150 },
          { name: "Property Tax", amount: 458 },
          { name: "Management", amount: 168 }
        ]
      },
      {
        month: "October",
        categories: [
          { name: "Maintenance", amount: 430 },
          { name: "Utilities", amount: 260 },
          { name: "Insurance", amount: 150 },
          { name: "Property Tax", amount: 458 },
          { name: "Management", amount: 168 }
        ]
      },
      {
        month: "November",
        categories: [
          { name: "Maintenance", amount: 240 },
          { name: "Utilities", amount: 230 },
          { name: "Insurance", amount: 150 },
          { name: "Property Tax", amount: 458 },
          { name: "Management", amount: 170 }
        ]
      },
      {
        month: "December",
        categories: [
          { name: "Maintenance", amount: 230 },
          { name: "Utilities", amount: 210 },
          { name: "Insurance", amount: 150 },
          { name: "Property Tax", amount: 462 },
          { name: "Management", amount: 164 }
        ]
      }
    ]
  },
  {
    propertyId: 2,
    annualBudget: 30000,
    categories: [
      { name: "Maintenance", amount: 3800, budgetAmount: 4000 },
      { name: "Utilities", amount: 4100, budgetAmount: 4000 },
      { name: "Insurance", amount: 2200, budgetAmount: 2500 },
      { name: "Property Tax", amount: 6300, budgetAmount: 6000 },
      { name: "Management", amount: 2500, budgetAmount: 3000 }
    ],
    monthlyData: [
      {
        month: "January",
        categories: [
          { name: "Maintenance", amount: 310 },
          { name: "Utilities", amount: 350 },
          { name: "Insurance", amount: 183 },
          { name: "Property Tax", amount: 525 },
          { name: "Management", amount: 208 }
        ]
      },
      {
        month: "February",
        categories: [
          { name: "Maintenance", amount: 290 },
          { name: "Utilities", amount: 340 },
          { name: "Insurance", amount: 183 },
          { name: "Property Tax", amount: 525 },
          { name: "Management", amount: 208 }
        ]
      },
      {
        month: "March",
        categories: [
          { name: "Maintenance", amount: 320 },
          { name: "Utilities", amount: 330 },
          { name: "Insurance", amount: 183 },
          { name: "Property Tax", amount: 525 },
          { name: "Management", amount: 208 }
        ]
      },
      {
        month: "April",
        categories: [
          { name: "Maintenance", amount: 340 },
          { name: "Utilities", amount: 320 },
          { name: "Insurance", amount: 183 },
          { name: "Property Tax", amount: 525 },
          { name: "Management", amount: 208 }
        ]
      },
      {
        month: "May",
        categories: [
          { name: "Maintenance", amount: 350 },
          { name: "Utilities", amount: 335 },
          { name: "Insurance", amount: 183 },
          { name: "Property Tax", amount: 525 },
          { name: "Management", amount: 208 }
        ]
      },
      {
        month: "June",
        categories: [
          { name: "Maintenance", amount: 330 },
          { name: "Utilities", amount: 355 },
          { name: "Insurance", amount: 183 },
          { name: "Property Tax", amount: 525 },
          { name: "Management", amount: 208 }
        ]
      },
      {
        month: "July",
        categories: [
          { name: "Maintenance", amount: 320 },
          { name: "Utilities", amount: 370 },
          { name: "Insurance", amount: 184 },
          { name: "Property Tax", amount: 525 },
          { name: "Management", amount: 208 }
        ]
      },
      {
        month: "August",
        categories: [
          { name: "Maintenance", amount: 330 },
          { name: "Utilities", amount: 380 },
          { name: "Insurance", amount: 184 },
          { name: "Property Tax", amount: 525 },
          { name: "Management", amount: 210 }
        ]
      },
      {
        month: "September",
        categories: [
          { name: "Maintenance", amount: 300 },
          { name: "Utilities", amount: 340 },
          { name: "Insurance", amount: 184 },
          { name: "Property Tax", amount: 525 },
          { name: "Management", amount: 210 }
        ]
      },
      {
        month: "October",
        categories: [
          { name: "Maintenance", amount: 290 },
          { name: "Utilities", amount: 330 },
          { name: "Insurance", amount: 184 },
          { name: "Property Tax", amount: 525 },
          { name: "Management", amount: 210 }
        ]
      },
      {
        month: "November",
        categories: [
          { name: "Maintenance", amount: 310 },
          { name: "Utilities", amount: 320 },
          { name: "Insurance", amount: 184 },
          { name: "Property Tax", amount: 525 },
          { name: "Management", amount: 210 }
        ]
      },
      {
        month: "December",
        categories: [
          { name: "Maintenance", amount: 310 },
          { name: "Utilities", amount: 330 },
          { name: "Insurance", amount: 182 },
          { name: "Property Tax", amount: 525 },
          { name: "Management", amount: 212 }
        ]
      }
    ]
  },
  {
    propertyId: 3,
    annualBudget: 35000,
    categories: [
      { name: "Maintenance", amount: 5200, budgetAmount: 6000 },
      { name: "Utilities", amount: 2900, budgetAmount: 3000 },
      { name: "Insurance", amount: 3100, budgetAmount: 3000 },
      { name: "Property Tax", amount: 7500, budgetAmount: 7000 },
      { name: "Management", amount: 3000, budgetAmount: 3500 }
    ],
    monthlyData: [
      {
        month: "January",
        categories: [
          { name: "Maintenance", amount: 450 },
          { name: "Utilities", amount: 240 },
          { name: "Insurance", amount: 258 },
          { name: "Property Tax", amount: 625 },
          { name: "Management", amount: 250 }
        ]
      },
      {
        month: "February",
        categories: [
          { name: "Maintenance", amount: 430 },
          { name: "Utilities", amount: 230 },
          { name: "Insurance", amount: 258 },
          { name: "Property Tax", amount: 625 },
          { name: "Management", amount: 250 }
        ]
      },
      {
        month: "March",
        categories: [
          { name: "Maintenance", amount: 440 },
          { name: "Utilities", amount: 235 },
          { name: "Insurance", amount: 258 },
          { name: "Property Tax", amount: 625 },
          { name: "Management", amount: 250 }
        ]
      },
      {
        month: "April",
        categories: [
          { name: "Maintenance", amount: 460 },
          { name: "Utilities", amount: 240 },
          { name: "Insurance", amount: 258 },
          { name: "Property Tax", amount: 625 },
          { name: "Management", amount: 250 }
        ]
      },
      {
        month: "May",
        categories: [
          { name: "Maintenance", amount: 470 },
          { name: "Utilities", amount: 250 },
          { name: "Insurance", amount: 258 },
          { name: "Property Tax", amount: 625 },
          { name: "Management", amount: 250 }
        ]
      },
      {
        month: "June",
        categories: [
          { name: "Maintenance", amount: 480 },
          { name: "Utilities", amount: 260 },
          { name: "Insurance", amount: 258 },
          { name: "Property Tax", amount: 625 },
          { name: "Management", amount: 250 }
        ]
      },
      {
        month: "July",
        categories: [
          { name: "Maintenance", amount: 490 },
          { name: "Utilities", amount: 270 },
          { name: "Insurance", amount: 258 },
          { name: "Property Tax", amount: 625 },
          { name: "Management", amount: 250 }
        ]
      },
      {
        month: "August",
        categories: [
          { name: "Maintenance", amount: 410 },
          { name: "Utilities", amount: 250 },
          { name: "Insurance", amount: 258 },
          { name: "Property Tax", amount: 625 },
          { name: "Management", amount: 250 }
        ]
      },
      {
        month: "September",
        categories: [
          { name: "Maintenance", amount: 420 },
          { name: "Utilities", amount: 240 },
          { name: "Insurance", amount: 258 },
          { name: "Property Tax", amount: 625 },
          { name: "Management", amount: 250 }
        ]
      },
      {
        month: "October",
        categories: [
          { name: "Maintenance", amount: 400 },
          { name: "Utilities", amount: 230 },
          { name: "Insurance", amount: 262 },
          { name: "Property Tax", amount: 625 },
          { name: "Management", amount: 250 }
        ]
      },
      {
        month: "November",
        categories: [
          { name: "Maintenance", amount: 380 },
          { name: "Utilities", amount: 225 },
          { name: "Insurance", amount: 262 },
          { name: "Property Tax", amount: 625 },
          { name: "Management", amount: 250 }
        ]
      },
      {
        month: "December",
        categories: [
          { name: "Maintenance", amount: 370 },
          { name: "Utilities", amount: 230 },
          { name: "Insurance", amount: 264 },
          { name: "Property Tax", amount: 625 },
          { name: "Management", amount: 250 }
        ]
      }
    ]
  }
];

import { properties } from './mockData';
export { properties };
