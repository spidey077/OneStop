"use client";
import { Toaster, useToasterStore, toast } from "react-hot-toast";
import { useEffect } from "react";

export default function ToastProvider() {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= 2)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return <Toaster position="top-center" />;
}
