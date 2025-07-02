import React from "react";
import Logo from "./logo";
import { ThemeSwitch } from "./theme-switch";

const Header = () => {
  return (
    <div className="bg-primary/10 fixed top-0 h-16 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-full w-full max-w-4xl items-center justify-between">
        <Logo />
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Header;
