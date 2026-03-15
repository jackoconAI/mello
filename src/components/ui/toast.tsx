"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "0.75rem",
          border: "1px solid #d6d8d7",
          fontSize: "0.875rem",
        },
      }}
    />
  );
}
