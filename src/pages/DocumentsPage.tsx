
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { documents } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  Plus, 
  Search, 
  Eye, 
  FileArchive, 
  FileSpreadsheet, 
  FileImage,
  X
} from 'lucide-react';

const DocumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (doc.property && doc.property.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doc.tenant && doc.tenant.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'docx':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'xlsx':
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
      case 'zip':
        return <FileArchive className="h-5 w-5 text-amber-500" />;
      case 'jpg':
      case 'png':
        return <FileImage className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Lease':
        return 'bg-blue-100 text-blue-800';
      case 'Financial':
        return 'bg-green-100 text-green-800';
      case 'Insurance':
        return 'bg-purple-100 text-purple-800';
      case 'Contract':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Leases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documents.filter(doc => doc.category === 'Lease').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Financial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documents.filter(doc => doc.category === 'Financial').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.85 MB</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search documents..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Lease">Lease</SelectItem>
              <SelectItem value="Insurance">Insurance</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Financial">Financial</SelectItem>
              <SelectItem value="Application">Application</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Date Uploaded</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center">
                        {getDocumentIcon(doc.type)}
                        <span className="ml-2 font-medium">{doc.name}</span>
                        <Badge variant="outline" className="ml-2">{doc.type}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(doc.category)}>
                        {doc.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{doc.property || '-'}</TableCell>
                    <TableCell>{doc.dateUploaded}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" title="View">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" title="Download">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" title="Delete">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    No documents found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
