"use client";
import PageHeader from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { InfoRow } from "@/components/users/userDetails/InRow";
import { TAgentStat } from "@/types/agent.types";
import { formatLabel } from "@/utills/formatLabel";
import {
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { TargetCard } from "./TargetCard";

// ─── helpers ─────────────────────────────────────────────────────────────────
const statusStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  DISABLED: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const AgentStats = ({ agentStats }: { agentStats: TAgentStat }) => {
  const initials = agentStats.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* page header */}
      <PageHeader
        title="Agent Details"
        description="View agent profile, performance and targets"
      />

      {/* profile card */}
      <Card className="effect p-5 sm:p-6 gap-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* avatar */}
          <div className="relative mx-auto sm:mx-0 shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-blue-600/40 to-purple-600/40 border border-white/10 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold text-white">
                {initials}
              </span>
            </div>
            <span
              className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-[#1A1129] ${
                agentStats.status === "ACTIVE" ? "bg-emerald-400" : "bg-red-400"
              }`}
            />
          </div>

          {/* name, email, status */}
          <div className="text-center sm:text-left flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-white truncate">
              {agentStats.fullName}
            </h2>
            <p className="text-[#A1A1A1] text-sm mt-0.5 truncate">
              {agentStats.email}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  statusStyles[agentStats.status] ?? "bg-white/10 text-white"
                }`}
              >
                {formatLabel(agentStats.status)}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Agent
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={TrendingUp}
          label="Total Collected"
          value={agentStats.totalCollected}
          iconBg="bg-[rgba(255,107,0,0.13)]"
          iconColor="text-[#FF6B00]"
        />
        <StatCard
          icon={CheckCircle2}
          label="Total Verified"
          value={agentStats.totalVerified}
          iconBg="bg-emerald-500/10"
          iconColor="text-emerald-400"
        />
        <StatCard
          icon={Clock}
          label="Total Pending"
          value={agentStats.totalPending}
          iconBg="bg-yellow-500/10"
          iconColor="text-yellow-400"
        />
      </div>

      {/* contact info + agent ID (mobile) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="effect p-5 gap-0">
          <div className="flex items-center gap-2 mb-1">
            <User size={15} className="text-[#A1A1A1]" />
            <h3 className="text-white text-sm font-semibold">Contact Info</h3>
          </div>
          <InfoRow icon={User} label="Full Name" value={agentStats.fullName} />
          <InfoRow icon={Mail} label="Email" value={agentStats.email} />
          <InfoRow
            icon={Phone}
            label="Phone Number"
            value={agentStats.phoneNumber}
          />
          {/* agent ID on small screens */}
          <div className="flex items-start gap-3 py-3 lg:hidden">
            <div className="mt-0.5 p-2 rounded-lg bg-white/5 shrink-0">
              <User size={14} className="text-[#A1A1A1]" />
            </div>
            <div className="min-w-0">
              <p className="text-[#A1A1A1] text-xs mb-0.5">Agent ID</p>
              <p className="text-white text-sm font-mono font-medium break-all">
                {agentStats.agentId}
              </p>
            </div>
          </div>
        </Card>

        {/* performance summary */}
        <Card className="effect p-5 gap-0">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={15} className="text-[#A1A1A1]" />
            <h3 className="text-white text-sm font-semibold">
              Performance Summary
            </h3>
          </div>
          <InfoRow
            icon={TrendingUp}
            label="Total Collected"
            value={agentStats.totalCollected.toString()}
          />
          <InfoRow
            icon={CheckCircle2}
            label="Total Verified"
            value={agentStats.totalVerified.toString()}
          />
          <InfoRow
            icon={Clock}
            label="Total Pending"
            value={agentStats.totalPending.toString()}
          />
          {agentStats.totalCollected > 0 && (
            <div className="flex items-start gap-3 py-3">
              <div className="mt-0.5 p-2 rounded-lg bg-white/5 shrink-0">
                <CheckCircle2 size={14} className="text-[#A1A1A1]" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-[#A1A1A1] text-xs mb-1.5">
                  Verification Rate
                </p>
                <div className="h-1.5 w-full rounded-full bg-white/5">
                  <div
                    className="h-1.5 rounded-full bg-emerald-400 transition-all duration-500"
                    style={{
                      width: `${Math.round(
                        (agentStats.totalVerified / agentStats.totalCollected) *
                          100,
                      )}%`,
                    }}
                  />
                </div>
                <p className="text-white text-xs font-medium mt-1">
                  {Math.round(
                    (agentStats.totalVerified / agentStats.totalCollected) *
                      100,
                  )}
                  %
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* targets */}
      {agentStats.targets.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[rgba(255,107,0,0.13)] shrink-0">
              <Target size={15} className="text-[#FF6B00]" />
            </div>
            <h3 className="text-white text-sm font-semibold">
              Targets ({agentStats.targets.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {agentStats.targets.map((target, i) => (
              <TargetCard key={i} target={target} />
            ))}
          </div>
        </div>
      )}

      {agentStats.targets.length === 0 && (
        <Card className="effect p-8 gap-0">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="p-3 rounded-2xl bg-[rgba(255,107,0,0.13)]">
              <Target size={22} className="text-[#FF6B00]" />
            </div>
            <p className="text-white text-sm font-medium mt-1">
              No Targets Assigned
            </p>
            <p className="text-[#A1A1A1] text-xs max-w-xs">
              This agent has no configured targets yet. Use the Configure Target
              button to assign one.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AgentStats;
