import { TAgentStatTarget, TTargetPeriod } from "@/types/target.types";
import { Card } from "../ui/card";
import { Target } from "lucide-react";
import { formatLabel } from "@/utills/formatLabel";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

export const progressColor = (pct: number) => {
  if (pct >= 100) return "#34D399";
  if (pct >= 60) return "#FFB13F";
  return "#F87171";
};

const periodStyles: Record<TTargetPeriod, string> = {
  DAILY: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  WEEKLY: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  MONTHLY: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  SPECIFIC_DATE: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
};

export const TargetCard = ({ target }: { target: TAgentStatTarget }) => {
  const pct = Math.min(Math.round(target.achievementPercentage), 100);
  const color = progressColor(target.achievementPercentage);

  // build mini bar chart data for visual clarity
  const chartData = [
    { label: "Achieved", count: target.achievedCount, fill: "#34D399" },
    { label: "Remaining", count: target.remainingCount, fill: "#F87171" },
  ];

  return (
    <Card className="effect p-5 gap-0 space-y-4">
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
