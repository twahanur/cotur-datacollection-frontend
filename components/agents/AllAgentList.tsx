"use client";
import useFilters from "@/hooks/useFilters";
import { TAgent } from "@/types/agent.types";
import { TPagination } from "@/types/shared.types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { agentTableColumn } from "./AgentTableColumn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import PageHeader from "../shared/PageHeader";
import CreateAgent from "./CreateAgent";
import ConfigureTarget from "./ConfigureTarget";
import { Users } from "lucide-react";
import { Input } from "../ui/input";
import { formatLabel } from "@/utills/formatLabel";
import ButtonComponent from "../ui/ButtonComponent";
import TableComponent from "../ui/CustomTableComponent";
import CustomPagination from "../ui/CustomPagination";

type TAgentProps = {
  agents: TAgent[];
  meta: TPagination;
};

const AllAgentList = ({ agents, meta }: TAgentProps) => {
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

  const column = agentTableColumn();
  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex items-center justify-between ">
        <PageHeader
          title="All agent list"
          description="Manage all agent and their details"
        />
        <CreateAgent />
      </div>

      <Card className=" w-full rounded-2xl effect p-2 gap-3">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-2xl relative bg-[rgba(255,107,0,0.13)] effect-no-bg`}
            >
              <Users className="text-[#FF6B00]" />
            </div>
            <div>
              <h1 className="text-[#FDFDFD] text-lg">All Agents</h1>
              <p className="text-[#B1B1B1] text-sm">
                {meta?.total} total agents
              </p>
            </div>
          </div>

          <ConfigureTarget agents={agents} />
        </div>

        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Input
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
                handleChange("search", value);
              }}
              placeholder="Search by name "
            />

            {/* Status Filter */}
            <Select
              value={searchParams.get("status") || "all"}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger className="cursor-pointer">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {["ACTIVE", "DISABLED"].map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                    className="cursor-pointer"
                  >
                    {formatLabel(status)}
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
          />
        </div>

        {/* content table */}
        <TableComponent
          data={agents}
          columns={column}
          className="border-none text-sm"
          className2="border-b"
          className3="border-none my-2"
        />

        <CustomPagination
          totalPage={meta?.totalPages}
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

export default AllAgentList;
