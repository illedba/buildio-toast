import { useCallback } from "react";
import { ToastPosition, Toast, ToastTransition } from "../types/toastTypes";
import { positionStyles } from "../utils/toastHelper";
import BuildioToast from "./BuildioToast";
import Box from "@mui/material/Box/Box";
import useTheme from "@mui/material/styles/useTheme";
import Grow from "@mui/material/Grow/Grow";
import Fade from "@mui/material/Fade/Fade";
import Slide from "@mui/material/Slide/Slide";

const ToastContainer = ({
  position,
  toasts,
  removeToast,
}: {
  position: ToastPosition;
  toasts: Toast[];
  removeToast: (id: string) => void;
}) => {
  const theme = useTheme();

  const getTransition = useCallback((transition: ToastTransition) => {
    switch (transition) {
      case "grow":
        return Grow;
      case "fade":
        return Fade;
      default:
        return Slide;
    }
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: theme.zIndex.modal,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        ...positionStyles[position],
      }}
      role="region"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <BuildioToast
          key={toast.id}
          toast={toast}
          transition={getTransition(toast.transition)}
          removeToast={removeToast}
          position={position}
        />
      ))}
    </Box>
  );
};
export default ToastContainer;
