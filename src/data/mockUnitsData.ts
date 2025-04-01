
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
    occupied: true,
    tenantId: 1
  },
  {
    id: 2,
    propertyId: 1,
    unitNumber: "102",
    size: 2200,
    occupied: true,
    tenantId: 2
  },
  {
    id: 3,
    propertyId: 1,
    unitNumber: "103",
    size: 2300,
    occupied: false,
    tenantId: null
  },
  {
    id: 4,
    propertyId: 2,
    unitNumber: "A",
    size: 3600,
    occupied: true,
    tenantId: 3
  },
  {
    id: 5,
    propertyId: 2,
    unitNumber: "B",
    size: 3200,
    occupied: true,
    tenantId: 4
  },
  {
    id: 6,
    propertyId: 3,
    unitNumber: "201",
    size: 3000,
    occupied: true,
    tenantId: 5
  },
  {
    id: 7,
    propertyId: 3,
    unitNumber: "202",
    size: 2800,
    occupied: false,
    tenantId: null
  }
];
