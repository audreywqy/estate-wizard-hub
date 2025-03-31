
import { PropertyType, TenantType, MaintenanceRequestType, DocumentType } from '@/types';

export const properties: PropertyType[] = [
  {
    id: 1,
    name: "Skyline Office Tower",
    address: "123 Business Ave, New York, NY",
    type: "Office",
    units: 24,
    value: 4500000,
    occupied: 20,
    vacant: false,
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 2,
    name: "Riverside Retail Center",
    address: "456 Commerce St, Chicago, IL",
    type: "Retail",
    units: 12,
    value: 3200000,
    occupied: 10,
    vacant: false,
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 3,
    name: "Metro Industrial Park",
    address: "789 Factory Rd, Dallas, TX",
    type: "Industrial",
    units: 8,
    value: 5800000,
    occupied: 5,
    vacant: false,
    imageUrl: "https://images.unsplash.com/photo-1525438160292-a4a860951216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 4,
    name: "Harbor View Complex",
    address: "321 Waterfront Dr, San Francisco, CA",
    type: "Mixed Use",
    units: 32,
    value: 7200000,
    occupied: 28,
    vacant: false,
    imageUrl: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 5,
    name: "Tech Hub Building",
    address: "555 Innovation Way, Seattle, WA",
    type: "Office",
    units: 18,
    value: 4100000,
    occupied: 18,
    vacant: true,
    imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 6,
    name: "Central Plaza",
    address: "777 Market St, Boston, MA",
    type: "Retail",
    units: 15,
    value: 3800000,
    occupied: 12,
    vacant: false,
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
  }
];

export const tenants: TenantType[] = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "contact@acmecorp.com",
    phone: "(555) 123-4567",
    property: "Skyline Office Tower",
    unit: "Suite 1200",
    leaseStart: "01/01/2023",
    leaseEnd: "12/31/2025",
    rent: 5800,
    leaseType: "NNN",
    realEstateTax: 950,
    commonAreaMaintenance: 750,
    insurance: 350
  },
  {
    id: 2,
    name: "Global Retail Inc.",
    email: "leasing@globalretail.com",
    phone: "(555) 234-5678",
    property: "Riverside Retail Center",
    unit: "Unit 105",
    leaseStart: "03/15/2022",
    leaseEnd: "03/14/2027",
    rent: 4200,
    leaseType: "Gross"
  },
  {
    id: 3,
    name: "Logistics Solutions LLC",
    email: "operations@logisticssolutions.com",
    phone: "(555) 345-6789",
    property: "Metro Industrial Park",
    unit: "Warehouse 3",
    leaseStart: "07/01/2022",
    leaseEnd: "06/30/2027",
    rent: 7500,
    leaseType: "NNN",
    realEstateTax: 1200,
    commonAreaMaintenance: 950,
    insurance: 500
  },
  {
    id: 4,
    name: "Urban Café",
    email: "manager@urbancafe.com",
    phone: "(555) 456-7890",
    property: "Harbor View Complex",
    unit: "Unit 101",
    leaseStart: "09/01/2022",
    leaseEnd: "08/31/2024",
    rent: 3200,
    leaseType: "Gross"
  },
  {
    id: 5,
    name: "TechStart Inc.",
    email: "office@techstart.com",
    phone: "(555) 567-8901",
    property: "Tech Hub Building",
    unit: "Suite 500",
    leaseStart: "05/15/2023",
    leaseEnd: "05/14/2026",
    rent: 6100,
    leaseType: "NNN",
    realEstateTax: 1050,
    commonAreaMaintenance: 825,
    insurance: 475
  }
];

export const maintenanceRequests: MaintenanceRequestType[] = [
  {
    id: 1,
    title: "HVAC System Malfunction",
    description: "The air conditioning is not working properly in the northeast section of floor 5.",
    property: "Skyline Office Tower",
    unit: "Suite 1200",
    date: "06/15/2023",
    status: "In Progress",
    priority: "High"
  },
  {
    id: 2,
    title: "Plumbing Issue",
    description: "There is a leak in the bathroom sink that needs to be fixed.",
    property: "Riverside Retail Center",
    unit: "Unit 105",
    date: "06/10/2023",
    status: "Completed",
    priority: "Medium"
  },
  {
    id: 3,
    title: "Broken Window",
    description: "The window in the conference room has a crack and needs to be replaced.",
    property: "Tech Hub Building",
    unit: "Suite 500",
    date: "06/18/2023",
    status: "Pending",
    priority: "Low"
  },
  {
    id: 4,
    title: "Lighting Fixtures",
    description: "Several light fixtures are not working in the main warehouse area.",
    property: "Metro Industrial Park",
    unit: "Warehouse 3",
    date: "06/05/2023",
    status: "In Progress",
    priority: "Medium"
  },
  {
    id: 5,
    title: "Entry Door Issue",
    description: "The electronic lock on the main entry door is malfunctioning.",
    property: "Harbor View Complex",
    unit: "Unit 101",
    date: "06/20/2023",
    status: "Pending",
    priority: "High"
  }
];

