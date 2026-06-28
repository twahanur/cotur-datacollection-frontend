"use client";

import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SectionHeader } from "./SectionHeader";
import { StatCard } from "./StatCard";
import { TAgentDashboard } from "@/types/dashboardStats.types";
import { TAgentStatTarget, TTargetPeriod } from "@/types/target.types";
import { TRecentData } from "@/types/dashboardStats.types";
import { TVerificationStatus } from "@/types/customer.types";
import { convertDate } from "@/utills/dateConverter";
import { formatLabel } from "@/utills/formatLabel";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Phone,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

// ─── style maps ───────────────────────────────────────────────────────────────
const periodStyles: Record<TTargetPeriod, string> = {
  DAILY: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  WEEKLY: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  MONTHLY: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  SPECIFIC_DATE:
    "bg-orange-500/10 text-orange-400 border border-orange-500/20",
};

const verificationStyles: Record<TVerificationStatus, string> = {
  VERIFIED: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  PENDING: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
};

const progressColor = (pct: number) => {
  if (pct >= 100) return "#34D399";
  if (pct >= 60) return "#FFB13F";
  return "#F87171";
};

// ─── target card ─────────────────────────────────────────────────────────────
const TargetCard = ({ target }: { target: TAgentStatTarget }) => {
  const pct = Math.min(Math.round(target.achievementPercentage), 100);
  const color = progressColor(target.achievementPercentage);

  // build mini bar chart data for visual clarity
  const chartData = [
    { label: "Achieved", count: target.achievedCount, fill: "#34D399" },
    { label: "Remaining", count: target.remainingCount, fill: "#F87171" },
  ];

  return (
    <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 gap-0 space-y-4">
      {/* header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[rgba(255,107,0,0.13)] shrink-0">
            <Target size={14} className="text-[#FF6B00]" />
          </div>
          <span className="text-white text-sm font-semibold">Target</span>
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full border ${periodStyles[target.period]}`}
        >
          {target.period === "SPECIFIC_DATE"
            ? "Specific Date"
            : formatLabel(target.period)}
        </span>
      </div>

      {/* progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#A1A1A1]">Achievement Progress</span>
          <span className="font-bold text-sm" style={{ color }}>
            {pct}%
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: color }}
          />
        </div>
      </div>

      {/* counts grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
          <p className="text-[#A1A1A1] text-[10px] mb-1">Target</p>
          <p className="text-white text-lg font-bold">{target.targetCount}</p>
        </div>
        <div className="bg-emerald-500/5 rounded-xl p-3 text-center border border-emerald-500/10">
          <p className="text-[#A1A1A1] text-[10px] mb-1">Achieved</p>
          <p className="text-emerald-400 text-lg font-bold">
            {target.achievedCount}
          </p>
        </div>
        <div className="bg-red-500/5 rounded-xl p-3 text-center border border-red-500/10">
          <p className="text-[#A1A1A1] text-[10px] mb-1">Remaining</p>
          <p className="text-red-400 text-lg font-bold">
            {target.remainingCount}
          </p>
        </div>
      </div>

      {/* mini bar chart */}
      <ChartContainer
        config={{
          Achieved: { label: "Achieved", color: "#34D399" },
          Remaining: { label: "Remaining", color: "#F87171" },
        }}
        className="h-28 w-full"
      >
        <BarChart
          data={chartData}
          margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />
          <XAxis
            dataKey="label"
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
          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </Card>
  );
};

