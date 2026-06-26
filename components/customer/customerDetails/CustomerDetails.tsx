"use client";

import PageHeader from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import ConfirmComponent from "@/components/ui/ConfirmModal";
import { InfoRow } from "@/components/users/userDetails/InRow";
import { useUser } from "@/provider/AuthProvider";
import { deleteCustomer } from "@/service/custoemer";
import { TCustomer } from "@/types/customer.types";
import { convertDate } from "@/utills/dateConverter";
import { formatLabel } from "@/utills/formatLabel";
import {
  Calendar,
  Clock,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CreateCustomer from "../CreateCustomer";
import Link from "next/link";
import TriggeredButton from "@/components/ui/TriggeredButton";

const verificationStyles: Record<string, string> = {
  VERIFIED: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  PENDING: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
};

const CustomerDetails = ({ customer }: { customer: TCustomer }) => {
  const router = useRouter();
  const { user } = useUser();

  const { creationDate, creationTime } = convertDate(
    new Date(customer.createdAt),
  );
  const { creationDate: updatedDate, creationTime: updatedTime } = convertDate(
    new Date(customer.updatedAt),
  );
  const { creationDate: collectedDate, creationTime: collectedTime } =
    convertDate(new Date(customer.collectionDate));

  const initials = customer.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const canManage = user?.role === "SUPER_ADMIN" || user?.role === "ADMIN";

  return (
    <div className="min-h-screen space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Customer Details"
          description="View and manage customer record information"
        />
        {canManage && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Delete */}
            <ConfirmComponent
              id={customer.id}
              title="Delete this customer?"
              description="This will permanently remove the customer record. This action cannot be undone."
              acceptButtonName="Delete"
              onChange={async ({ id, setOpen, setLoading }) => {
                setLoading(true);
                const toastId = toast.loading("Deleting customer...");
                try {
                  const result = await deleteCustomer(id);
                  if (result?.success) {
                    toast.success(result.message ?? "Customer deleted", {
                      id: toastId,
                    });
                    setOpen(false);
                    router.push("/customers");
                  } else {
                    toast.error(result?.message ?? "Failed to delete", {
                      id: toastId,
                    });
                  }
                } catch {
                  toast.error("Something went wrong", { id: toastId });
                } finally {
                  setLoading(false);
                }
              }}
            >
              <button className="relative cursor-pointer bg-white/5 rounded-2xl py-1.5 sm:py-2 flex items-center justify-center px-3 sm:px-4 overflow-hidden whitespace-nowrap border border-white/10 gap-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                <Trash2 size={15} />
                <span>Delete</span>
              </button>
            </ConfirmComponent>

            {/* Update */}
            <CreateCustomer customer={customer} isFrom />
          </div>
        )}
      </div>

      {/* Profile card */}
      <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 sm:p-6 gap-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* Avatar */}
          <div className="relative mx-auto sm:mx-0 shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-yellow-600/30 to-orange-600/30 border border-white/10 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold text-white">
                {initials}
              </span>
            </div>
            <span
              className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-[#1A1129] ${
                customer.verificationStatus === "VERIFIED"
                  ? "bg-emerald-400"
                  : "bg-yellow-400"
              }`}
            />
          </div>

          {/* Name, status, product */}
          <div className="text-center sm:text-left flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-white truncate">
              {customer.name}
            </h2>
            <p className="text-[#A1A1A1] text-sm mt-0.5 truncate">
              {customer.phoneNumber}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  verificationStyles[customer.verificationStatus] ??
                  "bg-white/10 text-white"
                }`}
              >
                {formatLabel(customer.verificationStatus)}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 truncate max-w-[180px]">
                {customer.interestedProduct}
              </span>
            </div>
          </div>

          <Link href={`/customers/${customer.id}/customer-history`}>
            <TriggeredButton name="See Hostory" varient="deep purple" />
          </Link>
        </div>
      </Card>

      {/* Details grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Contact info */}
        <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 gap-0">
          <div className="flex items-center gap-2 mb-1">
            <User size={15} className="text-[#A1A1A1]" />
            <h3 className="text-white text-sm font-semibold">Contact Info</h3>
          </div>
          <InfoRow icon={User} label="Full Name" value={customer.name} />
          <InfoRow
            icon={Phone}
            label="Phone Number"
            value={customer.phoneNumber}
          />
          <InfoRow icon={MapPin} label="Location" value={customer.location} />
        </Card>

        {/* Record info */}
        <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 gap-0">
          <div className="flex items-center gap-2 mb-1">
            <Package size={15} className="text-[#A1A1A1]" />
            <h3 className="text-white text-sm font-semibold">Record Info</h3>
          </div>
          <InfoRow
            icon={Package}
            label="Interested Product"
            value={customer.interestedProduct}
          />
          <InfoRow
            icon={ShieldCheck}
            label="Verification Status"
            value={formatLabel(customer.verificationStatus)}
          />
          {/* ID — small screens */}
          <div className="flex items-start gap-3 py-3 lg:hidden">
            <div className="mt-0.5 p-2 rounded-lg bg-white/5 shrink-0">
              <User size={14} className="text-[#A1A1A1]" />
            </div>
            <div className="min-w-0">
              <p className="text-[#A1A1A1] text-xs mb-0.5">Customer ID</p>
              <p className="text-white text-sm font-mono font-medium break-all">
                {customer.id}
              </p>
            </div>
          </div>
        </Card>

        {/* Collected by */}
        <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 gap-0">
          <div className="flex items-center gap-2 mb-1">
            <User size={15} className="text-[#A1A1A1]" />
            <h3 className="text-white text-sm font-semibold">Collected By</h3>
          </div>
          <InfoRow
            icon={User}
            label="Agent Name"
            value={customer.collectedBy?.fullName}
          />
          <InfoRow
            icon={Phone}
            label="Agent Phone"
            value={customer.collectedBy?.phoneNumber}
          />
          <InfoRow
            icon={User}
            label="Agent Email"
            value={customer.collectedBy?.email}
          />
        </Card>

        {/* Collection date */}
        <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 gap-0">
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={15} className="text-[#A1A1A1]" />
            <h3 className="text-white text-sm font-semibold">
              Collection Date
            </h3>
          </div>
          <InfoRow icon={Calendar} label="Date" value={collectedDate} />
          <InfoRow icon={Clock} label="Time" value={collectedTime} />
        </Card>

        {/* Created at */}
        <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 gap-0">
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={15} className="text-[#A1A1A1]" />
            <h3 className="text-white text-sm font-semibold">Created</h3>
          </div>
          <InfoRow icon={Calendar} label="Date" value={creationDate} />
          <InfoRow icon={Clock} label="Time" value={creationTime} />
        </Card>

        {/* Updated at */}
        <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 gap-0">
          <div className="flex items-center gap-2 mb-1">
            <RefreshCw size={15} className="text-[#A1A1A1]" />
            <h3 className="text-white text-sm font-semibold">Last Updated</h3>
          </div>
          <InfoRow icon={Calendar} label="Date" value={updatedDate} />
          <InfoRow icon={Clock} label="Time" value={updatedTime} />
        </Card>
      </div>
    </div>
  );
};

export default CustomerDetails;
