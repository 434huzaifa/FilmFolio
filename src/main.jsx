import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import App from "./App";
const qc = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
    mutations: {
      retry: 2,
    },
  },
});
const router = createBrowserRouter([
  {
    path:"/",
    element:<App></App>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      }
    ],
  },
  {
    path:"/login",
    element:<Login></Login>
  }
]); 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <QueryClientProvider client={qc}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  </React.StrictMode>
);
