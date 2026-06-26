"use client";
import PageHeader from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { TUser } from "@/types/user.types";
import { convertDate } from "@/utills/dateConverter";
import { formatLabel } from "@/utills/formatLabel";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
  User,
} from "lucide-react";
import CreateUser from "../CreateUser";
import ResetPassword from "./ResetPassword";
import { InfoRow } from "./InRow";
import { useUser } from "@/provider/AuthProvider";

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  DISABLED: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const roleStyles: Record<string, string> = {
  SUPER_ADMIN: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  ADMIN: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  AGENT: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};

const UserDetails = ({ user }: { user: TUser }) => {
  const { creationDate, creationTime } = convertDate(new Date(user.createdAt));
  const { creationDate: updatedDate, creationTime: updatedTime } = convertDate(
    new Date(user.updatedAt),
  );

  const { user: userData } = useUser();

  const initials = user.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="User Details"
          description="View and manage user account information"
        />
        {(userData?.role == "SUPER_ADMIN" || userData?.role == "ADMIN") && (
          <div className="flex items-center gap-2 flex-wrap">
            <ResetPassword userId={user.id} />
            <CreateUser user={user} isFrom={true} path={`/users/${user?.id}`} />
          </div>
        )}
      </div>

      {/* Profile card */}
      <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 sm:p-6 gap-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* Avatar */}
          <div className="relative mx-auto sm:mx-0 shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-purple-600/40 to-blue-600/40 border border-white/10 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold text-white">
                {initials}
              </span>
            </div>
            <span
              className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-[#1A1129] ${
                user.status === "ACTIVE" ? "bg-emerald-400" : "bg-red-400"
              }`}
            />
          </div>

          {/* Name, role, status */}
          <div className="text-center sm:text-left flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-white truncate">
              {user.fullName}
            </h2>
            <p className="text-[#A1A1A1] text-sm mt-0.5 truncate">
              {user.email}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  roleStyles[user.role] ?? "bg-white/10 text-white"
                }`}
              >
                {user.role.replace("_", " ")}
              </span>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  statusStyles[user.status] ?? "bg-white/10 text-white"
                }`}
              >
                {formatLabel(user.status)}
              </span>
            </div>
          </div>

          {/* ID pill */}
          <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
            <p className="text-[#A1A1A1] text-xs">User ID</p>
            <p className="text-white/60 text-xs font-mono bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 max-w-[180px] truncate">
              {user.id}
            </p>
          </div>
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
          <InfoRow icon={Mail} label="Email Address" value={user.email} />
          <InfoRow icon={Phone} label="Phone Number" value={user.phoneNumber} />
          <InfoRow icon={User} label="Full Name" value={user.fullName} />
        </Card>

        {/* Account info */}
        <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 gap-0">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={15} className="text-[#A1A1A1]" />
            <h3 className="text-white text-sm font-semibold">Account Info</h3>
          </div>
          <InfoRow
            icon={ShieldCheck}
            label="Role"
            value={user.role.replace("_", " ")}
          />
          <InfoRow
            icon={ShieldCheck}
            label="Status"
            value={formatLabel(user.status)}
          />
          {/* ID — visible on small screens here */}
          <div className="flex items-start gap-3 py-3 lg:hidden">
            <div className="mt-0.5 p-2 rounded-lg bg-white/5 shrink-0">
              <User size={14} className="text-[#A1A1A1]" />
            </div>
            <div className="min-w-0">
              <p className="text-[#A1A1A1] text-xs mb-0.5">User ID</p>
              <p className="text-white text-sm font-mono font-medium break-all">
                {user.id}
              </p>
            </div>
          </div>
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

export default UserDetails;
