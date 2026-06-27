import { TRole } from "./user.types";

export type TUser = {
  id: string;
  fullName: string;
  email: string;
  role: TRole;
};

export type TMetadata = { email: string };

export type TActivityLog = {
  id: string;
  action: string;
  ipAddress: string;
  metadata: TMetadata;
  module: string;
  role: TRole;
  user: TUser;
  userAgent: string;
  userId: string;
  userName: string;
  createdAt: string;
};
