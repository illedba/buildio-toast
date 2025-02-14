import { createContext } from "react";
import { ToastContextValue } from "../utils/toastHelper";

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined
);
