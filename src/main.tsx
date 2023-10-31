import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ProviderState } from "./state";
import { router } from "./router";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProviderState>
      <RouterProvider router={router} />
    </ProviderState>
  </React.StrictMode>,
);
