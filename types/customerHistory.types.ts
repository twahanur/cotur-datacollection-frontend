import { TRole } from "./user.types";

export type TUpdatedBy = {
  id: string;
  fullName: string;
  email: string;
  role: TRole;
};

type DynamicData = Record<string, string>;
export type TCustomerHistory = {
  id: string;
  customerId: string;
  updatedById: string;
  newValues: DynamicData;
  oldValues: DynamicData;
  updatedAt: string;
  updatedBy: TUpdatedBy;
};
