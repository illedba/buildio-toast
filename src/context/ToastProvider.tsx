import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import {
  DEFAULT_DURATION,
  MAX_TOASTS,
  ToastContextValue,
} from "../utils/toastHelper";
import { ToastContext } from "../context/ToastContext";
import ToastContainer from "../components/ToastContainer";
import {
  ToastPosition,
  Toast,
  ToastOptions,
  ToastType,
} from "../types/toastTypes";
import { v4 as uuidv4 } from "uuid";

export const ToastProvider = ({
  children,
  position = "bottom-right",
}: {
  children: ReactNode;
  position?: ToastPosition;
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef(new Map<string, number>());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    timers.current.delete(id);
  }, []);

  const addToast = useCallback(
    (message: string, options: ToastOptions = {}): string => {
      const id = options.id || uuidv4();
      const isUpdate = !!options.id;
      const type: ToastType = options.type || "info";
      const duration =
        type === "loading" ? Infinity : options.duration || DEFAULT_DURATION;

      setToasts((prev) => {
        if (isUpdate) {
          return prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  message,
                  type,
                  color: options.color || t.color,
                  duration,
                  icon: options.icon || t.icon,
                  transition: options.transition || t.transition,
                  hideClose: options.hideClose ?? t.hideClose,
                }
              : t
          );
        }
        return [
          ...prev.slice(-(MAX_TOASTS - 1)),
          {
            id,
            message,
            type,
            color: options.color,
            duration,
            icon: options.icon,
            transition: options.transition || "slide",
            hideClose: options.hideClose ?? false,
          },
        ];
      });

      if (isUpdate) {
        const oldTimer = timers.current.get(id);
        if (oldTimer) window.clearTimeout(oldTimer);
      }

      if (type !== "loading" && duration !== Infinity) {
        const timer = window.setTimeout(() => removeToast(id), duration);
        timers.current.set(id, timer);
      }

      return id;
    },
    [removeToast]
  );

  const toastAPI = useMemo((): ToastContextValue["toast"] => {
    const base = ((message: string, options?: ToastOptions) => {
      return addToast(message, options);
    }) as unknown as ToastContextValue["toast"];

    base.success = (message: string, options?: Omit<ToastOptions, "type">) =>
      addToast(message, { ...options, type: "success" });

    base.error = (message: string, options?: Omit<ToastOptions, "type">) =>
      addToast(message, { ...options, type: "error" });

    base.warning = (message: string, options?: Omit<ToastOptions, "type">) =>
      addToast(message, { ...options, type: "warning" });

    base.info = (message: string, options?: Omit<ToastOptions, "type">) =>
      addToast(message, { ...options, type: "info" });

    base.loading = (message: string, options?: Omit<ToastOptions, "type">) =>
      addToast(message, {
        ...options,
        type: "loading",
        duration: Infinity,
        hideClose: options?.hideClose ?? true,
      });

    base.dismiss = (id: string) => {
      removeToast(id);
      const timer = timers.current.get(id);
      if (timer) {
        window.clearTimeout(timer);
        timers.current.delete(id);
      }
    };

    return base;
  }, [addToast, removeToast]);

  return (
    <ToastContext.Provider value={{ toast: toastAPI }}>
      {children}
      <ToastContainer
        position={position}
        toasts={toasts}
        removeToast={removeToast}
      />
    </ToastContext.Provider>
  );
};