// ─── recent collection row ────────────────────────────────────────────────────
const RecentRow = ({ item }: { item: TRecentData }) => {
  const { creationDate } = convertDate(new Date(item.collectionDate));
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-3 border-b border-white/5 last:border-0">
      {/* avatar + name */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-yellow-600/30 to-orange-600/30 border border-white/10 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-white">
            {item.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-medium truncate">{item.name}</p>
          <div className="flex items-center gap-1 text-[#A1A1A1] text-xs">
            <Phone size={10} />
            <span>{item.phoneNumber}</span>
          </div>
        </div>
      </div>

      {/* meta pills */}
      <div className="flex flex-wrap items-center gap-2 shrink-0">
        <div className="flex items-center gap-1 text-[#A1A1A1] text-xs">
          <MapPin size={10} />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-1 text-[#A1A1A1] text-xs">
          <Package size={10} />
          <span className="max-w-[100px] truncate">{item.interestedProduct}</span>
        </div>
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${verificationStyles[item.verificationStatus]}`}
        >
          {formatLabel(item.verificationStatus)}
        </span>
        <div className="flex items-center gap-1 text-[#A1A1A1] text-xs">
          <Clock size={10} />
          <span>{creationDate}</span>
        </div>
      </div>
    </div>
  );
};

// ─── main component ───────────────────────────────────────────────────────────
const AgentDashboardStats = ({
  dashboardStat,
}: {
  dashboardStat: TAgentDashboard;
}) => {
  const { todayCollection, monthlyCollection, targets, recentCollections } =
    dashboardStat;

  return (
    <div className="space-y-6">
      {/* ── stat cards ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <StatCard
          icon={CalendarDays}
          label="Today's Collection"
          value={todayCollection}
          iconBg="bg-blue-500/10"
          iconColor="text-blue-400"
        />
        <StatCard
          icon={TrendingUp}
          label="Monthly Collection"
          value={monthlyCollection}
          iconBg="bg-purple-500/10"
          iconColor="text-purple-400"
        />
      </div>

      {/* ── targets ─────────────────────────────────────────────────────── */}
      {targets.length > 0 ? (
        <div className="space-y-3">
          <SectionHeader
            icon={Target}
            title={`My Targets (${targets.length})`}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {targets.map((target, i) => (
              <TargetCard key={i} target={target} />
            ))}
          </div>
        </div>
      ) : (
        <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-8 gap-0">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="p-3 rounded-2xl bg-[rgba(255,107,0,0.13)]">
              <Target size={22} className="text-[#FF6B00]" />
            </div>
            <p className="text-white text-sm font-medium mt-1">
              No Targets Assigned
            </p>
            <p className="text-[#A1A1A1] text-xs max-w-xs">
              You have no targets configured yet. Contact your admin to set one
              up.
            </p>
          </div>
        </Card>
      )}

      {/* ── overall target summary bar (across all targets) ─────────────── */}
      {targets.length > 1 && (
        <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 gap-0">
          <SectionHeader icon={CheckCircle2} title="Overall Target Summary" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
            {(
              [
                {
                  label: "Total Target",
                  value: targets.reduce((s, t) => s + t.targetCount, 0),
                  color: "text-white",
                  bg: "bg-white/5 border-white/5",
                },
                {
                  label: "Total Achieved",
                  value: targets.reduce((s, t) => s + t.achievedCount, 0),
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/5 border-emerald-500/10",
                },
                {
                  label: "Total Remaining",
                  value: targets.reduce((s, t) => s + t.remainingCount, 0),
                  color: "text-red-400",
                  bg: "bg-red-500/5 border-red-500/10",
                },
              ] as const
            ).map(({ label, value, color, bg }) => (
              <div
                key={label}
                className={`rounded-xl p-4 border text-center ${bg}`}
              >
                <p className="text-[#A1A1A1] text-xs mb-1">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>
          {/* overall progress */}
          {(() => {
            const totalTarget = targets.reduce((s, t) => s + t.targetCount, 0);
            const totalAchieved = targets.reduce(
              (s, t) => s + t.achievedCount,
              0,
            );
            const overallPct =
              totalTarget > 0
                ? Math.min(Math.round((totalAchieved / totalTarget) * 100), 100)
                : 0;
            const color = progressColor(overallPct);
            return (
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A1A1A1]">Overall Achievement</span>
                  <span className="font-bold" style={{ color }}>
                    {overallPct}%
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${overallPct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })()}
        </Card>
      )}

      {/* ── recent collections ───────────────────────────────────────────── */}
      <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 gap-0">
        <SectionHeader icon={User} title="Recent Collections" />
        {recentCollections.length === 0 ? (
          <div className="flex flex-col items-center gap-2 text-center py-8">
            <div className="p-3 rounded-2xl bg-[rgba(255,107,0,0.13)]">
              <User size={20} className="text-[#FF6B00]" />
            </div>
            <p className="text-[#A1A1A1] text-sm">No recent collections</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-[#A1A1A1] text-xs">
                {recentCollections.length} recent entr
                {recentCollections.length === 1 ? "y" : "ies"}
              </p>
            </div>
            {recentCollections.map((item) => (
              <RecentRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AgentDashboardStats;
