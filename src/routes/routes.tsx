import { createBrowserRouter, RouteObject } from "react-router-dom";
import SignIn from "../routes/SignIn/SignIn";

const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <SignIn />,
  },
];

export const router = createBrowserRouter(routesConfig);
