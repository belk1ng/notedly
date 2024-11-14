import type { ComponentType } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts";
import { ProtectedRoute, PublicRoute } from "@/router/components";

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
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        element: <Navigate to={"/home"} replace />,
        index: true,
      },
      {
        path: "/home",
        lazy: load(() => import("@/pages/home")),
      },
      {
        path: "/home/:noteId",
        lazy: load(() => import("@/pages/home")),
      },
      {
        path: "/notes",
        lazy: load(() => import("@/pages/notes")),
      },
      {
        path: "/favorites",
        lazy: load(() => import("@/pages/favorites")),
      },
    ],
  },
  {
    path: "/auth/",
    element: <PublicRoute />,
    children: [
      {
        element: <Navigate to={"/auth/login"} replace />,
        index: true,
      },
      {
        path: "login",
        lazy: load(() => import("@/pages/login")),
      },
      {
        path: "register",
        lazy: load(() => import("@/pages/register")),
      },
    ],
  },
  {
    path: "*",
    lazy: load(() => import("@/pages/not-found")),
  },
]);
