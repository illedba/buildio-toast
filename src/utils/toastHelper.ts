/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SxProps } from "@mui/material";
import { ToastOptions, ToastPosition, ToastType } from "../types/toastTypes";

export interface ToastContextValue {
  toast: {
    (message: string, options?: ToastOptions): string;
    success: (message: string, options?: Omit<ToastOptions, "type">) => string;
    error: (message: string, options?: Omit<ToastOptions, "type">) => string;
    warning: (message: string, options?: Omit<ToastOptions, "type">) => string;
    info: (message: string, options?: Omit<ToastOptions, "type">) => string;
    loading: (message: string, options?: Omit<ToastOptions, "type">) => string;
    dismiss: (id: string) => void;
  };
}

export const positionStyles: Record<ToastPosition, SxProps> = {
  "top-right": { top: 20, right: 20 },
  "top-left": { top: 20, left: 20 },
  "bottom-right": { bottom: 20, right: 20 },
  "bottom-left": { bottom: 20, left: 20 },
  "top-center": { top: 20, left: "50%", transform: "translateX(-50%)" },
  "bottom-center": { bottom: 20, left: "50%", transform: "translateX(-50%)" },
};

export const MAX_TOASTS = 5;
export const DEFAULT_DURATION = 5000;

export const getToastColor = (
  type: ToastType,
  theme: any,
  customColor?: string
) => {
  if (customColor) return customColor;
  const colorMap = {
    success: theme.palette.success.main,
    error: theme.palette.error.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
    loading: theme.palette.primary.main,
  };

  return colorMap[type] || theme.palette.info.main;
};
