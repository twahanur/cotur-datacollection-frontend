
import { navigationROute, NavRoute } from "@/constants/navigationRoute";

export type PermissionRoute = {
  path: string;
  pattern: RegExp;
  permissions?: string[];
  ownerOnly?: boolean;
};

export const hasPermission = (
  userPermissions: string[] = [],
  requiredPermissions: string[] = [],
) => {
  const safeUserPermissions = Array.isArray(userPermissions)
    ? userPermissions
    : [];

  const safeRequiredPermissions = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [];
  const hasPermission = safeRequiredPermissions.some((p) => safeUserPermissions.includes(p))
  return hasPermission;
};

export const extractPermissionRoutes = (
  routes: NavRoute[],
  result: PermissionRoute[] = [],
) => {
  // Ensure routes is an array
  if (!Array.isArray(routes)) {
    return result;
  }

  routes.forEach((route) => {
    if (route?.path) {
      result.push({
        path: route.path,
        pattern: new RegExp(`^${route.path}`),
        permissions: route?.permissions ?? [],
        ownerOnly: route?.ownerOnly ?? false,
      });
    }
    if (route?.children && Array.isArray(route.children)) {
      extractPermissionRoutes(route.children, result);
    }
  });
  return result;
};

export const permissionBasedRoutes = [
  ...extractPermissionRoutes(navigationROute),
].sort((a, b) => b.pattern.source.length - a.pattern.source.length);