
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

export const { properties } = require('./mockData');
