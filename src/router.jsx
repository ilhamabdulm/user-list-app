import { lazy, useEffect, useMemo } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import AuthLayout from "./components/layout/auth.layout";
import MobileViewLayout from "./components/layout/mobile-view.layout";

import { useAuthStore } from "./store/auth.context";
import { getToken } from "./utils/storages";
import MainLayout from "./components/layout/main.layout";
import NotFoundOrganism from "./components/organism/not-found";

const authRoutes = [
  {
    path: "",
    component: lazy(() => import("@/pages/signin")),
    name: "sign in",
  },
];

const homeRoutes = [
  {
    path: "",
    name: "user list",
    component: lazy(() => import("@/pages/private/users")),
  },
  {
    path: ":id",
    name: "user detail",
    component: lazy(() => import("@/pages/private/user-detail")),
  },
];

const PrivateLayout = () => {
  const { handleSignIn, handleSignOut } = useAuthStore();

  const token = useMemo(() => {
    return getToken();
  }, []);

  useEffect(() => {
    if (!token) return handleSignOut();
  }, [token]);

  return token ? <Outlet /> : <Navigate to="/" replace={true} />;
};

const MainRouter = () => {
  return (
    <Routes>
      <Route element={<MobileViewLayout />}>
        <Route path="/" element={<AuthLayout />}>
          {authRoutes.map((route) => {
            const Element = route.component;

            return (
              <Route key={route.name} path={route.path} element={<Element />} />
            );
          })}
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="users" element={<MainLayout />}>
            {homeRoutes.map((route) => {
              const Element = route.component;

              return (
                <Route
                  key={route.name}
                  path={route.path}
                  element={<Element />}
                  index={route.index || false}
                />
              );
            })}
          </Route>
        </Route>

        <Route path="*" element={<NotFoundOrganism />}></Route>
      </Route>
    </Routes>
  );
};

export default MainRouter;
