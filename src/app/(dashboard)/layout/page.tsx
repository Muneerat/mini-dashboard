import { useEffect, useState } from "react";
import { Users, DollarSign, TrendingDown, CreditCard } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { DashboardChart } from "@/components/DashboardChart";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  fetchDashboardMetrics,
  fetchChartData,
  DashboardMetrics,
  ChartDataPoint,
} from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [metricsData, chartDataResult] = await Promise.all([
          fetchDashboardMetrics(),
          fetchChartData(),
        ]);
        setMetrics(metricsData);
        setChartData(chartDataResult);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your business overview.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[120px]" />
            ))
          ) : (
            <>
              <MetricCard
                title="Monthly Users"
                value={metrics?.monthlyUsers.toLocaleString() || "0"}
                icon={Users}
                trend={{ value: 12.5, isPositive: true }}
              />
              <MetricCard
                title="Revenue"
                value={`$${metrics?.revenue.toLocaleString() || "0"}`}
                icon={DollarSign}
                trend={{ value: 8.2, isPositive: true }}
              />
              <MetricCard
                title="Churn Rate"
                value={`${metrics?.churn || 0}%`}
                icon={TrendingDown}
                trend={{ value: 0.5, isPositive: false }}
              />
              <MetricCard
                title="Active Subscriptions"
                value={metrics?.activeSubscriptions.toLocaleString() || "0"}
                icon={CreditCard}
                trend={{ value: 5.3, isPositive: true }}
              />
            </>
          )}
        </div>

        <DashboardChart data={chartData} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
}
