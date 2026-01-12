"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubscriptionDataPoint {
  month: string;
  activeSubscriptions: number;
  newSubscriptions?: number;
  canceledSubscriptions?: number;
}

interface SubscriptionChartProps {
  data: SubscriptionDataPoint[];
  isLoading?: boolean;
}

export function SubscriptionChart({ data, isLoading }: SubscriptionChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">
            Loading chart...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="colorSubscriptions"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(142 76% 36%)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(142 76% 36%)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorCanceled" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(0 84% 60%)"
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor="hsl(0 84% 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="month"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="activeSubscriptions"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorSubscriptions)"
              strokeWidth={2}
              name="Active Subscriptions"
            />
            {/* Optional: Show new subscriptions */}
            {data.some((d) => d.newSubscriptions !== undefined) && (
              <Area
                type="monotone"
                dataKey="newSubscriptions"
                stroke="hsl(142 76% 36%)"
                fillOpacity={1}
                fill="url(#colorNew)"
                strokeWidth={2}
                name="New Subscriptions"
              />
            )}
            {/* Optional: Show canceled subscriptions */}
            {data.some((d) => d.canceledSubscriptions !== undefined) && (
              <Area
                type="monotone"
                dataKey="canceledSubscriptions"
                stroke="hsl(0 84% 60%)"
                fillOpacity={1}
                fill="url(#colorCanceled)"
                strokeWidth={2}
                name="Canceled Subscriptions"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
