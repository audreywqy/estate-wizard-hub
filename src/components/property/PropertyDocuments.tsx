
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { documentsMockData } from '@/data/mockUnitsData';

interface PropertyDocumentsProps {
  propertyId: number;
}

const PropertyDocuments: React.FC<PropertyDocumentsProps> = ({ propertyId }) => {
  const documents = documentsMockData.filter(doc => doc.propertyId === propertyId);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Lease':
        return 'bg-blue-100 text-blue-800';
      case 'Insurance':
        return 'bg-green-100 text-green-800';
      case 'Tax':
        return 'bg-red-100 text-red-800';
      case 'Permits':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Property Documents</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>
      
      {documents.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Related To</TableHead>
                <TableHead>Date Uploaded</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">{document.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(document.category)}>
                      {document.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{document.tenant || 'Property Wide'}</TableCell>
                  <TableCell>{document.dateUploaded}</TableCell>
                  <TableCell>{document.size}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No documents found for this property.</p>
          <Button className="mt-4" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Upload First Document
          </Button>
        </div>
      )}
    </div>
  );
};

export default PropertyDocuments;
