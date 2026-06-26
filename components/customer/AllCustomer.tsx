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
import { TCustomer } from "@/types/customer.types";
import { TPagination } from "@/types/shared.types";
import { formatLabel } from "@/utills/formatLabel";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { customerTableColumn } from "./AllCustomerColumn";
import CreateCustomer from "./CreateCustomer";

type TAllCustomerProps = {
  customers: TCustomer[];
  meta: TPagination;
};

const AllCustomer = ({ customers, meta }: TAllCustomerProps) => {
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

  const columns = customerTableColumn();

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Customers"
          description="Manage and view all collected customer records"
        />
        <CreateCustomer />
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
