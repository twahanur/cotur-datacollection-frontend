/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Query } from "@/types/shared.types";
import { createData, deleteData, patchData, readData, uploadFile } from "../apiService/crud";


export async function getAllCustomer(query?: Query) {
  const res = await readData("/customers", ["Customers"], query);
  return res;
}

export async function getCustomerPurchaseHistory(id: string) {
  const res = await readData(`/customers/${id}/purchases`, ["Customer"]);
  return res;
}

export async function getCustomerById(id: string) {
  const res = await readData(`/customers/${id}`, ["Customer-history"]);
  return res;
}

export async function getCustomerByCustomId(id: number) {
  const res = await readData(`/customers/custom/${id}`, ["Customers"]);
  return res;
}

export async function getUnAssignedCustomer(query?: Query) {
  const res = await readData("/customers/unassigned", ["Customers"], query);
  return res;
}

export async function getCustomerPurchaseHistiory(id: number) {
  const res = await readData(`/customers/${id}/purchases`, [
    "Purchase-history",
  ]);
  return res;
}

export const createCustomer = async (data: any) => {
  try {
    const result = await createData<any>(
      `/customers`,
      "/dashboard/admin/leads",
      data as any,
    );
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateCustomerData = async (
  id: number,
  data: Partial<any>,
) => {
  const res = await patchData<Partial<any>>(
    `/customers/${id}`,
    `/dashboard/admin/customers/${id}`,
    data,
  );
  return res;
};

export const  deleteCustomer = async (
  id: string,
  revalidate = "/dashboard/admin/customers",
) => {
  const res = await deleteData(`/customers/${id}`, revalidate);
  return res;
};

export const customerBulkUpload = async (formData: FormData) => {
  const res = await uploadFile(
    "/csv/upload",
    "/dashboard/admin/import-logs",
    formData,
  );
  return res;
};

export const customerOverview = async (query: Query) => {
  const res = await readData("/customers/analytics/lead-overview", [""], query);
  return res;
};

export const customerSourceRatio = async (query: Query) => {
  const res = await readData(
    "/customers/analytics/lead-source-ratio",
    ["leadSourceRatio"],
    query,
  );
  return res;
};

export const customerConversionFunnel = async (query: Query) => {
  const res = await readData(
    "/customers/analytics/lead-conversion-funnel",
    ["leadSourceRatio"],
    query,
  );
  return res;
};

export const getUnassignedCustomers = async (query: Query) => {
  const res = await readData(
    "/customers/unassigned",
    ["unassigned-customer"],
    query,
  );
  return res;
};


// -------------------------- reassigin leads --------------------------
export async function getUncalledLeads(query: Query) {
  const res = await readData(
    "/allocations/admin/uncalled-leads",
    ["uncalled-leads"],
    query,
  );
  return res;
} 