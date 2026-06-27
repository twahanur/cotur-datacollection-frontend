import { TActivityLog } from "@/types/activityLog.types";
import { ColumnDef } from "@tanstack/react-table";
import TooltipComponent from "../ui/TooltipComponent";
import { formatLabel } from "@/utills/formatLabel";
import { convertDate } from "@/utills/dateConverter";

// ─── role badge styles ───────────────────────────────────────────────────────
const roleStyles: Record<string, string> = {
  SUPER_ADMIN: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  ADMIN: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  AGENT: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};

// ─── action badge styles ─────────────────────────────────────────────────────
const actionColor = (action: string): string => {
  const a = action.toUpperCase();
  if (a.includes("CREATE") || a.includes("ADD"))
    return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
  if (a.includes("UPDATE") || a.includes("EDIT") || a.includes("PATCH"))
    return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
  if (a.includes("DELETE") || a.includes("REMOVE"))
    return "bg-red-500/10 text-red-400 border border-red-500/20";
  if (a.includes("LOGIN") || a.includes("AUTH"))
    return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
  return "bg-white/5 text-white/60 border border-white/10";
};

export const activityLogColumns = (): ColumnDef<TActivityLog>[] => [
  {
    id: "user",
    header: "User",
    cell: ({ row }) => {
      const { userName, user } = row.original;
      const name = userName || user?.fullName || "—";
      const trimmed = name.length > 14 ? name.slice(0, 14) + "..." : name;
      return (
        <div className="flex flex-col items-center gap-1">
          <TooltipComponent name={name} trimedName={trimmed} />
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
              roleStyles[row.original.role] ??
              "bg-white/5 text-white/60 border-white/10"
            }`}
          >
            {formatLabel(row.original.role)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const action = row.original.action;
      const trimmed = action.length > 16 ? action.slice(0, 16) + "..." : action;
      return (
        <div className="flex items-center justify-center">
          <TooltipComponent
            name={action}
            trimedName={trimmed}
            classname={`text-xs font-medium px-2.5 py-1 rounded-full border ${actionColor(action)}`}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "module",
    header: "Module",
    cell: ({ row }) => {
      const model = row.original.module;

      const trimmed = model.length > 14 ? model.slice(0, 14) + "..." : model;
      return (
        <div className="flex items-center justify-center">
          <TooltipComponent
            name={model}
            trimedName={trimmed}
            classname="text-white/70 text-xs"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span className="text-xs font-mono text-white/60">
          {row.original.ipAddress || "—"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "metadata",
    header: "Email",
    cell: ({ row }) => {
      const email =
        row.original.metadata?.email || row.original.user?.email || "—";
      const trimmed = email.length > 18 ? email.slice(0, 18) + "..." : email;
      return (
        <div className="flex items-center justify-center">
          <TooltipComponent
            name={email}
            trimedName={trimmed}
            classname="text-white/60 text-xs"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Time",
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
