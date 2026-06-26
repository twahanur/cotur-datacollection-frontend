/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Query } from "@/types/shared.types";
import {
  createData,
  deleteData,
  patchData,
  readData,
} from "../apiService/crud";
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
  const res = await readData(`/customers/${id}`, ["Customer-history"]);
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

export const deleteCustomer = async (
  id: string,
  revalidate = "/customers",
) => {
  const res = await deleteData(`/customers/${id}`, revalidate);
  return res;
};
