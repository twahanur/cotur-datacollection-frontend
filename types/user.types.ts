export type TRole = "SUPER_ADMIN" | "ADMIN" | "AGENT";
export type TStatus = "ACTIVE" | "DISABLED";

export type TUser = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: TRole;
  status: TStatus;
  createdAt: string;
  updatedAt: string;
};
