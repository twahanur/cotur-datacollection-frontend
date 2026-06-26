"use client";

import PageHeader from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import TableComponent from "@/components/ui/CustomTableComponent";
import TooltipComponent from "@/components/ui/TooltipComponent";
import { TCustomerHistory } from "@/types/customerHistory.types";
import { convertDate } from "@/utills/dateConverter";
import { formatLabel } from "@/utills/formatLabel";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, History } from "lucide-react";

const roleStyles: Record<string, string> = {
  SUPER_ADMIN: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  ADMIN: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  AGENT: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};

const DiffRow = ({
  field,
  oldVal,
  newVal,
}: {
  field: string;
  oldVal: string;
  newVal: string;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 py-2 border-b border-white/5 last:border-0">
    <span className="text-[#A1A1A1] text-xs w-32 shrink-0 capitalize">
      {field.replace(/([A-Z])/g, " $1").trim()}
    </span>
    <div className="flex items-center gap-2 flex-wrap min-w-0">
      <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-md break-all">
        {oldVal || "—"}
      </span>
      <ArrowRight size={12} className="text-[#A1A1A1] shrink-0" />
      <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md break-all">
        {newVal || "—"}
      </span>
    </div>
  </div>
);

const columns: ColumnDef<TCustomerHistory>[] = [
  {
    id: "updatedBy",
    header: "Updated By",
    cell: ({ row }) => {
      const { fullName, role } = row.original.updatedBy;
      const trimmed =
        fullName.length > 12 ? fullName.slice(0, 12) + "..." : fullName;
      return (
        <div className="flex flex-col items-center gap-1">
          <TooltipComponent name={fullName} trimedName={trimmed} />
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
              roleStyles[role] ?? "bg-white/10 text-white border-white/10"
            }`}
          >
            {formatLabel(role)}
          </span>
        </div>
      );
    },
  },
  {
    id: "changedFields",
    header: "Changed Fields",
    cell: ({ row }) => {
      const { newValues, oldValues } = row.original;
      const fields = Object.keys(newValues).filter(
        (k) => newValues[k] !== oldValues[k],
      );
      if (!fields.length)
        return (
          <span className="text-[#A1A1A1] text-xs">No changes</span>
        );
      return (
        <div className="flex flex-wrap gap-1 justify-center">
          {fields.map((f) => (
            <span
              key={f}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70 capitalize"
            >
              {f.replace(/([A-Z])/g, " $1").trim()}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    id: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const { creationDate, creationTime } = convertDate(
        new Date(row.original.updatedAt),
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

const renderExpanded = (record: TCustomerHistory) => {
  const { newValues, oldValues } = record;
  const allFields = Array.from(
    new Set([...Object.keys(oldValues), ...Object.keys(newValues)]),
  );
  const changedFields = allFields.filter(
    (k) => (newValues[k] ?? "") !== (oldValues[k] ?? ""),
  );

  if (!changedFields.length)
    return (
      <p className="text-[#A1A1A1] text-xs px-2 py-3">No changes recorded.</p>
    );

  return (
    <div className="px-3 py-3 space-y-0">
      <p className="text-[#A1A1A1] text-xs font-medium mb-2">
        Change Details
      </p>
      {changedFields.map((field) => (
        <DiffRow
          key={field}
          field={field}
          oldVal={oldValues[field] ?? ""}
          newVal={newValues[field] ?? ""}
        />
      ))}
    </div>
  );
};

const CustomerHistory = ({ history }: { history: TCustomerHistory[] }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <PageHeader
        title="Customer History"
        description="Full audit log of changes made to this customer"
      />

      <Card className="w-full rounded-2xl effect p-2 gap-3">
        {/* Card header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[rgba(255,107,0,0.13)] effect-no-bg shrink-0">
            <History className="text-[#FF6B00]" />
          </div>
          <div>
            <h1 className="text-[#FDFDFD] text-lg">Change Log</h1>
            <p className="text-[#B1B1B1] text-sm">
              {history.length} update{history.length !== 1 ? "s" : ""} recorded
            </p>
          </div>
        </div>

        <p className="text-[#A1A1A1] text-xs px-1">
          Click any row to expand and see the full field-level diff.
        </p>

        <TableComponent
          data={history}
          columns={columns}
          className="border-none text-sm"
          className2="border-b"
          className3="border-none my-2"
          renderExpanded={renderExpanded}
        />
      </Card>
    </div>
  );
};

export default CustomerHistory;
