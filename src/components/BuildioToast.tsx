/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, useRef } from "react";
import { Toast, ToastPosition } from "../types/toastTypes";

import {
  FiCheckCircle,
  FiAlertCircle,
  FiAlertTriangle,
  FiInfo,
  FiX,
} from "react-icons/fi";
import useTheme from "@mui/material/styles/useTheme";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import IconButton from "@mui/material/IconButton/IconButton";
import { getToastColor } from "../utils/toastHelper";

const BuildioToast = ({
  toast,
  transition: Transition,
  removeToast,
  position,
}: {
  toast: Toast;
  transition: ComponentType<any>;
  removeToast: (id: string) => void;
  position: ToastPosition;
}) => {
  const theme = useTheme();
  const timers = useRef(new Map<string, number>());

  const typeIcons = {
    success: <FiCheckCircle />,
    error: <FiAlertCircle />,
    warning: <FiAlertTriangle />,
    info: <FiInfo />,
    loading: <CircularProgress size={20} color="inherit" />,
  };

  const color = getToastColor(toast.type || "info", theme, toast.color);
  const bgOpacity = theme.palette.mode === "dark" ? 0.3 : 0.2;
  const iconBgColor = `${color}${Math.round(bgOpacity * 255).toString(16)}`;

  const handleMouseEnter = () => {
    const timer = timers.current.get(toast.id);
    if (timer) window.clearTimeout(timer);
  };

  const handleMouseLeave = () => {
    const timer = window.setTimeout(
      () => removeToast(toast.id),
      toast.duration
    );
    timers.current.set(toast.id, timer);
  };

  const slideDirection = position.includes("top") ? "down" : "up";

  return (
    <Transition
      {...(toast.transition === "slide" && { direction: slideDirection })}
      in={true}
      mountOnEnter
      unmountOnExit
    >
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          width: 320,
          borderRadius: 2,
          boxShadow: theme.shadows[4],
          bgcolor: "background.paper",
          color: "text.primary",
          borderLeft: `4px solid ${color}`,
          m: 1,
        }}
        role="alert"
      >
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <Box
            sx={{
              display: "flex",
              p: 1,
              mr: 2,
              borderRadius: "50%",
              bgcolor: iconBgColor,
              "& svg": { width: 20, height: 20, color },
            }}
          >
            {toast.icon || (toast.type ? typeIcons[toast.type] : <FiInfo />)}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" fontWeight={500}>
              {toast.message}
            </Typography>
          </Box>

          {!toast.hideClose && (
            <IconButton
              size="small"
              onClick={() => removeToast(toast.id)}
              sx={{ color: "text.secondary", ml: 1 }}
            >
              <FiX size={16} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Transition>
  );
};

export default BuildioToast;
