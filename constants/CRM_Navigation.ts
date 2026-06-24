import { CircleUserRound, LucideIcon } from "lucide-react";

export interface NavRoute {
  title: string;
  path?: string;
  icon?: LucideIcon;
  ownerOnly?: boolean;
  permissions?: string[];
  children?: NavRoute[];
  group?: string;
}

export const crmRoutes: NavRoute[] = [
  {
    title: "Profile",
    icon: CircleUserRound,
    path: "/dashboard/profile",
  },
];
