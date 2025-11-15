import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingDown, AlertCircle, Sparkles ,Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddProductModal } from "@/components/AddProductModal";
import { useNavigate } from "react-router-dom";
interface StockItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  avgDailySales: number;
  price: number;
  supplier: string;
}

const Stock = () => {
  const navigate=useNavigate()
  const { toast } = useToast();
  const [stockItems] = useState<StockItem[]>([
    {
      id: "1",
      name: "Smartphone Cases",
      category: "Electronics",
      currentStock: 45,
      minStock: 100,
      avgDailySales: 12,
      price: 1200,
      supplier: "Tech Supply DZ",
    },
    {
      id: "2",
      name: "Winter Jackets",
      category: "Fashion",
      currentStock: 23,
      minStock: 50,
      avgDailySales: 8,
      price: 8500,
      supplier: "Fashion Import",
    },
    {
      id: "3",
      name: "Kitchen Tools Set",
      category: "Home",
      currentStock: 67,
      minStock: 80,
      avgDailySales: 5,
      price: 3200,
      supplier: "Home Essentials",
    },
    {
      id: "4",
      name: "Sports Shoes",
      category: "Sports",
      currentStock: 15,
      minStock: 60,
      avgDailySales: 10,
      price: 12000,
      supplier: "Sports Direct DZ",
    },
    {
      id: "5",
      name: "Backpacks",
      category: "Accessories",
      currentStock: 89,
      minStock: 70,
      avgDailySales: 6,
      price: 4500,
      supplier: "Accessories Plus",
    },
  ]);

  const getStockStatus = (current: number, min: number) => {
    const percentage = (current / min) * 100;
    if (percentage < 50) return { label: "Critical", color: "destructive" as const };
    if (percentage < 80) return { label: "Low", color: "default" as const };
    return { label: "Good", color: "secondary" as const };
  };

  const handleAutoOrder = (item: StockItem) => {
    const daysUntilEmpty = Math.floor(item.currentStock / item.avgDailySales);
    const recommendedOrder = Math.max(item.minStock - item.currentStock, item.avgDailySales * 14);
    
    toast({
      title: "🤖 AI Order Analysis",
      description: `${item.name}: Stock will last ${daysUntilEmpty} days. Recommending order of ${recommendedOrder} units from ${item.supplier}. Total: ${(recommendedOrder * item.price).toLocaleString()} DZD`,
      duration: 6000,
    });
  };

  const handleBulkAutoOrder = () => {
    const lowStockItems = stockItems.filter(
      (item) => item.currentStock < item.minStock
    );

    if (lowStockItems.length === 0) {
      toast({
        title: "✅ All Stock Levels Good",
        description: "No items need restocking at this time.",
      });
      return;
    }

    const totalOrders = lowStockItems.length;
    const totalCost = lowStockItems.reduce((sum, item) => {
      const orderQty = Math.max(item.minStock - item.currentStock, item.avgDailySales * 14);
      return sum + orderQty * item.price;
    }, 0);

    toast({
      title: "🤖 AI Bulk Order Ready",
      description: `${totalOrders} items need restocking. Estimated total: ${totalCost.toLocaleString()} DZD. Orders will be sent to suppliers.`,
      duration: 8000,
    });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Stock Management</h1>
            <p className="text-lg text-muted-foreground"  >
              AI-powered inventory tracking and automatic ordering
            </p>
          </div>
          <div>
              <Button onClick={()=>{navigate('/products/add')}} size="lg" variant="gradient" className="gap-2 shadow-lg" style={{
                        background:'#8371F9',
                        borderRadius:'24px',
                        marginRight:'30px'
                      }} >
            <Plus className="h-5 w-5"  style={{
              fontWeight:'600'
            }} />
            Add Product
          </Button>
          <Button onClick={handleBulkAutoOrder} size="lg" variant="gradient" className="gap-2 shadow-lg" style={{
                        background:'#8371F9',
                        borderRadius:'24px'
                      }} >
            <Sparkles className="h-5 w-5"  />
            Auto-Order All Low Stock
          </Button>
          </div>

        </div>


        {/* Stock Items */}
        <div className="space-y-6">
          {stockItems.map((item) => {
            const status = getStockStatus(item.currentStock, item.minStock);
            const daysUntilEmpty = Math.floor(item.currentStock / item.avgDailySales);

            return (
              <Card key={item.id} className="animate-fade-in hover:shadow-lg transition-smooth border-2 hover:border-primary/20"
              style={{
                borderRadius:'40px'
              }}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <Badge variant={status.color}>{status.label}</Badge>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Current Stock</p>
                          <p className="font-semibold text-lg">{item.currentStock}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Min Required</p>
                          <p className="font-semibold">{item.minStock}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg Daily Sales</p>
                          <p className="font-semibold">{item.avgDailySales}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Days Left</p>
                          <p className="font-semibold">{daysUntilEmpty} days</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Supplier: {item.supplier} • Price: {item.price.toLocaleString()}{" "}
                        DZD/unit
                      </p>
                    </div>

                    <Button
                    style={{
                        background:'#8371F9',
                        borderRadius:'24px'
                      }} 
                      onClick={() => handleAutoOrder(item)}
                      variant={item.currentStock < item.minStock ? "default" : "outline"}
                      className="gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      AI Auto Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stock;
