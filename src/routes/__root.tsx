import { Navbar } from "@/components/navbar";
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";

function RootLayout() {
  const location = useLocation();
  const isRoot = location.pathname === "/";

  return (
    <>
      {!isRoot && <Navbar />}
      <Outlet />
    </>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
