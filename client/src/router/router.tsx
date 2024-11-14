import type { ComponentType } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts";
import { ProtectedRoute, PublicRoute } from "@/router/components";
import { paths } from "@/router/paths";

function load<ExportValue extends { default: ComponentType | null }>(
  loader: () => Promise<ExportValue>,
): () => Promise<{ Component: ComponentType | null }> {
  return async () => {
    const { default: Component } = await loader();
    return { Component };
  };
}

export const router = createBrowserRouter([
  {
    path: paths.root,
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        element: <Navigate to={paths.home.root} replace />,
        index: true,
      },
      {
        path: paths.home.root,
        lazy: load(() => import("@/pages/home")),
      },
      {
        path: paths.home.detail.path,
        lazy: load(() => import("@/pages/home")),
      },
      {
        path: paths.notes,
        lazy: load(() => import("@/pages/notes")),
      },
      {
        path: paths.favorites,
        lazy: load(() => import("@/pages/favorites")),
      },
    ],
  },
  {
    path: paths.auth.root,
    element: <PublicRoute />,
    children: [
      {
        element: <Navigate to={paths.auth.login} replace />,
        index: true,
      },
      {
        path: paths.auth.login,
        lazy: load(() => import("@/pages/login")),
      },
      {
        path: paths.auth.register,
        lazy: load(() => import("@/pages/register")),
      },
    ],
  },
  {
    path: "*",
    lazy: load(() => import("@/pages/not-found")),
  },
]);
