import { NavLink, useNavigate } from "react-router-dom";
import { Home, Upload, MapPin, Users, BarChart3, LogOut, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import { setUser } from "@/utils/localStorage";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/donate", icon: Upload, label: "Donate" },
    { to: "/find", icon: MapPin, label: "Find Food" },
    { to: "/volunteer", icon: Users, label: "Volunteer" },
    { to: "/impact", icon: BarChart3, label: "Impact" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-card sticky top-4 z-50 mx-4 mb-6"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="gradient-primary p-2 rounded-xl">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient">FoodSaver.AI</span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={isActive ? "gradient-primary" : ""}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              )}
            </NavLink>
          ))}
        </div>

        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-around p-2 border-t border-border">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end>
            {({ isActive }) => (
              <Button
                variant="ghost"
                size="sm"
                className={isActive ? "text-primary" : ""}
              >
                <item.icon className="w-5 h-5" />
              </Button>
            )}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
