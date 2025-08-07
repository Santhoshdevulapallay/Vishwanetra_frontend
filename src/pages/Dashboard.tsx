import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Star, 
  Users, 
  TrendingUp, 
  Package,
  Calendar
} from "lucide-react";
import heroSpectacles from "@/assets/hero-spectacles.jpg";
import spectacle1 from "@/assets/spectacle-1.jpg";
import spectacle2 from "@/assets/spectacle-2.jpg";
import spectacle3 from "@/assets/spectacle-3.jpg";

const Dashboard = () => {
  const spectacles = [
    {
      id: 1,
      name: "Premium Blue Light Glasses",
      brand: "VisionPro",
      price: "₹10,399",
      image: spectacle1,
      rating: 4.8,
      category: "Computer Glasses",
      inStock: true,
    },
    {
      id: 2,
      name: "Classic Gold Reading Glasses",
      brand: "ElegantFrames",
      price: "₹7,199",
      image: spectacle2,
      rating: 4.6,
      category: "Reading Glasses",
      inStock: true,
    },
    {
      id: 3,
      name: "Titanium Progressive Lenses",
      brand: "TechVision",
      price: "₹24,099",
      image: spectacle3,
      rating: 4.9,
      category: "Progressive",
      inStock: false,
    },
  ];

  const stats = [
    {
      title: "Total Patients",
      value: "2,547",
      change: "+12.5%",
      icon: Users,
      color: "text-medical-blue",
    },
    {
      title: "Monthly Revenue",
      value: "₹38,25,680",
      change: "+8.2%",
      icon: TrendingUp,
      color: "text-medical-success",
    },
    {
      title: "Inventory Items",
      value: "1,234",
      change: "-2.1%",
      icon: Package,
      color: "text-medical-warning",
    },
    {
      title: "Appointments Today",
      value: "18",
      change: "+5.4%",
      icon: Calendar,
      color: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-light/10" />
        <img
          src={heroSpectacles}
          alt="Spectacles Collection"
          className="w-full h-64 object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Vishwa Netra
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional optical management system for modern eye care practices
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className={`text-sm ${stat.color} font-medium`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Spectacles Catalog */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center">
              <Package className="w-6 h-6 mr-3 text-primary" />
              Available Spectacles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spectacles.map((spectacle) => (
                <Card key={spectacle.id} className="overflow-hidden shadow-card hover:shadow-elevated transition-all duration-200 group">
                  <div className="relative">
                    <img
                      src={spectacle.image}
                      alt={spectacle.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge
                      variant={spectacle.inStock ? "default" : "destructive"}
                      className="absolute top-2 right-2"
                    >
                      {spectacle.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs">
                        {spectacle.category}
                      </Badge>
                      <h3 className="font-semibold text-lg text-foreground">
                        {spectacle.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {spectacle.brand}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-muted-foreground ml-1">
                            {spectacle.rating}
                          </span>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          {spectacle.price}
                        </span>
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground shadow-medical"
                        disabled={!spectacle.inStock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {spectacle.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;