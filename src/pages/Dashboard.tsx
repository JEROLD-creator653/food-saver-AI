import { motion } from "framer-motion";
import { Upload, MapPin, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUser, getStats } from "@/utils/localStorage";
import Navbar from "@/components/Navbar";
import Assistant from "@/components/Assistant";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getUser();
  const stats = getStats();

  const cards = [
    {
      title: "Donate Food",
      description: "Share surplus food with those in need",
      icon: Upload,
      color: "from-emerald-500 to-teal-500",
      path: "/donate",
    },
    {
      title: "Find Food",
      description: "Discover available donations nearby",
      icon: MapPin,
      color: "from-sky-500 to-blue-500",
      path: "/find",
    },
    {
      title: "Volunteer",
      description: "Join community food drives",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      path: "/volunteer",
    },
    {
      title: "Impact",
      description: "View your contribution stats",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      path: "/impact",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-7xl mx-auto p-4">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {user?.name || "Guest"} 👋
          </h1>
          <p className="text-xl text-muted-foreground">
            Let's save food today!
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={item} className="glass-card">
            <p className="text-sm text-muted-foreground mb-1">Total Donations</p>
            <p className="text-3xl font-bold text-primary">{stats.totalDonations}</p>
          </motion.div>
          <motion.div variants={item} className="glass-card">
            <p className="text-sm text-muted-foreground mb-1">Meals Saved</p>
            <p className="text-3xl font-bold text-secondary">{stats.mealsSaved}</p>
          </motion.div>
          <motion.div variants={item} className="glass-card">
            <p className="text-sm text-muted-foreground mb-1">CO₂ Reduced</p>
            <p className="text-3xl font-bold text-gradient">{stats.co2Reduced}kg</p>
          </motion.div>
          <motion.div variants={item} className="glass-card">
            <p className="text-sm text-muted-foreground mb-1">Volunteering</p>
            <p className="text-3xl font-bold text-gradient">{stats.activeVolunteers} events</p>
          </motion.div>
        </motion.div>

        {/* Main Action Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-6"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(card.path)}
              className="glass-card cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${card.color}`}>
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-gradient transition-all">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Assistant />
    </div>
  );
};

export default Dashboard;
