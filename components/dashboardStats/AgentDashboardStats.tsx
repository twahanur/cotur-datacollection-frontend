"use client";

import { Card } from "@/components/ui/card";
import { SectionHeader } from "./SectionHeader";
import { StatCard } from "./StatCard";
import { TAgentDashboard } from "@/types/dashboardStats.types";
import {
  CalendarDays,
  CheckCircle2,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import { progressColor, TargetCard } from "./AgentDashboardTarget";
import { RecentRow } from "./RecentRow";

// ─── main component ───────────────────────────────────────────────────────────
const AgentDashboardStats = ({
  dashboardStat,
}: {
  dashboardStat: TAgentDashboard;
}) => {
  return (
    <div className="space-y-6">
      {/* ── stat cards ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <StatCard
          icon={CalendarDays}
          label="Today's Collection"
          value={dashboardStat?.todayCollection}
          iconBg="bg-blue-500/10"
          iconColor="text-blue-400"
        />
        <StatCard
          icon={TrendingUp}
          label="Monthly Collection"
          value={dashboardStat?.monthlyCollection}
          iconBg="bg-purple-500/10"
          iconColor="text-purple-400"
        />
      </div>

      {/* ── targets ─────────────────────────────────────────────────────── */}
      {dashboardStat?.targets.length > 0 ? (
        <div className="space-y-3">
          <SectionHeader
            icon={Target}
            title={`My Targets (${dashboardStat?.targets.length})`}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {dashboardStat?.targets?.map((target, i) => (
              <TargetCard key={i} target={target} />
            ))}
          </div>
        </div>
      ) : (
        <Card className="effect p-8 gap-0">
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
      {dashboardStat?.targets?.length > 1 && (
        <Card className="effect p-5 gap-0">
          <SectionHeader icon={CheckCircle2} title="Overall Target Summary" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
            {(
              [
                {
                  label: "Total Target",
                  value: dashboardStat?.targets?.reduce(
                    (s, t) => s + t.targetCount,
                    0,
                  ),
                  color: "text-white",
                  bg: "bg-white/5 border-white/5",
                },
                {
                  label: "Total Achieved",
                  value: dashboardStat?.targets?.reduce(
                    (s, t) => s + t.achievedCount,
                    0,
                  ),
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/5 border-emerald-500/10",
                },
                {
                  label: "Total Remaining",
                  value: dashboardStat?.targets?.reduce(
                    (s, t) => s + t.remainingCount,
                    0,
                  ),
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
            const totalTarget = dashboardStat?.targets?.reduce(
              (s, t) => s + t.targetCount,
              0,
            );
            const totalAchieved = dashboardStat?.targets?.reduce(
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
      <Card className="effect p-5 gap-0">
        <SectionHeader icon={User} title="Recent Collections" />
        {dashboardStat?.recentCollections.length === 0 ? (
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
                {dashboardStat?.recentCollections?.length} recent entr
                {dashboardStat?.recentCollections?.length === 1 ? "y" : "ies"}
              </p>
            </div>
            {dashboardStat?.recentCollections?.map((item) => (
              <RecentRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AgentDashboardStats;
