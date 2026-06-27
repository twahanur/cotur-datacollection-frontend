"use client";

import PageHeader from "@/components/shared/PageHeader";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Card } from "@/components/ui/card";
import CustomPagination from "@/components/ui/CustomPagination";
import TableComponent from "@/components/ui/CustomTableComponent";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFilters from "@/hooks/useFilters";
import { TActivityLog } from "@/types/activityLog.types";
import { TPagination } from "@/types/shared.types";
import { formatLabel } from "@/utills/formatLabel";
import { Activity } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { activityLogColumns } from "./ActivityLogColumn";

type TActivityLogProps = {
  activityLogs: TActivityLog[];
  meta: TPagination;
};

const ActivityLog = ({ activityLogs, meta }: TActivityLogProps) => {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();

  const {
    handleChange,
    show,
    setShow,
    currentPage,
    setCurrentPage,
    handleReset,
  } = useFilters();

  const column = activityLogColumns();

  return (
    <div className="space-y-4">
      {/* header */}
      <PageHeader
        title="Activity Log"
        description="Track all user actions and system events"
      />

      <Card className="w-full rounded-2xl effect p-2 gap-3">
        {/* card header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[rgba(255,107,0,0.13)] effect-no-bg shrink-0">
            <Activity className="text-[#FF6B00]" />
          </div>
          <div>
            <h1 className="text-[#FDFDFD] text-lg">All Activity</h1>
            <p className="text-[#B1B1B1] text-sm">
              {meta?.total ?? 0} total events
            </p>
          </div>
        </div>

        {/* filters */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center ">
            {/* search by user */}
            <Input
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
                handleChange("search", value);
              }}
              placeholder="Search by user"
              className="w-full sm:w-44"
            />

            {/* filter by module */}
            <Input
              defaultValue={searchParams.get("module") || ""}
              onChange={(e) => handleChange("module", e.target.value)}
              placeholder="Filter by module"
              className="w-full sm:w-44"
            />

            {/* filter by role */}
            <Select
              value={searchParams.get("role") || "all"}
              onValueChange={(value) => handleChange("role", value)}
            >
              <SelectTrigger className="cursor-pointer w-full sm:w-40">
                <SelectValue placeholder="Filter by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {(["SUPER_ADMIN", "ADMIN", "AGENT"] as const).map((r) => (
                  <SelectItem key={r} value={r} className="cursor-pointer">
                    {formatLabel(r)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* filter by action */}
            <Input
              defaultValue={searchParams.get("action") || ""}
              onChange={(e) => handleChange("action", e.target.value)}
              placeholder="Filter by action"
              className="w-full sm:w-44"
            />
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
          data={activityLogs}
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

export default ActivityLog;
