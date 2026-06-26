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
import { TCustomer } from "@/types/customer.types";
import { TPagination } from "@/types/shared.types";
import { formatLabel } from "@/utills/formatLabel";
import { FileSpreadsheet, FileText, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { customerTableColumn } from "./AllCustomerColumn";
import CreateCustomer from "./CreateCustomer";

type TAllCustomerProps = {
  customers: TCustomer[];
  meta: TPagination;
};

const AllCustomer = ({ customers, meta }: TAllCustomerProps) => {
  const [search, setSearch] = useState("");
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Customers"
          description="Manage and view all collected customer records"
        />
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
          <CreateCustomer />
        </div>
      </div>

      <Card className="w-full rounded-2xl effect p-2 gap-3">
        {/* Filters row */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between w-full">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center ">
            {/* Search */}
            <Input
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
                handleChange("search", value);
              }}
              placeholder="Search by name"
              className="w-full sm:w-48"
            />

            {/* Verification status filter */}
            <Select
              value={searchParams.get("verificationStatus") || "all"}
              onValueChange={(value) =>
                handleChange("verificationStatus", value)
              }
            >
              <SelectTrigger className="cursor-pointer w-full sm:w-44">
                <SelectValue placeholder="Filter by Status" />
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

            {/* Collected by (agent name search) */}
            <Input
              defaultValue={searchParams.get("collectedBy") || ""}
              onChange={(e) => handleChange("collectedBy", e.target.value)}
              placeholder="Filter by agent"
              className="w-full sm:w-44"
            />
          </div>

          <ButtonComponent
            buttonName="Reset"
            handleSubmit={() =>
              handleReset({ setLimit: setShow, setCurrPage: setCurrentPage })
            }
            varient="default"
            className="w-full sm:w-auto"
          />
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
