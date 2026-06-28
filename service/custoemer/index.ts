/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Query } from "@/types/shared.types";
import {
  createData,
  deleteData,
  patchData,
  readData,
} from "../apiService/crud";
import { getValidToken } from "../authService/validToken";
import { config } from "@/config";
import { TCreateCustomerForm } from "@/components/customer/CreateCustomer";

export type TSendOtpData = { phoneNumber: string };
type TUpdateCustomerData = {
  id: string;
  data: Partial<TCreateCustomerForm>;
  path?: string;
};

export async function getAllCustomer(query?: Query) {
  const res = await readData("/customers", ["Customers"], query);
  return res;
}

export async function getCustomerById(id: string) {
  const res = await readData(`/customers/${id}`, ["Customers"]);
  return res;
}

export const createCustomer = async (data: TCreateCustomerForm) => {
  try {
    const result = await createData<TCreateCustomerForm>(
      `/customers/verify-create`,
      "/customers",
      data,
    );
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const sendOtp = async (data: TSendOtpData) => {
  try {
    const result = await createData<TSendOtpData>(
      `/customers/send-otp`,
      "/customers",
      data,
    );
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateCustomer = async ({
  id,
  data,
  path = "/customers",
}: TUpdateCustomerData) => {
  const res = await patchData<Partial<TCreateCustomerForm>>(
    `/customers/${id}`,
    path,
    data,
  );
  return res;
};

export const deleteCustomer = async (id: string, revalidate = "/customers") => {
  const res = await deleteData(`/customers/${id}`, revalidate);
  return res;
};

export async function getCustomerHistory(id: string) {
  const res = await readData(`/customer-histories/${id}`, ["Customers-history"]);
  return res;
}

export const exportCustomers = async (
  format: "csv" | "excel",
  query?: Record<string, string>,
): Promise<{ base64: string; contentType: string; filename: string } | { error: string }> => {
  const token = await getValidToken();
  try {
    const params = new URLSearchParams();
    if (query) {
      Object.entries(query).forEach(([k, v]) => {
        if (v) params.set(k, v);
      });
    }
    const qs = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(
      `${config.next_public_base_api}/export/${format}${qs}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (!res.ok) {
      return { error: `Export failed with status ${res.status}` };
    }
    const contentType = res.headers.get("content-type") ?? (format === "csv" ? "text/csv" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    const disposition = res.headers.get("content-disposition") ?? "";
    const match = disposition.match(/filename[^;=\n]*=([^;\n]*)/);
    const filename = match ? match[1].replace(/["']/g, "").trim() : `customers.${format === "csv" ? "csv" : "xlsx"}`;
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    return { base64, contentType, filename };
  } catch (error: any) {
    return { error: error?.message ?? "Export failed" };
  }
};
