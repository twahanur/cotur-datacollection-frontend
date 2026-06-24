import { headers } from "next/headers";

export const getTenantSlug = async () => {
  const headersList = await headers();
  const host = headersList.get("host");
  if (!host) return null;
  const hostname = host.split(":")[0];
  const parts = hostname.split(".");
  if (hostname.includes("localhost")) {
    return parts[0] !== "localhost" ? parts[0] : null;
  }
  if (parts.length > 2) {
    return parts[0];
  }
  return null;
};
