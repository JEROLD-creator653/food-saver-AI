import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadData, saveData, setUser } from "@/utils/localStorage";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const data = loadData();
    if (data.user) {
      navigate("/");
    }
  }, [navigate]);

  const handleDemoLogin = () => {
    const demoUser = {
      name: "Surgeon",
      email: "demo@foodsaver.ai",
      password: "demo123",
    };
    setUser(demoUser);
    toast({
      title: "Welcome back! 👋",
      description: "Demo login successful",
    });
    navigate("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = loadData();
    
    if (isLogin) {
      // Login logic
      if (data.user && data.user.email === email && data.user.password === password) {
        setUser(data.user);
        toast({
          title: `Welcome back, ${data.user.name}! 👋`,
          description: "Let's save food today!",
        });
        navigate("/");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Try demo login!",
          variant: "destructive",
        });
      }
    } else {
      // Register logic
      const newUser = { name, email, password };
      setUser(newUser);
      toast({
        title: `Welcome, ${name}! 🎉`,
        description: "Account created successfully",
      });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="glass-card">
          <div className="text-center mb-8">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="gradient-primary p-3 rounded-2xl animate-float">
                <Leaf className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              FoodSaver.AI
            </h1>
            <p className="text-muted-foreground">
              Max Pro Edition — Save Food. Serve Humanity. 🌱
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="glass"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="glass"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="glass"
              />
            </div>

            <Button type="submit" className="w-full gradient-primary">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full glass"
              onClick={handleDemoLogin}
            >
              🚀 Demo Login (Instant Access)
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            Built by Surgeon & Tracyeee
            <br />
            HYPERNOVA Hackathon 2025 🌍
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
