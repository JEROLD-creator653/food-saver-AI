import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getVolunteers, toggleVolunteerJoin } from "@/utils/localStorage";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Assistant from "@/components/Assistant";
import { useState } from "react";

const Volunteer = () => {
  const [volunteers, setVolunteers] = useState(getVolunteers());
  const { toast } = useToast();

  const handleToggleJoin = (id: string, eventName: string, joined: boolean) => {
    toggleVolunteerJoin(id);
    setVolunteers(getVolunteers());
    
    toast({
      title: joined ? "Event joined! 🎉" : "Event left",
      description: joined 
        ? `You're now volunteering for "${eventName}"`
        : `You've left "${eventName}"`,
    });
  };

  const joinedEvents = volunteers.filter(v => v.joined);

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
          <h1 className="text-4xl font-bold mb-2">Volunteer Zone 🙋</h1>
          <p className="text-xl text-muted-foreground">
            Join community events and make bigger impact
          </p>
        </motion.div>

        {/* Joined Events Summary */}
        {joinedEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card mb-6 gradient-primary"
          >
            <div className="flex items-center gap-3 text-white">
              <Users className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-semibold">
                  You're volunteering for {joinedEvents.length} event{joinedEvents.length !== 1 ? 's' : ''}!
                </h3>
                <p className="text-white/80">
                  Thank you for making a difference 🌍
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Events Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {volunteers.map((event) => (
            <motion.div
              key={event.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
              className={`glass-card ${event.joined ? 'ring-2 ring-primary' : ''}`}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{event.event}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {event.description}
                </p>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
              </div>

              <Button
                className={`w-full ${
                  event.joined 
                    ? 'gradient-primary' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
                onClick={() => handleToggleJoin(event.id, event.event, !event.joined)}
              >
                {event.joined ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Joined
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4 mr-2" />
                    Join Event
                  </>
                )}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card mt-8"
        >
          <h3 className="text-xl font-semibold mb-4">
            Why Volunteer? 🌟
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-primary mb-2">Make Impact</h4>
              <p className="text-muted-foreground">
                Help distribute food to hundreds of families in need
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-secondary mb-2">Build Community</h4>
              <p className="text-muted-foreground">
                Connect with like-minded people who care about food security
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gradient mb-2">Learn & Grow</h4>
              <p className="text-muted-foreground">
                Gain experience in community service and social impact
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Assistant />
    </div>
  );
};

export default Volunteer;
