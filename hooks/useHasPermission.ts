import { useUser } from "@/provider/AuthProvider";

export const useHasPermission = (permission: string | string[]): boolean => {
  const { user } = useUser();
  if (user?.roles?.[0] === "Owner") {
    return true;
  }
  const userPermissions = user?.permissions ?? [];
  if (typeof permission === "string") {
    return userPermissions.includes(permission);
  }
  return permission.some((p) => userPermissions.includes(p));
};
