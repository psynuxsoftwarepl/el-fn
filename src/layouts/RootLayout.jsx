import React from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="relative overflow-hidden bg-background">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
