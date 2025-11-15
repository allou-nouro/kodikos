
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
export default function CadreValue({kpi}){
    return (
        <Card  className="animate-fade-in border-2 hover:shadow-lg transition-smooth hover:border-[#8371F9]/20" style={{  borderRadius: '24px', cursor: 'pointer' }}>
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
    )
}