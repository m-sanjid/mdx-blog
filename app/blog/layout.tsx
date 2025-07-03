import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto max-w-2xl">{children}</div>;
};

export default Layout;
