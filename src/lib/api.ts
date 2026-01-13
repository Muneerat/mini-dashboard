

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

export interface SubscriptionDataPoint {
  month: string;
  activeSubscriptions: number;
  newSubscriptions?: number;
  canceledSubscriptions?: number;
}

export const SubscriptionData: SubscriptionDataPoint[] = [
  {
    month: "Jan",
    activeSubscriptions: 1200,
    newSubscriptions: 150,
    canceledSubscriptions: 30,
  },
  {
    month: "Feb",
    activeSubscriptions: 1320,
    newSubscriptions: 180,
    canceledSubscriptions: 60,
  },
  {
    month: "Mar",
    activeSubscriptions: 1440,
    newSubscriptions: 200,
    canceledSubscriptions: 80,
  },
  {
    month: "Apr",
    activeSubscriptions: 1560,
    newSubscriptions: 220,
    canceledSubscriptions: 100,
  },
  {
    month: "May",
    activeSubscriptions: 1680,
    newSubscriptions: 250,
    canceledSubscriptions: 130,
  },
  {
    month: "Jun",
    activeSubscriptions: 1800,
    newSubscriptions: 280,
    canceledSubscriptions: 160,
  },
  {
    month: "Jul",
    activeSubscriptions: 1920,
    newSubscriptions: 300,
    canceledSubscriptions: 180,
  },
  {
    month: "Aug",
    activeSubscriptions: 2040,
    newSubscriptions: 320,
    canceledSubscriptions: 200,
  },
  {
    month: "Sep",
    activeSubscriptions: 2160,
    newSubscriptions: 350,
    canceledSubscriptions: 230,
  },
  {
    month: "Oct",
    activeSubscriptions: 2280,
    newSubscriptions: 380,
    canceledSubscriptions: 260,
  },
  {
    month: "Nov",
    activeSubscriptions: 2400,
    newSubscriptions: 400,
    canceledSubscriptions: 280,
  },
  {
    month: "Dec",
    activeSubscriptions: 2520,
    newSubscriptions: 420,
    canceledSubscriptions: 300,
  },
];


export async function fetchSubscriptionData(): Promise<
  SubscriptionDataPoint[]
> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SubscriptionData);
    }, 1000);
  });
}
