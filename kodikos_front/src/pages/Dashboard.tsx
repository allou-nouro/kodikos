import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, ShoppingCart, Eye, Flame, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
const Dashboard = () => {
  const kpiData = [
    { title: "Today's Visitors", value: "2,847", change: "+12.5%", icon: Users, trend: "up" },
    { title: "Top Products", value: "234", change: "+8.2%", icon: TrendingUp, trend: "up" },
    { title: "Conversion Rate", value: "3.2%", change: "+0.5%", icon: ShoppingCart, trend: "up" },
    { title: "Page Views", value: "12.4K", change: "+18.7%", icon: Eye, trend: "up" },
  ];

  const topProducts = [
    { name: "Smartphone Cases", views: 1240, category: "Electronics" },
    { name: "Winter Jackets", views: 1120, category: "Fashion" },
    { name: "Kitchen Tools", views: 980, category: "Home" },
    { name: "Sports Shoes", views: 890, category: "Sports" },
    { name: "Backpacks", views: 760, category: "Accessories" },
  ];

  const recommendations = [
    { product: "LED Smart Bulbs", reason: "High demand this week", badge: "Trending" },
    { product: "Wool Scarves", reason: "Seasonal peak coming", badge: "Seasonal" },
    { product: "Phone Chargers", reason: "Always popular", badge: "Hot" },
    { product: "Water Bottles", reason: "Summer approaching", badge: "Seasonal" },
  ];

  const unifiedColor = "#8371F9"; // اللون الموحد للواجهة

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h4 className="text-4xl md:text-5xl font-bold mb-3">Welcome back, User!</h4>
          <p className="text-lg text-muted-foreground">Here's a summary of your inventory</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="animate-fade-in border-2 hover:shadow-lg transition-smooth hover:border-[#8371F9]/20" style={{ animationDelay: `${index * 50}ms`, borderRadius: '24px', cursor: 'pointer' }}>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-black">{kpi.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{kpi.value}</div>
                <p className="text-sm flex items-center gap-2">
                  <TrendingUp className={`h-4 w-4 ${kpi.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                  <span className={kpi.trend === "up" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                    {kpi.change}
                  </span>
                  <span className="text-muted-foreground">from last week</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Most Viewed Products */}
          <Card className="flex-1 animate-fade-in">
            <CardHeader>
              <CardTitle>Most Viewed Products</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Revenue, sales, clicks, and conversions over the last year</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={topProducts} margin={{ top: 20, right: 20, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }} 
                  />
                  <Bar dataKey="views" radius={[100, 100, 0, 0]} fill={unifiedColor} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="lg:w-1/2 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors shadow-sm"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{rec.product}</h4>
                        <Badge variant="default">{rec.badge}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.reason}</p>
                    </div>
                    <Flame className="h-5 w-5 text-primary ml-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
