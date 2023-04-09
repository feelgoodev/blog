import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Introduction from "./pages/Introduction";
import PostLists from "./pages/PostLists";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Introduction />,
        index: true,
      },
      {
        path: "postlists",
        element: <PostLists />,
      },
      {
        path: "postlists/:id",
        element: <PostLists />,
      },
      {
        path: "postdetail/:id",
        element: <PostDetail />,
      },
      {
        path: "create",
        element: <CreatePost />,
      },
      {
        path: "create/:category/:id/:index",
        element: <CreatePost />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
