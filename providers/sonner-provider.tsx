"use client"

import { Toaster as SonnerToaster } from "sonner"

export function SonnerProvider() {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        style: {
          background: "white",
          color: "black",
          border: "1px solid #f3f4f6",
        },
        className: "font-sans",
      }}
      closeButton
      richColors
      expand
      duration={5000}
    />
  )
}
