import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X } from "lucide-react";
import { Button } from "./ui/button";

const tips = [
  "💡 1 saved meal = 2.5kg CO₂ reduced 🌿",
  "🚗 You can find food within 5km radius",
  "🌍 Join volunteer events to make bigger impact",
  "📍 Enable location for better food discovery",
  "⏰ Check expiry times before claiming food",
  "🤝 Every donation helps someone in need",
  "♻️ Reducing food waste saves our planet",
  "🎯 Set up regular donation schedules",
];

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="gradient-primary rounded-full w-14 h-14 shadow-2xl hover:scale-110 transition-transform"
        >
          <Bot className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 glass-card z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="gradient-primary p-2 rounded-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Tracyeee Assistant</h3>
                  <p className="text-xs text-muted-foreground">Here to help!</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTip}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-4 bg-muted/50 rounded-lg"
              >
                <p className="text-sm">{tips[currentTip]}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex gap-1">
              {tips.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    idx === currentTip ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Assistant;
