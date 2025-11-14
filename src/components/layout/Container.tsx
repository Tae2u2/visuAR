import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-full pt-18 px-[3%] bg-slate-100">
      {children}
    </div>
  );
};

export default Container;
