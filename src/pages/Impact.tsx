import { motion } from "framer-motion";
import CountUp from "react-countup";
import { TrendingUp, Users, Leaf, Package, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStats, loadData } from "@/utils/localStorage";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Assistant from "@/components/Assistant";

const Impact = () => {
  const stats = getStats();
  const { toast } = useToast();

  const handleExport = () => {
    const data = loadData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "foodsaver-data.json";
    link.click();
    
    toast({
      title: "Data exported! 📦",
      description: "Your FoodSaver data has been downloaded",
    });
  };

  const impactCards = [
    {
      title: "Meals Saved",
      value: stats.mealsSaved,
      icon: Package,
      color: "from-emerald-500 to-teal-500",
      suffix: "",
    },
    {
      title: "CO₂ Reduced",
      value: stats.co2Reduced,
      icon: Leaf,
      color: "from-green-500 to-emerald-500",
      suffix: "kg",
    },
    {
      title: "Total Donations",
      value: stats.totalDonations,
      icon: TrendingUp,
      color: "from-sky-500 to-blue-500",
      suffix: "",
    },
    {
      title: "Volunteer Events",
      value: stats.activeVolunteers,
      icon: Users,
      color: "from-purple-500 to-pink-500",
      suffix: "",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
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
          <h1 className="text-4xl font-bold mb-2">Impact Dashboard 📊</h1>
          <p className="text-xl text-muted-foreground">
            Your contribution to saving food and our planet
          </p>
        </motion.div>

        {/* Hero Impact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card gradient-primary mb-8 text-white"
        >
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <h2 className="text-5xl font-bold mb-4">
                <CountUp end={stats.mealsSaved} duration={2} /> Meals 🌍
              </h2>
            </motion.div>
            <p className="text-xl text-white/90">
              Together we've saved {stats.mealsSaved} meals and prevented{" "}
              <span className="font-bold">{stats.co2Reduced}kg CO₂</span> emissions!
            </p>
            <p className="mt-4 text-white/80">
              Every meal saved makes a difference. Thank you! 🙏
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {impactCards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="glass-card"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.color} mb-4`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{card.title}</p>
              <p className="text-4xl font-bold text-gradient">
                <CountUp end={card.value} duration={2.5} />
                {card.suffix}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card"
          >
            <h3 className="text-xl font-semibold mb-4">Environmental Impact</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">🌱 CO₂ Emissions Prevented</span>
                <span className="font-bold text-primary">{stats.co2Reduced}kg</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">💧 Water Saved (est.)</span>
                <span className="font-bold text-secondary">
                  {Math.round(stats.mealsSaved * 50)}L
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">🗑️ Waste Reduced</span>
                <span className="font-bold text-gradient">
                  {Math.round(stats.mealsSaved * 0.4)}kg
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card"
          >
            <h3 className="text-xl font-semibold mb-4">Social Impact</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">🍽️ People Fed (est.)</span>
                <span className="font-bold text-primary">{stats.mealsSaved}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">🤝 Community Events</span>
                <span className="font-bold text-secondary">
                  {stats.activeVolunteers}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">📈 Total Contributions</span>
                <span className="font-bold text-gradient">
                  {stats.totalDonations}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Export Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Export Your Data</h3>
              <p className="text-sm text-muted-foreground">
                Download all your FoodSaver data as JSON
              </p>
            </div>
            <Button onClick={handleExport} className="gradient-primary">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </motion.div>
      </div>

      <Assistant />
    </div>
  );
};

export default Impact;
