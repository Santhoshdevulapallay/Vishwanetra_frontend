import { useState } from "react";
import { format, subMonths } from "date-fns";
import { CalendarIcon, Upload, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface PatientRecord {
  id: string;
  patientName: string;
  contactNo: string;
  fileName: string;
  fileUrl: string;
  amount: number;
  createdAt: Date;
}

// Mock data for demonstration
const mockRecords: PatientRecord[] = [
  {
    id: "1",
    patientName: "Raj Kumar",
    contactNo: "9876543210",
    fileName: "prescription_1.jpg",
    fileUrl: "/placeholder.svg",
    amount: 2500,
    createdAt: new Date(2024, 7, 15),
  },
  {
    id: "2", 
    patientName: "Priya Sharma",
    contactNo: "8765432109",
    fileName: "lenses_order.png",
    fileUrl: "/placeholder.svg",
    amount: 3200,
    createdAt: new Date(2024, 7, 20),
  },
  {
    id: "3",
    patientName: "Amit Singh",
    contactNo: "7654321098",
    fileName: "eye_test.jpg",
    fileUrl: "/placeholder.svg", 
    amount: 1800,
    createdAt: new Date(2024, 8, 5),
  },
];

export default function PatientRecords() {
  const [formData, setFormData] = useState({
    patientName: "",
    contactNo: "",
    amount: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Date range for records
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
        toast({
          title: "Invalid file type",
          description: "Please upload only .jpg or .png files",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.contactNo || !formData.amount || !selectedFile) {
      toast({
        title: "Missing fields",
        description: "Please fill all fields and upload a file",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Record saved successfully",
        description: `Patient record for ${formData.patientName} has been saved.`,
      });
      
      // Reset form
      setFormData({
        patientName: "",
        contactNo: "",
        amount: "",
      });
      setSelectedFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save patient record. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter records based on date range and search term
  const filteredRecords = mockRecords.filter(record => {
    const recordDate = record.createdAt;
    const isInDateRange = recordDate >= dateRange.from && recordDate <= dateRange.to;
    const matchesSearch = searchTerm === "" || 
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.contactNo.includes(searchTerm);
    
    return isInDateRange && matchesSearch;
  });

  // Calculate total amount
  const totalAmount = filteredRecords.reduce((sum, record) => sum + record.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Patient Records</h1>
        <p className="text-muted-foreground">Manage patient information and view records</p>
      </div>

      <Tabs defaultValue="form" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Add New Record</TabsTrigger>
          <TabsTrigger value="records">View Records</TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>New Patient Record</CardTitle>
              <CardDescription>
                Enter patient details and upload prescription or lens information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Name of Patient</Label>
                    <Input
                      id="patientName"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      placeholder="Enter patient name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactNo">Contact Number</Label>
                    <Input
                      id="contactNo"
                      name="contactNo"
                      type="tel"
                      value={formData.contactNo}
                      onChange={handleInputChange}
                      placeholder="Enter 10-digit contact number"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-upload">Upload File (.jpg, .png only)</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                      required
                    />
                    {selectedFile && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Upload className="w-4 h-4" />
                        {selectedFile.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter amount in rupees"
                    required
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                  {isSubmitting ? "Saving..." : "Save Record"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Records</CardTitle>
              <CardDescription>
                View and search patient records within selected date range
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date Range and Search */}
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? format(dateRange.from, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => date && setDateRange(prev => ({ ...prev, from: date }))}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange.to && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? format(dateRange.to, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => date && setDateRange(prev => ({ ...prev, to: date }))}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="w-full md:w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search by name or contact..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Records Table */}
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Contact No</TableHead>
                      <TableHead>Uploaded File</TableHead>
                      <TableHead className="text-right">Amount (₹)</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          No records found for the selected criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.patientName}</TableCell>
                          <TableCell>{record.contactNo}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
                                  <Download className="w-4 h-4 mr-1" />
                                  {record.fileName}
                                </a>
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">₹{record.amount.toLocaleString('en-IN')}</TableCell>
                          <TableCell>{format(record.createdAt, "dd/MM/yyyy")}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Total Amount */}
              {filteredRecords.length > 0 && (
                <div className="flex justify-end">
                  <Card className="w-fit">
                    <CardContent className="pt-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString('en-IN')}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}