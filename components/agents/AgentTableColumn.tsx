"use client";
import TooltipComponent from "@/components/ui/TooltipComponent";
import { ColumnDef } from "@tanstack/react-table";
import { formatLabel } from "@/utills/formatLabel";
import { convertDate } from "@/utills/dateConverter";
import { TAgent } from "@/types/agent.types";
import Link from "next/link";
import { Eye } from "lucide-react";
import CreateAgent from "./CreateAgent";

export const agentTableColumn = (): ColumnDef<TAgent>[] => [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original?.fullName;
      const id = row.original?.id;
      const trimedName = name.length > 12 ? name.slice(0, 12) + "..." : name;
      return (
        <div className="flex items-center justify-center gap-3">
          <Link href={`/users/${id}`}>
            <TooltipComponent name={name} trimedName={trimedName} />
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original?.email;
      const trimedEmail =
        email.length > 16 ? email.slice(0, 16) + "..." : email;
      return (
        <div className=" flex items-center justify-center gap-2">
          <TooltipComponent
            name={email}
            trimedName={trimedEmail}
            classname="text-white/60"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "Phone",
    header: "phoneNumber",
    cell: ({ row }) => {
      const email = row.original?.phoneNumber;
      const trimedEmail =
        email.length > 16 ? email.slice(0, 16) + "..." : email;
      return (
        <div className=" flex items-center justify-center gap-2">
          <TooltipComponent
            name={email}
            trimedName={trimedEmail}
            classname="text-white/60"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original?.status;

      return (
        <div className=" flex items-center justify-center gap-2">
          {formatLabel(status)}
        </div>
      );
    },
  },

  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const { creationDate, creationTime } = convertDate(
        new Date(row.original?.createdAt),
      );
      return (
        <div className="flex flex-col text-xs leading-tight whitespace-nowrap">
          <span className="font-medium">{creationDate}</span>
          <span className="text-muted-foreground">{creationTime}</span>
        </div>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const agent = row.original;
      return (
        <div className="flex items-center justify-center gap-3 w-full">
          <Link
            href={`/agents/${agent?.id}`}
            className="flex items-center justify-center"
          >
            <button className="text-text-secondary cursor-pointer">
              <Eye size={18} />
            </button>
          </Link>
          <CreateAgent agent={agent} />
        </div>
      );
    },
  },
];
