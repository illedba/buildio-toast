import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import { ToastContextValue } from "../utils/toastHelper";

export const useBuildioToast = (): ToastContextValue["toast"] => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context.toast;
};
