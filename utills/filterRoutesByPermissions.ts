import { NavRoute } from "@/constants/navigationRoute";
import { TRole } from "@/types/user.types";

type TFilterRoutes = {
  routes: NavRoute[];
  role: string;
};

export const filterRoutesByRole = ({
  routes,
  role,
}: TFilterRoutes): NavRoute[] => {
  return routes
    .map((route) => {
      if (route.children?.length) {
        const children = filterRoutesByRole({
          routes: route.children,
          role,
        });

        if (children.length) {
          return {
            ...route,
            children,
          };
        }
      }

      if (!route.roles) return route;

      return route.roles.includes(role as TRole) ? route : null;
    })
    .filter(Boolean) as NavRoute[];
};

import { navigationROute } from "@/constants/navigationRoute";

export const getRestrictedRoutesForRole = (role: TRole) => {
  const restricted: string[] = [];
  const walk = (routes: NavRoute[]) => {
    for (const route of routes) {
      if (route.path && route.roles && !route.roles.includes(role)) {
        restricted.push(route.path);
      }

      if (route.children) {
        walk(route.children);
      }
    }
  };

  walk(navigationROute);

  return restricted;
};
