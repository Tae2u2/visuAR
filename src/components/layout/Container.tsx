"use client";

import { useState, ReactNode } from "react";
import SideBar from "./SideBar";

const Container = ({ children }: { children: ReactNode }) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div
      className={`w-full min-h-full pt-16 ${
        openSideBar ? "pl-20" : "pl-[260px]"
      } bg-slate-100`}
    >
      <SideBar
        onClick={() => setOpenSideBar(!openSideBar)}
        openSideBar={openSideBar}
      />
      {children}
    </div>
  );
};

export default Container;
