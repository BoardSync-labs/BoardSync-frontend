import React from "react";
import Footer from "./Footer"; // adjust path if needed

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
