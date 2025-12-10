import React from "react";
import Footer from "./Footer"; // adjust path if needed
import Navbar from "./navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar/>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
