import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";

import { getToken } from "@/utils/storages";

import Loading from "../molecules/loading";
import { HiLogout } from "react-icons/hi";
import { logoutUser } from "@/services/auth";
import { usePageTitleStore } from "@/store/page-title.context";

const MainLayout = () => {
  const token = getToken();

  const { state } = usePageTitleStore();

  return token ? (
    <Suspense fallback={<Loading />}>
      <header className="px-6 py-6 flex items-center justify-between">
        <h1 className="font-semibold text-4xl p-0 m-0 text-g-800">
          {state.pageTitle}
        </h1>
        <div>
          <button
            className="flex items-center gap-2 text-danger-300 border border-transparent hover:border-danger-300 p-2"
            onClick={() => {
              logoutUser();
            }}
          >
            <HiLogout /> Logout
          </button>
        </div>
      </header>
      <section className="h-full px-6 pt-2 pb-10">
        <Outlet />
      </section>
    </Suspense>
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default MainLayout;
