import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Receipt, Download, Plus, Search, Calendar, User, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Invoice {
  id: string;
  patientName: string;
  date: string;
  items: string[];
  total: number;
  status: "paid" | "pending" | "overdue";
}

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    patientName: "",
    selectedSpectacles: "",
    price: "",
    date: new Date().toISOString().split('T')[0],
  });

  const [invoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      patientName: "John Smith",
      date: "2024-01-15",
      items: ["Premium Blue Light Glasses"],
      total: 129.99,
      status: "paid",
    },
    {
      id: "INV-002",
      patientName: "Sarah Johnson",
      date: "2024-01-14",
      items: ["Classic Gold Reading Glasses", "Lens Cleaning Kit"],
      total: 109.99,
      status: "pending",
    },
    {
      id: "INV-003",
      patientName: "Mike Davis",
      date: "2024-01-13",
      items: ["Titanium Progressive Lenses"],
      total: 299.99,
      status: "overdue",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const generateInvoiceNumber = () => {
    const timestamp = Date.now();
    return `INV-${timestamp.toString().slice(-6)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!invoiceData.patientName || !invoiceData.selectedSpectacles || !invoiceData.price) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const invoiceNumber = generateInvoiceNumber();
    
    // Save to database (mock)
    console.log("Creating invoice:", {
      ...invoiceData,
      invoiceNumber,
    });
    
    toast({
      title: "Invoice Created",
      description: `Invoice ${invoiceNumber} has been created successfully`,
    });

    // Reset form
    setInvoiceData({
      patientName: "",
      selectedSpectacles: "",
      price: "",
      date: new Date().toISOString().split('T')[0],
    });
  };

  const downloadInvoice = (invoiceId: string) => {
    toast({
      title: "Downloading Invoice",
      description: `Invoice ${invoiceId} is being prepared for download`,
    });
    // PDF download logic would go here
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-4 shadow-elevated">
            <Receipt className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Invoice Management</h1>
          <p className="text-muted-foreground">Create and manage patient invoices</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Invoice Form */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Plus className="w-5 h-5 mr-3 text-primary" />
                Create New Invoice
              </CardTitle>
              <CardDescription>
                Generate invoices for patient purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="patientName" className="flex items-center text-sm font-medium">
                    <User className="w-4 h-4 mr-2 text-primary" />
                    Patient Name
                  </Label>
                  <Input
                    id="patientName"
                    value={invoiceData.patientName}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, patientName: e.target.value }))}
                    placeholder="Enter patient name"
                    className="h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spectacles" className="text-sm font-medium">
                    Selected Spectacles
                  </Label>
                  <Input
                    id="spectacles"
                    value={invoiceData.selectedSpectacles}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, selectedSpectacles: e.target.value }))}
                    placeholder="Spectacle model and details"
                    className="h-11"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="flex items-center text-sm font-medium">
                      <DollarSign className="w-4 h-4 mr-2 text-primary" />
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={invoiceData.price}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center text-sm font-medium">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={invoiceData.date}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, date: e.target.value }))}
                      className="h-11"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground shadow-medical"
                >
                  <Receipt className="w-5 h-5 mr-2" />
                  Create Invoice
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Invoice History */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Search className="w-5 h-5 mr-3 text-primary" />
                Invoice History
              </CardTitle>
              <CardDescription>
                View and manage existing invoices
              </CardDescription>
              <div className="pt-4">
                <Input
                  placeholder="Search by patient name or invoice ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.patientName}</TableCell>
                        <TableCell>${invoice.total}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadInvoice(invoice.id)}
                            className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Invoice;