import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";

import { getToken } from "@/utils/storages";

import Loading from "../molecules/loading";

const AuthLayout = () => {
  const token = getToken();

  return !token ? (
    <Suspense fallback={<Loading />}>
      <section className="h-screen bg-white px-6 py-8 flex items-center justify-center flex-col">
        <Outlet />
      </section>
    </Suspense>
  ) : (
    <Navigate to="/users" replace={true} />
  );
};

export default AuthLayout;