export const documents: DocumentType[] = [
  {
    id: 1,
    name: "Lease Agreement - Acme Corp",
    type: "PDF",
    category: "Lease",
    property: "Skyline Office Tower",
    tenant: "Acme Corporation",
    dateUploaded: "01/05/2023",
    size: "2.4 MB"
  },
  {
    id: 2,
    name: "Property Insurance Policy",
    type: "PDF",
    category: "Insurance",
    property: "All Properties",
    dateUploaded: "02/15/2023",
    size: "1.8 MB"
  },
  {
    id: 3,
    name: "Maintenance Contract",
    type: "DOCX",
    category: "Contract",
    property: "Metro Industrial Park",
    dateUploaded: "03/10/2023",
    size: "950 KB"
  },
  {
    id: 4,
    name: "Property Tax Assessment",
    type: "PDF",
    category: "Financial",
    property: "Riverside Retail Center",
    dateUploaded: "04/22/2023",
    size: "1.2 MB"
  },
  {
    id: 5,
    name: "Tenant Application - Global Retail",
    type: "PDF",
    category: "Application",
    property: "Riverside Retail Center",
    tenant: "Global Retail Inc.",
    dateUploaded: "03/01/2022",
    size: "1.5 MB"
  }
];

export const vendors = [
  {
    id: 1,
    name: "Premium Plumbing Services",
    serviceType: "Plumbing",
    phone: "(555) 123-4567",
    email: "contact@premiumplumbing.com",
    address: "123 Main St, Anytown, USA",
    propertyIds: [1, 3, 5],
    lastService: "2023-05-15"
  },
  {
    id: 2,
    name: "Elite Electrical Contractors",
    serviceType: "Electrical",
    phone: "(555) 234-5678",
    email: "info@eliteelectrical.com",
    address: "456 Oak Lane, Somewhere, USA",
    propertyIds: [1, 2, 4],
    lastService: "2023-06-22"
  },
  {
    id: 3,
    name: "Top-Tier HVAC",
    serviceType: "HVAC",
    phone: "(555) 345-6789",
    email: "service@toptierhvac.com",
    address: "789 Pine Ave, Elsewhere, USA",
    propertyIds: [2, 3, 5],
    lastService: "2023-07-10"
  },
  {
    id: 4,
    name: "Reliable Roofing Co",
    serviceType: "Roofing",
    phone: "(555) 456-7890",
    email: "repairs@reliableroofing.com",
    address: "101 Cedar Rd, Nowhere, USA",
    propertyIds: [1, 4],
    lastService: "2023-04-05"
  },
  {
    id: 5,
    name: "SafeGuard Security Systems",
    serviceType: "Security",
    phone: "(555) 567-8901",
    email: "info@safeguardsecurity.com",
    address: "202 Maple Dr, Anywhere, USA",
    propertyIds: [1, 2, 3],
    lastService: "2023-08-18"
  },
  {
    id: 6,
    name: "Clean & Clear Window Washing",
    serviceType: "Windows",
    phone: "(555) 678-9012",
    email: "schedule@cleanandclear.com",
    address: "303 Elm Blvd, Someplace, USA",
    propertyIds: [3, 5],
    lastService: "2023-09-02"
  },
  {
    id: 7,
    name: "GreenScape Landscaping",
    serviceType: "Landscaping",
    phone: "(555) 789-0123",
    email: "service@greenscapelandscaping.com",
    address: "404 Birch St, Othertown, USA",
    propertyIds: [1, 2, 4, 5],
    lastService: "2023-10-12"
  },
  {
    id: 8,
    name: "FastFix Maintenance",
    serviceType: "General Maintenance",
    phone: "(555) 890-1234",
    email: "repairs@fastfixmaintenance.com",
    address: "505 Willow Ln, Somewhere, USA",
    propertyIds: [1, 3],
    lastService: "2023-11-20"
  }
];
