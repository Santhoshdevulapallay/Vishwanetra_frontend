import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Upload, 
  Edit, 
  Trash2, 
  Plus, 
  Image,
  Package,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import spectacle1 from "@/assets/spectacle-1.jpg";
import spectacle2 from "@/assets/spectacle-2.jpg";
import spectacle3 from "@/assets/spectacle-3.jpg";

interface SpectacleItem {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  category: string;
  inStock: boolean;
}

const Admin = () => {
  const [spectacles, setSpectacles] = useState<SpectacleItem[]>([
    {
      id: 1,
      name: "Premium Blue Light Glasses",
      brand: "VisionPro",
      price: "$129.99",
      image: spectacle1,
      category: "Computer Glasses",
      inStock: true,
    },
    {
      id: 2,
      name: "Classic Gold Reading Glasses",
      brand: "ElegantFrames",
      price: "$89.99",
      image: spectacle2,
      category: "Reading Glasses",
      inStock: true,
    },
    {
      id: 3,
      name: "Titanium Progressive Lenses",
      brand: "TechVision",
      price: "$299.99",
      image: spectacle3,
      category: "Progressive",
      inStock: false,
    },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    inStock: true,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "File Selected",
        description: `Selected: ${file.name}`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.name || !newItem.brand || !newItem.price || !newItem.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newSpectacle: SpectacleItem = {
      id: Date.now(),
      ...newItem,
      image: selectedFile ? URL.createObjectURL(selectedFile) : spectacle1,
    };

    setSpectacles(prev => [...prev, newSpectacle]);
    
    toast({
      title: "Item Added",
      description: "New spectacle has been added to the catalog",
    });

    // Reset form
    setNewItem({
      name: "",
      brand: "",
      price: "",
      category: "",
      inStock: true,
    });
    setSelectedFile(null);
  };

  const deleteItem = (id: number) => {
    setSpectacles(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item Deleted",
      description: "Spectacle has been removed from the catalog",
    });
  };

  const toggleStock = (id: number) => {
    setSpectacles(prev =>
      prev.map(item =>
        item.id === id ? { ...item, inStock: !item.inStock } : item
      )
    );
    toast({
      title: "Stock Updated",
      description: "Item stock status has been updated",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-4 shadow-elevated">
            <Settings className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage spectacle catalog and system settings</p>
        </div>

        {/* Admin Warning */}
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-amber-600" />
              <div>
                <h3 className="font-semibold text-amber-800">Admin Access Required</h3>
                <p className="text-amber-700 text-sm">
                  This section requires administrator privileges. Make sure you have proper authorization.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Item Form */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Plus className="w-5 h-5 mr-3 text-primary" />
                Add New Spectacle
              </CardTitle>
              <CardDescription>
                Add new items to the spectacle catalog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter product name"
                    className="h-11"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand" className="text-sm font-medium">
                      Brand
                    </Label>
                    <Input
                      id="brand"
                      value={newItem.brand}
                      onChange={(e) => setNewItem(prev => ({ ...prev, brand: e.target.value }))}
                      placeholder="Brand name"
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium">
                      Price
                    </Label>
                    <Input
                      id="price"
                      value={newItem.price}
                      onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="$0.00"
                      className="h-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Category
                  </Label>
                  <Input
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Reading Glasses, Computer Glasses"
                    className="h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="flex items-center text-sm font-medium">
                    <Image className="w-4 h-4 mr-2 text-primary" />
                    Product Image
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="h-11"
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground shadow-medical"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Add to Catalog
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Catalog Management */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Package className="w-5 h-5 mr-3 text-primary" />
                Catalog Management
              </CardTitle>
              <CardDescription>
                Manage existing spectacle inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {spectacles.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.brand}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.price}</TableCell>
                      <TableCell>
                        <Badge
                          variant={item.inStock ? "default" : "destructive"}
                          className="cursor-pointer"
                          onClick={() => toggleStock(item.id)}
                        >
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteItem(item.id)}
                            className="w-8 h-8 p-0 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;