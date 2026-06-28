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
import { useUser } from "@/provider/AuthProvider";
import { exportCustomers } from "@/service/custoemer";
import { TAgent } from "@/types/agent.types";
import { TCustomer } from "@/types/customer.types";
import { TPagination } from "@/types/shared.types";
import { formatLabel } from "@/utills/formatLabel";
import { FileSpreadsheet, FileText, Loader2, Users2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { customerTableColumn } from "./AllCustomerColumn";
import CreateCustomer from "./CreateCustomer";

type TAllCustomerProps = {
  customers: TCustomer[];
  meta: TPagination;
  agents: TAgent[];
};

const AllCustomer = ({ customers, meta, agents }: TAllCustomerProps) => {
  const [exporting, setExporting] = useState<"csv" | "excel" | null>(null);
  const searchParams = useSearchParams();
  const { user } = useUser();
  const canExport = user?.role === "SUPER_ADMIN" || user?.role === "ADMIN";

  const {
    handleChange,
    show,
    setShow,
    currentPage,
    setCurrentPage,
    handleReset,
  } = useFilters();

  const handleExport = async (format: "csv" | "excel") => {
    setExporting(format);
    try {
      const result = await exportCustomers(format);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      const byteChars = atob(result.base64);
      const byteArr = new Uint8Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) {
        byteArr[i] = byteChars.charCodeAt(i);
      }
      const blob = new Blob([byteArr], { type: result.contentType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = result.filename;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Exported as ${format.toUpperCase()} successfully`);
    } catch {
      toast.error("Export failed. Please try again.");
    } finally {
      setExporting(null);
    }
  };

  const columns = customerTableColumn();

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row items-start sm:items-center sm:justify-between">
        <div className="flex items-start justify-between">
          <PageHeader
            title="Customers"
            description="Manage and view all collected customer records"
          />
          <div className="lg:hidden">
            <CreateCustomer />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {canExport && (
            <>
              <button
                onClick={() => handleExport("csv")}
                disabled={exporting !== null}
                className="relative cursor-pointer bg-white/5 rounded-2xl py-1.5 sm:py-2 flex items-center justify-center px-3 sm:px-4 overflow-hidden whitespace-nowrap border border-white/10 gap-2 text-sm text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exporting === "csv" ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <FileText size={15} className="text-emerald-400" />
                )}
                Export CSV
              </button>
              <button
                onClick={() => handleExport("excel")}
                disabled={exporting !== null}
                className="relative cursor-pointer bg-white/5 rounded-2xl py-1.5 sm:py-2 flex items-center justify-center px-3 sm:px-4 overflow-hidden whitespace-nowrap border border-white/10 gap-2 text-sm text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exporting === "excel" ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <FileSpreadsheet size={15} className="text-blue-400" />
                )}
                Export Excel
              </button>
            </>
          )}
          <div className="hidden lg:flex">
            <CreateCustomer />
          </div>
        </div>
      </div>

      <Card className="w-full effect p-2 gap-3">
        <div className="flex items-start justify-between">
          {/* Card header */}
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-[rgba(255,107,0,0.13)] effect-no-bg shrink-0">
              <Users2 className="text-[#FF6B00]" />
            </div>
            <div>
              <h1 className="text-[#FDFDFD] text-lg">All Customers</h1>
              <p className="text-[#B1B1B1] text-sm">
                {meta?.total ?? 0} total customers
              </p>
            </div>
          </div>
          <ButtonComponent
            buttonName="Reset"
            handleSubmit={() =>
              handleReset({ setLimit: setShow, setCurrPage: setCurrentPage })
            }
            varient="default"
            className="w-full lg:w-auto shrink-0"
          />
        </div>

        {/* Filters */}
          <div className="flex lg:flex-row items-end gap-3 flex-wrap w-full">
            {/* Name */}
            <Input
              defaultValue={searchParams.get("name") || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="search by name"
               className="w-36"
            />

            {/* Phone */}
            <Input
              defaultValue={searchParams.get("phoneNumber") || ""}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              placeholder="search by phone"
             className="w-36"
            />

            {/* Location */}
            <Input
              defaultValue={searchParams.get("location") || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="search by location"
             className="w-36"
            />

            {/* Interested product */}
            <Input
              defaultValue={searchParams.get("interestedProduct") || ""}
              onChange={(e) =>
                handleChange("interestedProduct", e.target.value)
              }
              placeholder="search by product"
            className="w-36"
            />

            {/* Verification status */}
            <Select
              value={searchParams.get("verificationStatus") || "all"}
              onValueChange={(value) =>
                handleChange("verificationStatus", value)
              }
            >
              <SelectTrigger className="cursor-pointer w-36">
                <SelectValue placeholder="Verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {(["PENDING", "VERIFIED"] as const).map((s) => (
                  <SelectItem key={s} value={s} className="cursor-pointer">
                    {formatLabel(s)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Collected by agent dropdown */}
            <Select
              value={searchParams.get("collectedById") || "all"}
              onValueChange={(value) => handleChange("collectedById", value)}
            >
              <SelectTrigger className="cursor-pointer w-36">
                <SelectValue placeholder="Collected by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                {agents.map((agent) => (
                  <SelectItem
                    key={agent.id}
                    value={agent.id}
                    className="cursor-pointer"
                  >
                    {agent.fullName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Start date */}
            <div className="flex flex-col gap-1 w-full lg:w-44">
              <label className="text-[#A1A1A1] text-xs px-1">Start Date</label>
              <Input
                type="date"
                defaultValue={searchParams.get("startDate") || ""}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="w-full"
              />
            </div>

            {/* End date */}
            <div className="flex flex-col gap-1 w-full lg:w-44">
              <label className="text-[#A1A1A1] text-xs px-1">End Date</label>
              <Input
                type="date"
                defaultValue={searchParams.get("endDate") || ""}
                onChange={(e) => handleChange("endDate", e.target.value)}
                className="w-full"
              />
            </div>
          </div>
       

        {/* Table */}
        <TableComponent
          data={customers}
          columns={columns}
          className="border-none text-sm"
          className2="border-b"
          className3="border-none my-2"
        />

        {/* Pagination */}
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

export default AllCustomer;
