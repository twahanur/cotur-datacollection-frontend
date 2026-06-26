export const matchRoute = (pathname: string, route: string) => {
  if (!pathname || !route) return false;

  // Home route strict match
  if (route === "/") return pathname === "/";

  // Other routes
  if (!pathname.startsWith(route)) return false;

  return pathname === route || pathname.startsWith(route + "/");
};