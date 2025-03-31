
export interface PropertyType {
  id: number;
  name: string;
  address: string;
  type: string;
  units: number;
  value: number;
  occupied: number;
  vacant: boolean;
  imageUrl: string;
}

export interface TenantType {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  rent: number;
  leaseType: 'Gross' | 'NNN'; // Add lease type
  realEstateTax?: number; // For NNN lease
  commonAreaMaintenance?: number; // For NNN lease
  insurance?: number; // For NNN lease
}

export interface MaintenanceRequestType {
  id: number;
  title: string;
  description: string;
  property: string;
  unit: string;
  date: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
}

export interface DocumentType {
  id: number;
  name: string;
  type: string;
  category: string;
  property?: string;
  tenant?: string;
  dateUploaded: string;
  size: string;
}
