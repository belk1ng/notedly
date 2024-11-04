import type { ComponentType } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts";

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
    element: <MainLayout />,
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
    path: "*",
    lazy: load(() => import("@/pages/not-found")),
  },
]);
