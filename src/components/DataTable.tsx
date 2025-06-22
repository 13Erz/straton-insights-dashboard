
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, FileSpreadsheet } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DataTableProps {
  title: string;
  columns: TableColumn[];
  data: any[];
}

interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'currency' | 'date';
}

export function DataTable({ title, columns, data }: DataTableProps) {
  const formatValue = (value: any, type?: string) => {
    if (value === null || value === undefined) return '-';
    
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('fr-FR', { 
          style: 'currency', 
          currency: 'EUR' 
        }).format(value);
      case 'number':
        return new Intl.NumberFormat('fr-FR').format(value);
      case 'date':
        return new Date(value).toLocaleDateString('fr-FR');
      default:
        return value;
    }
  };

  const handleExportExcel = () => {
    toast({
      title: "Export Excel",
      description: "Le fichier Excel est en cours de génération...",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Export PDF",
      description: "Le fichier PDF est en cours de génération...",
    });
  };

  return (
    <div className="space-y-4">
      <Card className="straton-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-heading">{title}</CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportExcel}
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Excel
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportPDF}
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <FileDown className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {columns.map((column) => (
                    <TableHead key={column.key} className="font-medium">
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell 
                      colSpan={columns.length} 
                      className="text-center text-muted-foreground py-8"
                    >
                      Aucune donnée à afficher
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((row, index) => (
                    <TableRow key={index} className="hover:bg-muted/30">
                      {columns.map((column) => (
                        <TableCell key={column.key}>
                          {formatValue(row[column.key], column.type)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {data.length > 0 && (
            <div className="mt-4 text-sm text-muted-foreground">
              {data.length} enregistrement{data.length > 1 ? 's' : ''} trouvé{data.length > 1 ? 's' : ''}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
