import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Zap, Users } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "Empowering Algerian e-commerce businesses with AI-powered insights to compete globally while understanding local markets.",
    },
    {
      icon: Heart,
      title: "Why Local Matters",
      description: "Generic analytics don't capture Algerian shopping behaviors, seasonal patterns, and cultural preferences. We built AI specifically for the local market.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We combine cutting-edge AI technology with deep understanding of the Algerian market to deliver actionable insights.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "We're committed to helping local businesses thrive by providing enterprise-level analytics accessible to businesses of all sizes.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent via-background to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About AI Analytics DZ</h1>
            <p className="text-lg text-muted-foreground mb-8">
              We're on a mission to help Algerian e-commerce businesses grow with AI-powered analytics and recommendations that truly understand the local market.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="animate-fade-in">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    AI Analytics DZ was born from a simple observation: while global e-commerce analytics tools are powerful, they don't truly understand the Algerian market. Local shopping behaviors, seasonal patterns, cultural preferences, and economic factors require specialized analysis.
                  </p>
                  <p>
                    We built an AI system trained specifically on Algerian market data, capable of understanding local trends, predicting seasonal demands, and providing recommendations that actually work for businesses operating in Algeria.
                  </p>
                  <p>
                    Today, we're proud to help businesses of all sizes make data-driven decisions that boost their sales and better serve Algerian customers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Drives Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values and commitment to the Algerian e-commerce ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="animate-fade-in hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <value.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Team</h2>
            <p className="text-lg text-muted-foreground mb-12">
              A passionate group of AI engineers, data scientists, and e-commerce experts dedicated to revolutionizing online retail in Algeria.
            </p>
            
            <Card className="p-8 md:p-12">
              <CardContent>
                <p className="text-muted-foreground">
                  We're a startup team with deep expertise in artificial intelligence, machine learning, and the Algerian e-commerce landscape. Our diverse backgrounds in technology and local business give us a unique perspective on solving real challenges faced by Algerian online retailers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Local AI Matters Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Local-Market AI Matters
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Global analytics platforms miss crucial local insights. Our AI understands:
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                "Algerian shopping patterns and payment preferences",
                "Regional demand variations across wilayas",
                "Cultural events and seasonal buying behaviors",
                "Local economic factors affecting purchasing",
                "Language preferences and communication styles",
                "Mobile-first shopping trends in Algeria",
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary-foreground text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="opacity-90">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
