"use client";
import { useEffect, useState } from "react";
import { Users, DollarSign, TrendingDown, CreditCard } from "lucide-react";
import { MetricCard } from "@/components/metriesCard";
import { DashboardLayout } from "@/components/dashboardLayout";
import { ProtectedRoute } from "@/components/protectedRoute";
import {
  fetchDashboardMetrics,
  fetchChartData,
  DashboardMetrics,
  ChartDataPoint,
  fetchSubscriptionData,
  SubscriptionDataPoint,
} from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const DashboardChart = dynamic(
  () => import("@/components/dashboardChart").then((m) => m.DashboardChart),
  {
    loading: () => <div className="h-64 bg-muted animate-pulse rounded-lg" />,
    ssr: false,
  }
);

const SubscriptionChart = dynamic(
  () =>
    import("@/components/dashboardChartSub").then((m) => m.SubscriptionChart),
  {
    loading: () => <div className="h-64 bg-muted animate-pulse rounded-lg" />,
    ssr: false,
  }
);

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState<
    SubscriptionDataPoint[]
  >([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [metricsData, chartDataResult, subscriptionDataResult] =
          await Promise.all([
            fetchDashboardMetrics(),
            fetchChartData(),
            fetchSubscriptionData(),
          ]);
        setMetrics(metricsData);
        setChartData(chartDataResult);
        setSubscriptionData(subscriptionDataResult);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Here's your business overview.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-30" />
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
          <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 mt-14">
            <DashboardChart data={chartData} isLoading={isLoading} />
            <SubscriptionChart data={subscriptionData} isLoading={isLoading} />
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
