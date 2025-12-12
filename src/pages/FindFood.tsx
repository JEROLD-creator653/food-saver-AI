import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { getDonations, claimDonation } from "@/utils/localStorage";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Assistant from "@/components/Assistant";

const FindFood = () => {
  const [radius, setRadius] = useState([5]);
  const donations = getDonations().filter(d => !d.claimed);
  const { toast } = useToast();

  const handleClaim = (id: string, food: string) => {
    claimDonation(id);
    toast({
      title: "Food claimed! 🍽️",
      description: `You claimed ${food}. Contact the donor to arrange pickup.`,
    });
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-7xl mx-auto p-4">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold mb-2">Find Food 🗺️</h1>
          <p className="text-xl text-muted-foreground">
            Discover available donations nearby
          </p>
        </motion.div>

        {/* Search Radius Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Search Radius</h3>
              <p className="text-sm text-muted-foreground">
                Find food within {radius[0]} km
              </p>
            </div>
            <span className="text-2xl font-bold text-primary">{radius[0]} km</span>
          </div>
          <Slider
            value={radius}
            onValueChange={setRadius}
            min={1}
            max={10}
            step={1}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 km</span>
            <span>10 km</span>
          </div>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card mb-6 h-[400px] flex items-center justify-center gradient-primary"
        >
          <div className="text-center text-white">
            <Navigation className="w-16 h-16 mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold mb-2">Interactive Map View</h3>
            <p className="text-white/80">
              Map showing {donations.length} available donations in your area
            </p>
            <p className="text-sm text-white/60 mt-2">
              📍 Chennai, Tamil Nadu
            </p>
          </div>
        </motion.div>

        {/* Available Donations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.length === 0 ? (
            <div className="col-span-full glass-card text-center py-12">
              <p className="text-muted-foreground text-lg">
                No donations available nearby. 
                <br />
                Check back later! 🌱
              </p>
            </div>
          ) : (
            donations.map((donation, idx) => (
              <motion.div
                key={donation.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card"
              >
                <div className="mb-4">
                  <h3 className="font-semibold text-xl mb-2">{donation.food}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {donation.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-secondary" />
                      Until: {new Date(donation.expiry).toLocaleTimeString()}
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      📦 {donation.quantity} servings
                    </p>
                  </div>
                </div>
                
                <Button
                  className="w-full gradient-primary"
                  onClick={() => handleClaim(donation.id, donation.food)}
                >
                  Claim This Food
                </Button>
                
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Available since {new Date(donation.date).toLocaleDateString()}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <Assistant />
    </div>
  );
};

export default FindFood;
