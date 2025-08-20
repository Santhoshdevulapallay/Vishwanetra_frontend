import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Eye, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Prescription = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    date: new Date().toISOString().split('T')[0],
    rightEye: {
      sphere: "",
      cylinder: "",
      axis: "",
    },
    leftEye: {
      sphere: "",
      cylinder: "",
      axis: "",
    },
    pd: "",
    notes: "",
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEyeDataChange = (eye: 'rightEye' | 'leftEye', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [eye]: {
        ...prev[eye],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.age) {
      toast({
        title: "Validation Error",
        description: "Please fill in patient name and age",
        variant: "destructive",
      });
      return;
    }

    // Save to database (mock)
    console.log("Saving prescription:", formData);
    
    toast({
      title: "Prescription Saved",
      description: "Prescription has been successfully saved to the database",
    });

    // Reset form
    setFormData({
      patientName: "",
      age: "",
      date: new Date().toISOString().split('T')[0],
      rightEye: { sphere: "", cylinder: "", axis: "" },
      leftEye: { sphere: "", cylinder: "", axis: "" },
      pd: "",
      notes: "",
    });
  };

  const generatePDF = () => {
    toast({
      title: "PDF Generated",
      description: "Prescription PDF has been generated and is ready for download",
    });
    // PDF generation logic would go here
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Eye Prescription</h1>
        <p className="text-muted-foreground">Create and manage patient eye prescriptions</p>
      </div>

        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Eye className="w-6 h-6 mr-3 text-primary" />
              New Prescription
            </CardTitle>
            <CardDescription>
              Fill out the eye examination details and prescription values
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Patient Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="patientName" className="flex items-center text-sm font-medium">
                    <User className="w-4 h-4 mr-2 text-primary" />
                    Patient Name
                  </Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange("patientName", e.target.value)}
                    placeholder="Enter patient name"
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-medium">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Age"
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
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Eye Measurements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Right Eye */}
                <Card className="shadow-card">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-primary">Right Eye (OD)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Sphere (SPH)</Label>
                        <Input
                          value={formData.rightEye.sphere}
                          onChange={(e) => handleEyeDataChange("rightEye", "sphere", e.target.value)}
                          placeholder="±0.00"
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Cylinder (CYL)</Label>
                        <Input
                          value={formData.rightEye.cylinder}
                          onChange={(e) => handleEyeDataChange("rightEye", "cylinder", e.target.value)}
                          placeholder="±0.00"
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Axis</Label>
                        <Input
                          value={formData.rightEye.axis}
                          onChange={(e) => handleEyeDataChange("rightEye", "axis", e.target.value)}
                          placeholder="0-180°"
                          className="h-10"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Left Eye */}
                <Card className="shadow-card">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-primary">Left Eye (OS)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Sphere (SPH)</Label>
                        <Input
                          value={formData.leftEye.sphere}
                          onChange={(e) => handleEyeDataChange("leftEye", "sphere", e.target.value)}
                          placeholder="±0.00"
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Cylinder (CYL)</Label>
                        <Input
                          value={formData.leftEye.cylinder}
                          onChange={(e) => handleEyeDataChange("leftEye", "cylinder", e.target.value)}
                          placeholder="±0.00"
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Axis</Label>
                        <Input
                          value={formData.leftEye.axis}
                          onChange={(e) => handleEyeDataChange("leftEye", "axis", e.target.value)}
                          placeholder="0-180°"
                          className="h-10"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pd" className="text-sm font-medium">
                    Pupillary Distance (PD)
                  </Label>
                  <Input
                    id="pd"
                    value={formData.pd}
                    onChange={(e) => handleInputChange("pd", e.target.value)}
                    placeholder="62mm"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Any additional notes or observations..."
                    className="min-h-[44px]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground shadow-medical"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Save Prescription
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={generatePDF}
                  className="flex-1 h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Generate PDF
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
    </div>
  );
};

export default Prescription;