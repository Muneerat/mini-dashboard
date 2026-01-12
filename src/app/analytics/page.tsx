"use client";
import { useEffect, useState } from "react";
import { Users, DollarSign, TrendingDown, CreditCard } from "lucide-react";
import { MetricCard } from "@/components/metriesCard";
import { DashboardChart } from "@/components/dashboardChart";
import { DashboardLayout } from "@/components/dashboardLayout";
import { ProtectedRoute } from "@/components/protectedRoute";
import {
  fetchDashboardMetrics,
  fetchChartData,
  DashboardMetrics,
  ChartDataPoint,
  SubscriptionData,
  fetchSubscriptionData,
  SubscriptionDataPoint,
} from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { SubscriptionChart } from "@/components/dashboardChartSub";

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
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
        </div>

        <div className="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-5 mt-14">
          <DashboardChart data={chartData} isLoading={isLoading} />
          <SubscriptionChart data={subscriptionData} isLoading={isLoading} />
        </div>
      </div>
    </DashboardLayout>
  );
}
