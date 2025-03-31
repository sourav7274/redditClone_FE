import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Login from "./pages/Login"; 
import { ThemeProvider } from "@material-tailwind/react";
import {createBrowserRouter,RouterProvider} from "react-router-dom"; 
import { Registration } from "./pages/Registration";
import UserLanding from "./pages/UserLanding";
import store from "./store/store";
import { Provider } from "react-redux";
import PostDetails from "./pages/PostDetails";
import UserPage from "./pages/UserDetails";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:"/login",
    element: <Login />,
  },
  {
    path:"/signup",
    element: <Registration />,
  },
  {
    path:"/user/:id",
    element: <UserLanding />,
  },
  {
    path:"/post/:id",
    element : <PostDetails/>
  },
  {
    path:'userDetails/:id',
    element:<UserPage/>
  },
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
    <Provider store={store}>
    <RouterProvider router={routes}/>
    </Provider>
    </ThemeProvider>
  </React.StrictMode>
);