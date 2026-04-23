import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <SpeedInsights />
  </StrictMode>
);
