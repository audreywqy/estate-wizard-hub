
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { tenants } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building, Receipt, FileText, Calendar, Mail, Phone } from 'lucide-react';
import TenantLedger from '@/components/tenant/TenantLedger';

const TenantDetailsPage = () => {
  const { id } = useParams();
  const tenantId = parseInt(id || '0');
  
  const tenant = tenants.find(t => t.id === tenantId);
  
  if (!tenant) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Tenant Not Found</h2>
          <p className="mb-6">The tenant you're looking for doesn't exist or has been removed.</p>
          <Link to="/tenants">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tenants
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Calculate total payment for NNN lease
  const totalNnnPayment = tenant.leaseType === 'NNN' ? 
    tenant.rent + (tenant.realEstateTax || 0) + (tenant.commonAreaMaintenance || 0) + (tenant.insurance || 0) : 
    tenant.rent;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link to="/tenants">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{tenant.name}</h1>
          <Badge variant={tenant.leaseType === "Gross" ? "outline" : "secondary"} className="ml-2">
            {tenant.leaseType} Lease
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Property & Unit</CardTitle>
              <CardDescription>Location information</CardDescription>
            </CardHeader>
            <CardContent className="flex items-start">
              <Building className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
              <div>
                <div className="font-medium">{tenant.property}</div>
                <div className="text-sm text-muted-foreground">{tenant.unit}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Lease Term</CardTitle>
              <CardDescription>Contract duration</CardDescription>
            </CardHeader>
            <CardContent className="flex items-start">
              <Calendar className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
              <div>
                <div className="font-medium">{tenant.leaseStart} to {tenant.leaseEnd}</div>
                <div className="text-sm text-muted-foreground">
                  {tenant.leaseType} Lease
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Base Rent</CardTitle>
              <CardDescription>Monthly payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${tenant.rent.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Monthly Payment</CardTitle>
              <CardDescription>All fees included</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalNnnPayment.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </CardContent>
          </Card>
        </div>

        {tenant.leaseType === 'NNN' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Real Estate Tax</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">${tenant.realEstateTax?.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Common Area Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">${tenant.commonAreaMaintenance?.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Insurance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">${tenant.insurance?.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <Button variant="outline" size="sm">Edit Contact</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center">
            <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">{tenant.email}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Phone</div>
              <div className="font-medium">{tenant.phone}</div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="ledger" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full max-w-md">
            <TabsTrigger value="ledger" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" /> Ledger
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Documents
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Schedule
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ledger" className="py-4">
            <TenantLedger tenantId={tenantId} />
          </TabsContent>
          <TabsContent value="documents" className="py-4">
            <div className="text-center py-12 text-muted-foreground">
              <p>Tenant documents will be displayed here.</p>
              <Button className="mt-4" variant="outline">Upload Document</Button>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="py-4">
            <div className="text-center py-12 text-muted-foreground">
              <p>Tenant schedule and important dates will be displayed here.</p>
              <Button className="mt-4" variant="outline">Add Schedule Item</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TenantDetailsPage;
