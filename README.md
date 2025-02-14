Buildio Toast 🍞
A lightweight and customizable toast notification library for React applications.

Features ✨
Multiple Toast Types: Success, Error, Warning, Info, and Loading.

Customizable: Easily customize toast messages and styles.

Dismissible: Manually dismiss individual toasts or all toasts at once.

React Hooks: Simple integration using the useBuildioToast hook.

TypeScript Support: Built with TypeScript for better type safety.

Installation 📦
Install the package using npm or yarn:

npm install buildio-toast
or

yarn add buildio-toast
Usage 🚀

1. Wrap Your App with ToastProvider
   First, wrap your application with the ToastProvider component to enable toast notifications.

<!-- import React from "react";
import { ToastProvider } from "buildio-toast";
import App from "./App";

function Root() {
return (
<ToastProvider>
<App />
</ToastProvider>
);
}

export default Root; -->


 2. Use the useBuildioToast Hook
Now you can use the useBuildioToast hook in any component to display toasts.

<!-- import React from "react";
import { useBuildioToast } from "buildio-toast";

function MyComponent() {
const toast = useBuildioToast();

const showToast = (type) => {
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

<div>
<button onClick={() => showToast("success")}>Show Success Toast</button>
<button onClick={() => showToast("error")}>Show Error Toast</button>
<button onClick={() => showToast("warning")}>Show Warning Toast</button>
<button onClick={() => showToast("info")}>Show Info Toast</button>
<button onClick={() => showToast("loading")}>Show Loading Toast</button>
</div>
);
}

export default MyComponent; -->



API Reference 📚

ToastProvider
A context provider that enables toast notifications in your app.

Props
children: Your application components.

useBuildioToast
A React hook that provides methods to display and dismiss toasts.

<!-- Methods
success(message: string): Displays a success toast.

error(message: string): Displays an error toast.

warning(message: string): Displays a warning toast.

info(message: string): Displays an info toast.

loading(message: string): Displays a loading toast.

dismiss(id: string): Dismisses a specific toast by its ID.

dismissAll(): Dismisses all active toasts. -->

Customization 🎨
You can customize the appearance and behavior of toasts by passing options to the ToastProvider.


<!-- <ToastProvider
position="top-right"
duration={5000}
style={{ backgroundColor: "#333", color: "#fff" }}

>   <App />
> </ToastProvider> -->




> Options
> position: Toast position (top-right, top-left, bottom-right, bottom-left).

duration: Duration in milliseconds before the toast auto-dismisses.

style: Custom styles for the toast container.

Examples 🖼️
Basic Example

<!-- import React from "react";
import { useBuildioToast } from "buildio-toast";

function App() {
const toast = useBuildioToast();

return (
<div>
<button onClick={() => toast.success("Success!")}>Show Success</button>
<button onClick={() => toast.error("Error!")}>Show Error</button>
</div>
);
}

export default App;
Advanced Example -->

<!-- import React from "react";
import { useBuildioToast } from "buildio-toast";

function App() {
const toast = useBuildioToast();

const handleLoading = () => {
toast.loading("Loading...");
setTimeout(() => toast.dismiss("loading-toast"), 3000);
};

return (
<div>
<button onClick={handleLoading}>Show Loading</button>
<button onClick={() => toast.dismissAll()}>Dismiss All</button>
</div>
);
} -->

export default App;

Contributing 🤝

Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/YourFeature).

Commit your changes (git commit -m "Add some feature").

Push to the branch (git push origin feature/YourFeature).

Open a pull request.

License 📄
This project is licensed under the MIT License. See the LICENSE file for details.

Support 💬
If you have any questions or issues, please open an issue on GitHub.

Enjoy using Buildio Toast! 🎉
