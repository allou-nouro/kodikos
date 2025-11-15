import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, BarChart, Users, ArrowRight, CheckCircle2, Sparkles, Target, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import { AppContext } from "@/context/userContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  
  const {token}=useContext(AppContext)
  const navigate=useNavigate()
  useEffect(()=>{
    if (token ===''){
      navigate('/login')
    }
  },[token])

  const features = [
    {
      icon: Sparkles,
      title: "AI Recommendations",
      description: "Personalized product suggestions powered by local purchasing behavior and market trends.",
    },
    {
      icon: BarChart,
      title: "Market Analytics",
      description: "Real-time trends, top-selling products, and Algerian market insights at your fingertips.",
    },
    {
      icon: Users,
      title: "Customer Behavior Insights",
      description: "Seasonal predictions, demand analysis, and intelligent purchase patterns.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Connect Your Store",
      description: "Simple integration with your e-commerce platform in minutes.",
    },
    {
      number: "02",
      title: "AI Analyzes Data",
      description: "Our AI engine processes products and local market data continuously.",
    },
    {
      number: "03",
      title: "Get Insights",
      description: "Receive actionable recommendations and market insights instantly.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container relative mx-auto px-4 py-24 md:py-36">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                  🚀 AI-Powered Analytics
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                AI that understands{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Algerian customers
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                A smart analytics and recommendation engine that helps e-commerce businesses boost sales and understand local market trends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/contact">
                  <Button size="lg" variant="gradient" className="w-full sm:w-auto text-base px-8">
                    Get Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-slide-up">
              <div className="relative">
                <div className="absolute -inset-4 gradient-primary opacity-20 blur-3xl rounded-3xl"></div>
                <img
                  src={heroImage}
                  alt="AI Analytics Dashboard"
                  className="relative rounded-3xl shadow-2xl w-full border border-border/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for Growth
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to understand and serve Algerian customers better
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group p-8 hover:shadow-xl transition-smooth hover:-translate-y-2 animate-fade-in border-2 hover:border-primary/20 gradient-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="rounded-2xl bg-primary/10 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-smooth">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with AI-powered insights in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative text-center animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow shadow-glow mb-6">
                  <span className="text-3xl font-bold text-primary-foreground">
                    {step.number}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                )}
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Beautiful, Intuitive Dashboard
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access all your analytics and insights in one powerful interface
            </p>
          </div>

          <div className="animate-slide-up">
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute -inset-6 gradient-primary opacity-20 blur-3xl rounded-3xl"></div>
              <img
                src={dashboardPreview}
                alt="Dashboard Preview"
                className="relative rounded-3xl shadow-2xl w-full border-2 border-border/50"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { icon: TrendingUp, text: "Real-time Analytics" },
              { icon: Target, text: "Smart Targeting" },
              { icon: Zap, text: "Lightning Fast" },
              { icon: CheckCircle2, text: "Easy to Use" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border-2 border-border/50 hover:border-primary/30 transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <item.icon className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto gradient-card border-2 border-primary/20 shadow-xl overflow-hidden">
            <div className="absolute inset-0 gradient-primary opacity-5"></div>
            <div className="relative p-12 md:p-16 text-center animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to power your store with AI?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join leading Algerian e-commerce businesses using AI to boost their sales
              </p>
              <Link to="/contact">
                <Button size="lg" variant="gradient" className="text-lg px-10">
                  Request Partnership
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
