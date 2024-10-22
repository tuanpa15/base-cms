import Header from "components/header";
import SideNav from "components/side-nav";
import useProtectedAuth from "helper/hooks/useProtectedAuth";
import useSetProfile from "helper/hooks/useSetProfile";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import useBounceStore from "store/bounceStore";
import { cn } from "utils/cn";

const AuthProvider = () => {
  const collapsed = useBounceStore((state) => state.collapsed);
  useSetProfile();
  useProtectedAuth();
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen">
      <SideNav />
      <div>
        <Header />
        <main
          className={cn(
            "p-4 bg-grey h-content transition-all",
            collapsed ? "max-w-[100vw]" : "max-w-[calc(100vw-200px)]"
          )}
        >
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AuthProvider;
