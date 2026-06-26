"use server";

import { Query } from "@/types/shared.types";
import {
  createData,
  deleteData,
  patchData,
  readData,
} from "../apiService/crud";
import { TUserForm } from "@/components/users/CreateUser";

type TUpdateProfileProps = {
  id: string;
  data: Partial<TUserForm>;
  path?: string;
};


export const getAllUsers = async (query?: Query) => {
  const res = await readData(`/users`, ["user"], query);
  return res;
};

export const getUserById = async (id: string) => {
  const res = await readData(`/users/${id}`, ["user"]);
  return res;
};

export const createUser = async (data: TUserForm) => {
  const res = await createData<TUserForm>(
    "/users",
    "/users",
    data,
  );
  return res;
};

export const updateUser = async ({
  id,
  data,
  path = "/users",
}: TUpdateProfileProps) => {
  const res = await patchData<Partial<TUserForm>>(`/users/${id}`, path, data);
  return res;
};

export const deleteUser = async (id: string) => {
  const res = await deleteData(
    `/users/${id}`,
    "/dashboard/settings/user-management",
  );
  return res;
};
