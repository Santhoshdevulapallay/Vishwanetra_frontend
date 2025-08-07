import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Home, 
  FileText, 
  Receipt, 
  Settings, 
  LogOut 
} from "lucide-react";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/dashboard", label: "Home", icon: Home },
    { path: "/prescription", label: "Prescription", icon: FileText },
    { path: "/invoice", label: "Invoice", icon: Receipt },
    { path: "/admin", label: "Admin", icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-medical">
              <Eye className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">VisionVault</h1>
              <p className="text-xs text-muted-foreground">Optical Management</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className={`${
                    isActive 
                      ? "bg-gradient-to-r from-primary to-primary-dark text-primary-foreground shadow-medical" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  } transition-all duration-200`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Logout Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive border-destructive/20 hover:border-destructive"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;