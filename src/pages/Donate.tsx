import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, MapPin, Clock, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addDonation, getDonations } from "@/utils/localStorage";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Assistant from "@/components/Assistant";

const Donate = () => {
  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [expiry, setExpiry] = useState("");
  const { toast } = useToast();
  const donations = getDonations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Random coordinates around Chennai
    const lat = 13.0827 + (Math.random() - 0.5) * 0.1;
    const lng = 80.2707 + (Math.random() - 0.5) * 0.1;
    
    addDonation({
      food,
      quantity: parseInt(quantity),
      location,
      lat,
      lng,
      expiry,
    });

    toast({
      title: "Donation added! 🎉",
      description: `${quantity} ${food} saved locally`,
    });

    // Reset form
    setFood("");
    setQuantity("");
    setLocation("");
    setExpiry("");
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
          <h1 className="text-4xl font-bold mb-2">Donate Food 🍱</h1>
          <p className="text-xl text-muted-foreground">
            Share surplus food and make a difference
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card"
          >
            <h2 className="text-2xl font-semibold mb-6">Create Donation</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="food" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Food Type
                </Label>
                <Input
                  id="food"
                  placeholder="e.g., Rice Meal, Bread, Vegetables"
                  value={food}
                  onChange={(e) => setFood(e.target.value)}
                  required
                  className="glass"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Quantity (servings)
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="5"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="glass"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Pickup Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., T. Nagar, Chennai"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="glass"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiry" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Available Until
                </Label>
                <Input
                  id="expiry"
                  type="datetime-local"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  required
                  className="glass"
                />
              </div>

              <Button type="submit" className="w-full gradient-primary">
                <Upload className="w-4 h-4 mr-2" />
                Save Donation Locally
              </Button>
            </form>
          </motion.div>

          {/* Donation History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card"
          >
            <h2 className="text-2xl font-semibold mb-6">
              Your Donations ({donations.length})
            </h2>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {donations.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No donations yet. Create your first one! 🌱
                </p>
              ) : (
                donations.map((donation) => (
                  <motion.div
                    key={donation.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-muted/30 rounded-xl border border-border"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{donation.food}</h3>
                      {donation.claimed ? (
                        <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full">
                          Claimed ✓
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                          Available
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>📦 Quantity: {donation.quantity} servings</p>
                      <p>📍 Location: {donation.location}</p>
                      <p>⏰ Until: {new Date(donation.expiry).toLocaleString()}</p>
                      <p className="text-xs opacity-70">
                        Added: {new Date(donation.date).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Assistant />
    </div>
  );
};

export default Donate;
