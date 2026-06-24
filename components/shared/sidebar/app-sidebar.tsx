/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import SidebarButtonEffect from "./buttons/ItemButton";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { logout } from "@/service/authService";
import { useUser } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { setUser, setIsLoading } = useUser();
  const router = useRouter();

  const handleLogOut = async () => {
    const toastId = toast.loading("logging out", { duration: 3000 });
    try {
      const res = await logout();
      if (res?.success) {
        setIsLoading(true);
        setUser(null);
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/login");
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col flex-1 min-h-0 space-y-6">
          <SidebarHeader>
            <TeamSwitcher name={"Chotur"} plan="Customer" />
            <div className="border border-dashed border-[rgba(255,177,63,0.50)]" />
          </SidebarHeader>

          <div className="flex-1 min-h-0 ">
            <CustomScrollbar className="h-full ">
              <SidebarContent>
                <NavMain />
              </SidebarContent>
            </CustomScrollbar>
          </div>
        </div>

        <SidebarFooter className="gap-0">
          <SidebarMenuButton tooltip={"Logout"} asChild className=" px-0 ">
            <button
              onClick={handleLogOut}
              className="w-full text-left cursor-pointer"
            >
              <SidebarButtonEffect>
                <div className="relative z-10 flex w-full items-center justify-between px-4 group-data-[collapsible=icon]:p-2 py-1.5">
                  <p className="flex items-center gap-2">
                    <span>
                      <LogOut size={16} />
                    </span>
                    <span className="text-red-600">Logout</span>
                  </p>
                </div>
              </SidebarButtonEffect>
            </button>
          </SidebarMenuButton>
          <SidebarMenuItem key={"logout"} className="w-full"></SidebarMenuItem>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
