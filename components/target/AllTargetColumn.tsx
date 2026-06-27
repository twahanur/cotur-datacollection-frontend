import { TTarget, TTargetPeriod, TTargetType } from "@/types/target.types";
import { formatLabel } from "@/utills/formatLabel";
import { ColumnDef } from "@tanstack/react-table";
import TooltipComponent from "../ui/TooltipComponent";
import { convertDate } from "@/utills/dateConverter";

const typeStyles: Record<TTargetType, string> = {
  GLOBAL: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  INDIVIDUAL: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
};

const periodStyles: Record<TTargetPeriod, string> = {
  DAILY: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  WEEKLY: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  MONTHLY: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  SPECIFIC_DATE: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
};

export const allTargetColumns = (): ColumnDef<TTarget>[] => [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <div className="flex items-center justify-center">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${typeStyles[type]}`}
          >
            {formatLabel(type)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "agent",
    header: "Agent",
    cell: ({ row }) => {
      const agent = row.original.agent;
      if (!agent)
        return (
          <div className="flex items-center justify-center">
            <span className="text-xs text-[#A1A1A1]">—</span>
          </div>
        );
      const name = agent.fullName;
      const trimmed = name.length > 14 ? name.slice(0, 14) + "..." : name;
      return (
        <div className="flex flex-col items-center gap-0.5">
          <TooltipComponent name={name} trimedName={trimmed} />
          <span className="text-[10px] text-[#A1A1A1] truncate max-w-[120px]">
            {agent.email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "targetCount",
    header: "Target",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span className="text-white font-semibold text-sm">
          {row.original.targetCount}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "period",
    header: "Period",
    cell: ({ row }) => {
      const period = row.original.period;
      return (
        <div className="flex items-center justify-center">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${periodStyles[period]}`}
          >
            {period === "SPECIFIC_DATE" ? "Specific Date" : formatLabel(period)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "specificDate",
    header: "Specific Date",
    cell: ({ row }) => {
      const date = row.original.specificDate;
      if (!date)
        return (
          <div className="flex items-center justify-center">
            <span className="text-xs text-[#A1A1A1]">—</span>
          </div>
        );
      const { creationDate, creationTime } = convertDate(new Date(date));
      return (
        <div className="flex flex-col items-center text-xs leading-tight whitespace-nowrap">
          <span className="font-medium">{creationDate}</span>
          <span className="text-muted-foreground">{creationTime}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const { creationDate, creationTime } = convertDate(
        new Date(row.original.createdAt),
      );
      return (
        <div className="flex flex-col items-center text-xs leading-tight whitespace-nowrap">
          <span className="font-medium">{creationDate}</span>
          <span className="text-muted-foreground">{creationTime}</span>
        </div>
      );
    },
  },
];
