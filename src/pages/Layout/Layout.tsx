import { Footer, Header } from "@/components";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
