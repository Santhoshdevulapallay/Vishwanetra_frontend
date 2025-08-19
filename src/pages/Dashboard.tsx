import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  TrendingUp, 
  Package,
  Calendar
} from "lucide-react";
import heroSpectacles from "@/assets/hero-spectacles.jpg";

const Dashboard = () => {

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

      </div>
    </div>
  );
};

export default Dashboard;