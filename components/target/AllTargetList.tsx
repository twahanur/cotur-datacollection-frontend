"use client";

import PageHeader from "@/components/shared/PageHeader";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Card } from "@/components/ui/card";
import CustomPagination from "@/components/ui/CustomPagination";
import TableComponent from "@/components/ui/CustomTableComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfigureTarget from "@/components/agents/ConfigureTarget";
import useFilters from "@/hooks/useFilters";
import { TAgent } from "@/types/agent.types";
import { TPagination } from "@/types/shared.types";
import { TTarget, TTargetPeriod, TTargetType } from "@/types/target.types";
import { formatLabel } from "@/utills/formatLabel";
import { Target } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { allTargetColumns } from "./AllTargetColumn";
import { useUser } from "@/provider/AuthProvider";

type TAllTargetListProps = {
  targets: TTarget[];
  meta: TPagination;
  agents: TAgent[];
};

const AllTargetList = ({ targets, meta, agents }: TAllTargetListProps) => {
  const searchParams = useSearchParams();
  const { user } = useUser();

  const {
    handleChange,
    show,
    setShow,
    currentPage,
    setCurrentPage,
    handleReset,
  } = useFilters();

  const column = allTargetColumns();

  return (
    <div className="space-y-4">
      {/* page header */}
      <div className="flex flex-row items-start sm:items-center justify-between">
        <PageHeader
          title="Targets"
          description="Manage and view all configured collection targets"
        />
        {(user?.role == "SUPER_ADMIN" || user?.role == "ADMIN") && (
          <ConfigureTarget agents={agents} />
        )}
      </div>

      <Card className="w-full rounded-2xl effect p-2 gap-3">
        {/* card header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[rgba(255,107,0,0.13)] effect-no-bg shrink-0">
            <Target className="text-[#FF6B00]" />
          </div>
          <div>
            <h1 className="text-[#FDFDFD] text-lg">All Targets</h1>
            <p className="text-[#B1B1B1] text-sm">
              {meta?.total ?? 0} total targets
            </p>
          </div>
        </div>

        {/* filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap">
            {/* filter by type */}
            <Select
              value={searchParams.get("type") || "all"}
              onValueChange={(value) => handleChange("type", value)}
            >
              <SelectTrigger className="cursor-pointer w-full sm:w-40">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {(["GLOBAL", "INDIVIDUAL"] as TTargetType[]).map((t) => (
                  <SelectItem key={t} value={t} className="cursor-pointer">
                    {formatLabel(t)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* filter by period */}
            <Select
              value={searchParams.get("period") || "all"}
              onValueChange={(value) => handleChange("period", value)}
            >
              <SelectTrigger className="cursor-pointer w-full sm:w-44">
                <SelectValue placeholder="Filter by Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Periods</SelectItem>
                {(
                  [
                    "DAILY",
                    "WEEKLY",
                    "MONTHLY",
                    "SPECIFIC_DATE",
                  ] as TTargetPeriod[]
                ).map((p) => (
                  <SelectItem key={p} value={p} className="cursor-pointer">
                    {p === "SPECIFIC_DATE" ? "Specific Date" : formatLabel(p)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ButtonComponent
            buttonName="Reset"
            handleSubmit={() =>
              handleReset({ setLimit: setShow, setCurrPage: setCurrentPage })
            }
            varient="default"
            className="w-full sm:w-auto shrink-0"
          />
        </div>

        {/* table */}
        <TableComponent
          data={targets}
          columns={column}
          className="border-none text-sm"
          className2="border-b"
          className3="border-none my-2"
        />

        {/* pagination */}
        <CustomPagination
          totalPage={meta?.totalPages}
          totalItems={meta?.total}
          show={show}
          currentPage={currentPage}
          setShow={setShow}
          setCurrentPage={setCurrentPage}
          handleChange={handleChange}
        />
      </Card>
    </div>
  );
};

export default AllTargetList;
