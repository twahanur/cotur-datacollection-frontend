import { Contact, House, LucideIcon, UserRoundCheck, Users, UsersRound } from "lucide-react";

export interface NavRoute {
  title: string;
  path?: string;
  icon?: LucideIcon;
  ownerOnly?: boolean;
  permissions?: string[];
  children?: NavRoute[];
  group?: string;
}

export const navigationROute: NavRoute[] = [
  {
    title: "Home",
    icon: House,
    path: "/",
  },
  {
    title: "Users",
    icon: Users,
    path: "/users",
  },
  {
    title: "Agents",
    icon: UsersRound,
    path: "/agents",
  },
  {
    title: "Customers",
    icon: UserRoundCheck,
    path: "/customers",
  },
];
