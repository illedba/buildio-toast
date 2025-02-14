export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export type ToastTransition = "slide" | "grow" | "fade";

export type ToastType = "success" | "error" | "warning" | "info" | "loading";

export interface ToastOptions {
  id?: string;
  type?: ToastType;
  color?: string;
  duration?: number;
  icon?: ReactNode;
  transition?: ToastTransition;
  hideClose?: boolean;
}

export interface Toast extends Omit<ToastOptions, "actions"> {
  id: string;
  message: string;
  transition: ToastTransition;
}
