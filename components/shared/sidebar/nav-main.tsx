"use client";
import { SidebarGroup } from "@/components/ui/sidebar";
import CoreManagement from "./sidebarRoutes/CoreManagement";
import { useUser } from "@/provider/AuthProvider";
import { filterRoutesByPermissions } from "@/utills/filterRoutesByPermissions";
import { navigationROute, NavRoute } from "@/constants/navigationRoute";

export function NavMain() {
  const { user } = useUser();
  const role = user?.role as string;
  const permissions = (user?.permissions as string[]) || [];
  const groupedRoutes = navigationROute.reduce(
    (acc, route) => {
      const key = route?.group || "Others";
      if (!acc[key]) acc[key] = [];
      acc[key].push(route);
      return acc;
    },
    {} as Record<string, NavRoute[]>,
  );

  return (
    <SidebarGroup>
      <div className="space-y-3">
        {Object.entries(groupedRoutes).map(([groupName, routes], i) => {
          const visibleRoutes = filterRoutesByPermissions({
            routes,
            permissions,
            role,
          });

          return (
            <CoreManagement
              key={i}
              sidebarRoutes={visibleRoutes}
              platform={groupName}
            />
          );
        })}
      </div>
    </SidebarGroup>
  );
}
