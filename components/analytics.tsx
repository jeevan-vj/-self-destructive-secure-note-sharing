"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", notes: 4 },
  { name: "Tue", notes: 3 },
  { name: "Wed", notes: 7 },
  { name: "Thu", notes: 5 },
  { name: "Fri", notes: 6 },
  { name: "Sat", notes: 2 },
  { name: "Sun", notes: 4 },
];

const stats = [
  {
    title: "Total Notes",
    value: "31",
    description: "Last 30 days",
  },
  {
    title: "Active Notes",
    value: "12",
    description: "Currently active",
  },
  {
    title: "Access Rate",
    value: "89%",
    description: "Notes accessed",
  },
];

export function Analytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader>
            <CardTitle>{stat.title}</CardTitle>
            <CardDescription>{stat.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Note Creation Trend</CardTitle>
          <CardDescription>Notes created over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="notes"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}