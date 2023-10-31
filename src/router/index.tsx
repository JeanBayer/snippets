import { createBrowserRouter } from "react-router-dom";

import { CreatePage, HomePage } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/create",
    element: <CreatePage />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);
