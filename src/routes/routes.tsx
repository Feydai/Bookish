import { createBrowserRouter, RouteObject } from "react-router-dom";
import { RequireAuth } from "../components/RequireAuth";

import SignIn from "../routes/SignIn/SignIn";
import SignUp from "../routes/SignUp/SignUp";
import SignOut from "../routes/SignOut/SignOut";
import PickFavorite from "../routes/PickFavorite/PickFavorite";
import BookPreview from "../routes/BookPreview/BookPreview";

const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signOut",
    element: (
      <RequireAuth>
        <SignOut />
      </RequireAuth>
    ),
  },
  {
    path: "/pickFavorite",
    element: (
      <RequireAuth>
        <PickFavorite />
      </RequireAuth>
    ),
  },
  {
    path: "/bookPreview/:bookId",
    element: (
      <RequireAuth>
        <BookPreview />
      </RequireAuth>
    ),
  },
];

export const router = createBrowserRouter(routesConfig);
