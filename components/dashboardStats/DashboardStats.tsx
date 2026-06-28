"use client";

import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TDashboardStats } from "@/types/dashboardStats.types";
import {
  Award,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Package,
  TrendingUp,
  Users,
  Users2,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatCard } from "./StatCard";
import { SectionHeader } from "./SectionHeader";

// ─── palette ────────────────────────────────────────────────────────────────
const COLORS = [
  "#FFB13F",
  "#818CF8",
  "#34D399",
  "#F472B6",
  "#60A5FA",
  "#FB923C",
  "#A78BFA",
  "#2DD4BF",
];

// ─── main component ──────────────────────────────────────────────────────────
const DashboardStats = ({ stats }: { stats: TDashboardStats }) => {

  // truncate long labels for axis
  const truncate = (str: string, n = 10) =>
    str.length > n ? str.slice(0, n) + "…" : str;

  return (
    <div className="space-y-6">
      {/* ── Overview stat cards ─────────────────────────────────────────── */}
      {stats?.overview && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          <StatCard
            icon={Users2}
            label="Total Customers"
            value={stats?.overview?.totalCustomers}
            iconBg="bg-[rgba(255,107,0,0.13)]"
            iconColor="text-[#FF6B00]"
          />
          <StatCard
            icon={CheckCircle2}
            label="Verified Customers"
            value={stats?.overview?.totalVerifiedCustomers}
            iconBg="bg-emerald-500/10"
            iconColor="text-emerald-400"
          />
          <StatCard
            icon={CalendarDays}
            label="Today's Collection"
            value={stats?.overview?.todayCollection}
            iconBg="bg-blue-500/10"
            iconColor="text-blue-400"
          />
          <StatCard
            icon={TrendingUp}
            label="Monthly Collection"
            value={stats?.overview?.monthlyCollection}
            iconBg="bg-purple-500/10"
            iconColor="text-purple-400"
          />
          <StatCard
            icon={Users}
            label="Total Agents"
            value={stats?.overview?.totalAgents}
            iconBg="bg-yellow-500/10"
            iconColor="text-yellow-400"
          />
          <StatCard
            icon={Users}
            label="Active Agents"
            value={stats?.overview?.activeAgents}
            iconBg="bg-pink-500/10"
            iconColor="text-pink-400"
          />
        </div>
      )}

      {/* ── Daily trend ─────────────────────────────────────────────────── */}
      <Card className="effect p-5 gap-0">
        <SectionHeader icon={TrendingUp} title="Daily Collection Trend" />
        {stats?.analytics?.dailyCollectionTrend.length === 0 ? (
          <p className="text-[#A1A1A1] text-sm text-center py-8">
            No daily data available
          </p>
        ) : (
          <ChartContainer
            config={{ count: { label: "Collections", color: "#FFB13F" } }}
            className="h-56 sm:h-72 w-full"
          >
            <LineChart
              data={stats?.analytics?.dailyCollectionTrend}
              margin={{ top: 8, right: 16, left: -16, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
              />
              <XAxis
                dataKey="date"
                tickFormatter={(v) => {
                  const d = new Date(v);
                  return `${d.getDate()}/${d.getMonth() + 1}`;
                }}
                tick={{ fontSize: 11, fill: "#A1A1A1" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#A1A1A1" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <ChartTooltip
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#FFB13F"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#FFB13F", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </Card>

      {/* ── Monthly trend ───────────────────────────────────────────────── */}
      <Card className="effect p-5 gap-0">
        <SectionHeader icon={BarChart3} title="Monthly Collection Trend" />
        {stats?.analytics?.monthlyCollectionTrend.length === 0 ? (
          <p className="text-[#A1A1A1] text-sm text-center py-8">
            No monthly data available
          </p>
        ) : (
          <ChartContainer
            config={{ count: { label: "Collections", color: "#818CF8" } }}
            className="h-56 sm:h-72 w-full"
          >
            <BarChart
              data={stats?.analytics?.monthlyCollectionTrend}
              margin={{ top: 8, right: 16, left: -16, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
              />
              <XAxis
                dataKey="month"
                tickFormatter={(v) => truncate(v, 6)}
                tick={{ fontSize: 11, fill: "#A1A1A1" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#A1A1A1" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#818CF8" />
            </BarChart>
          </ChartContainer>
        )}
      </Card>

      {/* ── Agent + Product row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Collections by agent */}
        <Card className="effect p-5 gap-0">
          <SectionHeader icon={Users} title="Collections by Agent" />
          {stats?.analytics?.collectionsByAgent?.length === 0 ? (
            <p className="text-[#A1A1A1] text-sm text-center py-8">
              No agent data available
            </p>
          ) : (
            <ChartContainer
              config={{ count: { label: "Collections", color: "#34D399" } }}
              className="h-56 sm:h-64 w-full"
            >
              <BarChart
                data={stats?.analytics?.collectionsByAgent}
                margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                />
                <XAxis
                  dataKey="agentName"
                  tickFormatter={(v) => truncate(v, 8)}
                  tick={{ fontSize: 10, fill: "#A1A1A1" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#A1A1A1" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1A1129",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {stats?.analytics?.collectionsByAgent.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          )}
        </Card>

        {/* Collections by product */}
        <Card className="effect p-5 gap-0">
          <SectionHeader icon={Package} title="Collections by Product" />
          {stats?.analytics?.collectionsByInterestedProduct?.length === 0 ? (
            <p className="text-[#A1A1A1] text-sm text-center py-8">
              No product data available
            </p>
          ) : (
            <ChartContainer
              config={{ count: { label: "Collections", color: "#F472B6" } }}
              className="h-56 sm:h-64 w-full"
            >
              <BarChart
                layout="vertical"
                data={stats?.analytics?.collectionsByInterestedProduct}
                margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "#A1A1A1" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="product"
                  tickFormatter={(v) => truncate(v, 14)}
                  tick={{ fontSize: 10, fill: "#A1A1A1" }}
                  axisLine={false}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1A1129",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {stats?.analytics?.collectionsByInterestedProduct?.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          )}
        </Card>
      </div>

      {/* ── Location + Top agents row ───────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Collections by location */}
        <Card className="effect p-5 gap-0">
          <SectionHeader icon={MapPin} title="Collections by Location" />
          {stats?.analytics?.collectionsByLocation?.length === 0 ? (
            <p className="text-[#A1A1A1] text-sm text-center py-8">
              No location data available
            </p>
          ) : (
            <ChartContainer
              config={{ count: { label: "Collections", color: "#60A5FA" } }}
              className="h-56 sm:h-64 w-full"
            >
              <BarChart
                layout="vertical"
                data={stats?.analytics?.collectionsByLocation}
                margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "#A1A1A1" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="location"
                  tickFormatter={(v) => truncate(v, 14)}
                  tick={{ fontSize: 10, fill: "#A1A1A1" }}
                  axisLine={false}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1A1129",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {stats?.analytics?.collectionsByLocation?.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          )}
        </Card>

        {/* Top performing agents leaderboard */}
        <Card className="effect p-5 gap-0">
          <SectionHeader icon={Award} title="Top Performing Agents" />
          {stats?.analytics?.topPerformingAgents?.length === 0 ? (
            <p className="text-[#A1A1A1] text-sm text-center py-8">
              No agent data available
            </p>
          ) : (
            <div className="space-y-2 mt-1">
              {stats?.analytics?.topPerformingAgents?.map((agent, i) => {
                const max = stats?.analytics?.topPerformingAgents[0]?.count || 1;
                const pct = Math.round((agent?.count / max) * 100);
                const medals = ["🥇", "🥈", "🥉"];
                return (
                  <div key={agent.agentId} className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm shrink-0">
                          {medals[i] ?? (
                            <span className="text-[#A1A1A1] text-xs w-5 inline-block text-center">
                              {i + 1}
                            </span>
                          )}
                        </span>
                        <span className="text-white text-sm truncate">
                          {agent?.agentName}
                        </span>
                      </div>
                      <span className="text-[#A1A1A1] text-xs shrink-0 font-mono">
                        {agent?.count}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/5">
                      <div
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          background: COLORS[i % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
