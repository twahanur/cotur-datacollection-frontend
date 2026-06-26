/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import TooltipComponent from "@/components/ui/TooltipComponent";
import { TCustomer } from "@/types/customer.types";
import { convertDate } from "@/utills/dateConverter";
import { formatLabel } from "@/utills/formatLabel";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import CreateCustomer from "./CreateCustomer";
import ConfirmComponent, { TOnChangeProps } from "../ui/ConfirmModal";
import { toast } from "sonner";
import { deleteCustomer } from "@/service/custoemer";

export const customerTableColumn = (): ColumnDef<TCustomer>[] => [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original?.name;
      const trimmed = name.length > 14 ? name.slice(0, 14) + "..." : name;
      return (
        <div className="flex items-center justify-center">
          <TooltipComponent name={name} trimedName={trimmed} />
        </div>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.original?.phoneNumber;
      const trimmed = phone.length > 14 ? phone.slice(0, 14) + "..." : phone;
      return (
        <div className="flex items-center justify-center">
          <TooltipComponent
            name={phone}
            trimedName={trimmed}
            classname="text-white/60"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const location = row.original?.location;
      const trimmed =
        location.length > 14 ? location.slice(0, 14) + "..." : location;
      return (
        <div className="flex items-center justify-center">
          <TooltipComponent
            name={location}
            trimedName={trimmed}
            classname="text-white/60"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "interestedProduct",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original?.interestedProduct;
      const trimmed =
        product.length > 14 ? product.slice(0, 14) + "..." : product;
      return (
        <div className="flex items-center justify-center">
          <TooltipComponent
            name={product}
            trimedName={trimmed}
            classname="text-white/60"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "collectedBy",
    header: "Collected By",
    cell: ({ row }) => {
      const agent = row.original?.collectedBy?.fullName;
      const trimmed = agent.length > 14 ? agent.slice(0, 14) + "..." : agent;
      return (
        <div className="flex items-center justify-center">
          <TooltipComponent
            name={agent}
            trimedName={trimmed}
            classname="text-white/60"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "verificationStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original?.verificationStatus;
      return (
        <div className="flex items-center justify-center">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              status === "VERIFIED"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
            }`}
          >
            {formatLabel(status)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "collectionDate",
    header: "Collected",
    cell: ({ row }) => {
      const { creationDate, creationTime } = convertDate(
        new Date(row.original?.collectionDate),
      );
      return (
        <div className="flex flex-col items-center text-xs leading-tight whitespace-nowrap">
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
      const customer = row.original;

      const handleDeleteUser = async ({
        id,
        setOpen,
        setLoading,
      }: TOnChangeProps) => {
        setLoading(true);
        const toastId = toast.loading("Deleting customer...");
        try {
          const result = await deleteCustomer(id);
          if (result?.success) {
            toast.success(result?.message, { id: toastId });
            setOpen(false);
            setLoading(false);
          } else {
            toast.error(result?.message, { id: toastId });
          }
        } catch (error: any) {
          console.error(error);
          toast.error("Something went wrong", { id: toastId });
        }
      };

      return (
        <div className="flex items-center justify-center gap-3">
          <Link href={`/customers/${customer.id}`}>
            <button className="text-text-secondary cursor-pointer hover:text-white transition-colors">
              <Eye size={20} />
            </button>
          </Link>
          <CreateCustomer customer={customer} />
          <ConfirmComponent
            onChange={handleDeleteUser}
            id={customer?.id}
            title="Want to Delete this customer?"
            description="If you want to delete this customer, all the data of this customer will be removed parmanantly. And this action can`t be undone"
          >
            <button className="text-red-600 cursor-pointer">
              <Trash2 size={16} />
            </button>
          </ConfirmComponent>
        </div>
      );
    },
  },
];
