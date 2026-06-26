
"use client";
import TooltipComponent from "@/components/ui/TooltipComponent";
import { ColumnDef } from "@tanstack/react-table";
import UserActionButtons from "./UserActionButtons";
import { TUser } from "@/types/user.types";
import { formatLabel } from "@/utills/formatLabel";
import { convertDate } from "@/utills/dateConverter";

export const userTableColumn = (): ColumnDef<TUser>[] => [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original?.fullName;
      const trimedName = name.length > 12 ? name.slice(0, 12) + "..." : name;
      return (
        <div className="flex items-center gap-3">
          <TooltipComponent name={name} trimedName={trimedName} />
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
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original?.role;
      return (
        <div className=" flex items-center gap-2">{formatLabel(role)}</div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original?.status;

      return (
        <div className=" flex items-center gap-2">{formatLabel(status)}</div>
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
      const user = row.original;
      return <UserActionButtons user={user} />;
    },
  },
];
