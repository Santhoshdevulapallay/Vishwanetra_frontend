import { useState } from "react";
import { format, subMonths } from "date-fns";
import { CalendarIcon, Upload, Search, Download } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface PatientRecord {
  id: string;
  patientName: string;
  contactNo: string;
  lenses: string;
  fileName: string;
  fileUrl: string;
  amount: number;
  advanceAmount: number;
  paymentMode: string;
  createdAt: Date;
}

// Mock data for demonstration
const mockRecords: PatientRecord[] = [
  {
    id: "1",
    patientName: "Raj Kumar",
    contactNo: "9876543210",
    lenses: "Progressive Lenses",
    fileName: "prescription_1.jpg",
    fileUrl: "/placeholder.svg",
    amount: 2500,
    advanceAmount: 1000,
    paymentMode: "PhonePe",
    createdAt: new Date(2024, 7, 15),
  },
  {
    id: "2", 
    patientName: "Priya Sharma",
    contactNo: "8765432109",
    lenses: "Anti-Glare Lenses",
    fileName: "lenses_order.png",
    fileUrl: "/placeholder.svg",
    amount: 3200,
    advanceAmount: 1500,
    paymentMode: "GPay",
    createdAt: new Date(2024, 7, 20),
  },
  {
    id: "3",
    patientName: "Amit Singh",
    contactNo: "7654321098",
    lenses: "Blue Light Filter",
    fileName: "eye_test.jpg",
    fileUrl: "/placeholder.svg", 
    amount: 1800,
    advanceAmount: 800,
    paymentMode: "Cash",
    createdAt: new Date(2024, 8, 5),
  },
];

// Form validation schema
const formSchema = z.object({
  patientName: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  contactNo: z.string()
    .regex(/^\d{10}$/, "Contact number must be exactly 10 digits"),
  lenses: z.string()
    .max(50, "Lenses description must not exceed 50 characters")
    .optional(),
  amount: z.number()
    .min(0.01, "Amount must be greater than 0"),
  advanceAmount: z.number()
    .min(0, "Advance amount must be 0 or greater")
    .optional(),
  paymentMode: z.enum(["PhonePe", "GPay", "Cash"]),
}).refine((data) => {
  if (data.advanceAmount && data.advanceAmount > data.amount) {
    return false;
  }
  return true;
}, {
  message: "Advance amount cannot be greater than total amount",
  path: ["advanceAmount"],
});

type FormData = z.infer<typeof formSchema>;

export default function PatientRecords() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      contactNo: "",
      lenses: "",
      amount: 0,
      advanceAmount: 0,
      paymentMode: undefined,
    },
  });
  
  // Date range for records
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });
  
  const [searchTerm, setSearchTerm] = useState("");

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
      
      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size must be less than 2MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!selectedFile) {
      toast({
        title: "Missing file",
        description: "Please upload a file",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form data:', data);
      console.log('File:', selectedFile);
      
      toast({
        title: "Record saved successfully",
        description: `Patient record for ${data.patientName} has been saved.`,
      });
      
      // Reset form
      form.reset();
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
      record.contactNo.includes(searchTerm) ||
      record.paymentMode.toLowerCase().includes(searchTerm.toLowerCase());
    
    return isInDateRange && matchesSearch;
  });

  // Calculate total amounts
  const totalAmount = filteredRecords.reduce((sum, record) => sum + record.amount, 0);
  const totalAdvanceAmount = filteredRecords.reduce((sum, record) => sum + record.advanceAmount, 0);

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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="patientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name of Patient *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter patient name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter 10-digit contact number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="lenses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lenses</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter lens type (e.g., Progressive, Anti-glare)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Upload File (.jpg, .png only) *</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="file-upload"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                      />
                      {selectedFile && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Upload className="w-4 h-4" />
                          {selectedFile.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount (₹) *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="Enter total amount"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="advanceAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Advance Amount (₹)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="Enter advance amount"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="paymentMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Mode *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PhonePe">PhonePe</SelectItem>
                            <SelectItem value="GPay">GPay</SelectItem>
                            <SelectItem value="Cash">Cash</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? "Saving..." : "Save Record"}
                  </Button>
                </form>
              </Form>
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
                      placeholder="Search by name, contact, or payment mode..."
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
                      <TableHead>Lenses</TableHead>
                      <TableHead>Uploaded File</TableHead>
                      <TableHead className="text-right">Amount (₹)</TableHead>
                      <TableHead className="text-right">Advance (₹)</TableHead>
                      <TableHead>Payment Mode</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-muted-foreground">
                          No records found for the selected criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.patientName}</TableCell>
                          <TableCell>{record.contactNo}</TableCell>
                          <TableCell>{record.lenses}</TableCell>
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
                          <TableCell className="text-right">₹{record.advanceAmount.toLocaleString('en-IN')}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {record.paymentMode}
                            </span>
                          </TableCell>
                          <TableCell>{format(record.createdAt, "dd/MM/yyyy")}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Total Amounts */}
              {filteredRecords.length > 0 && (
                <div className="flex justify-end gap-4">
                  <Card className="w-fit">
                    <CardContent className="pt-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString('en-IN')}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="w-fit">
                    <CardContent className="pt-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total Advance Amount</p>
                        <p className="text-2xl font-bold text-secondary">₹{totalAdvanceAmount.toLocaleString('en-IN')}</p>
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