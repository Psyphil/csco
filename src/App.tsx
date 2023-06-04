import React from "react";
import Titlebar from "./components/titlebar";
import { Outlet } from "react-router-dom";

export default function App() {
  console.log("App");
  return (
    <div className="h-full flex flex-col text-dark bg-light dark:text-light dark:bg-dark-400">
      <Titlebar />
      <Outlet />
    </div>
  );
}
