"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DashboardLayout } from "@/components/dashboardLayout";
import { ProtectedRoute } from "@/components/protectedRoute";
import {
  fetchDashboardMetrics,
  fetchChartData,
  fetchSubscriptionData,
  DashboardMetrics,
  ChartDataPoint,
  SubscriptionDataPoint,
} from "@/lib/api";

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
  const [subscriptionData, setSubscriptionData] = useState<
    SubscriptionDataPoint[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

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
          <h1 className="text-3xl font-bold">Analytics</h1>

          <div className="grid gap-5 mt-14">
            <DashboardChart data={chartData} isLoading={isLoading} />
            <SubscriptionChart data={subscriptionData} isLoading={isLoading} />
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
