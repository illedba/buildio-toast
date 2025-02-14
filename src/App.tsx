import { Button, Box } from "@mui/material";
import { ToastProvider } from "./context/ToastProvider";
import { useBuildioToast } from "./hooks/useBuildioToast";

export function ToastDemo() {
  const toast = useBuildioToast();

  const showToast = (
    type: "success" | "error" | "warning" | "info" | "loading"
  ) => {
    switch (type) {
      case "success":
        toast.success("This is a success toast!");
        break;
      case "error":
        toast.error("This is an error toast!");
        break;
      case "warning":
        toast.warning("This is a warning toast!");
        break;
      case "info":
        toast.info("This is an info toast!");
        break;
      case "loading":
        toast.loading("This is a loading toast...");
        setTimeout(() => toast.dismiss("loading-toast"), 4000);
        break;
      default:
        toast("This is a default toast!");
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, p: 4 }}>
      <Button
        variant="contained"
        color="success"
        onClick={() => showToast("success")}
      >
        Success
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => showToast("error")}
      >
        Error
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={() => showToast("warning")}
      >
        Warning
      </Button>
      <Button
        variant="contained"
        color="info"
        onClick={() => showToast("info")}
      >
        Info
      </Button>
      <Button variant="contained" onClick={() => showToast("loading")}>
        Loading
      </Button>
    </Box>
  );
}

function App() {
  return (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  );
}

export default App;
