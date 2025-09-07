import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Login from "./pages/Login";
import { ThemeProvider } from "@material-tailwind/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Registration } from "./pages/Registration";
import UserLanding from "./pages/UserLanding";
import store from "./store/store";
import { Provider } from "react-redux";
import PostDetails from "./pages/PostDetails";
import UserPage from "./pages/UserDetails";
import Inbox from "./pages/Inbox";
import { ThemeProvider as CustomThemeProvider } from "./contexts/ThemeContext";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Registration />,
  },
  {
    path: "/user/:id",
    element: <UserLanding />,
  },
  {
    path: "/post/:id",
    element: <PostDetails />,
  },
  {
    path: "userDetails/:id",
    element: <UserPage />,
  },
  {
    path: "/inbox",
    element: <Inbox />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomThemeProvider>
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>
      </ThemeProvider>
    </CustomThemeProvider>
  </React.StrictMode>
);
