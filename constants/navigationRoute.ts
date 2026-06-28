import { TRole } from "@/types/user.types";
import {
  Activity,
  House,
  LucideIcon,
  Target,
  UserRoundCheck,
  Users,
  UsersRound,
} from "lucide-react";

export interface NavRoute {
  title: string;
  path?: string;
  icon?: LucideIcon;
  roles?: TRole[];
  children?: NavRoute[];
  group?: string;
}

export const navigationROute: NavRoute[] = [
  {
    title: "Home",
    icon: House,
    path: "/",
    roles: ["SUPER_ADMIN", "ADMIN", "AGENT"],
  },
  {
    title: "Users",
    icon: Users,
    path: "/users",
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    title: "Agents",
    icon: UsersRound,
    path: "/agents",
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    title: "Customers",
    icon: UserRoundCheck,
    path: "/customers",
    roles: ["SUPER_ADMIN", "ADMIN", "AGENT"],
  },
  {
    title: "Targets",
    icon: Target,
    path: "/targets",
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    title: "Activity Log",
    icon: Activity,
    path: "/activity-log",
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
];
