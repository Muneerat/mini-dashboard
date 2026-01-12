// Mock API service for dashboard data

export interface DashboardMetrics {
  monthlyUsers: number;
  revenue: number;
  churn: number;
  activeSubscriptions: number;
}

export interface ChartDataPoint {
  month: string;
  users: number;
  revenue: number;
}

// Simulates an API call with delay
export const fetchDashboardMetrics = (): Promise<DashboardMetrics> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        monthlyUsers: 12847,
        revenue: 48250,
        churn: 2.4,
        activeSubscriptions: 892,
      });
    }, 800);
  });
};

export const fetchChartData = (): Promise<ChartDataPoint[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { month: "Jul", users: 8200, revenue: 32000 },
        { month: "Aug", users: 9100, revenue: 36500 },
        { month: "Sep", users: 9800, revenue: 39200 },
        { month: "Oct", users: 10600, revenue: 42100 },
        { month: "Nov", users: 11400, revenue: 45000 },
        { month: "Dec", users: 12847, revenue: 48250 },
      ]);
    }, 600);
  });
};
