import Link from "next/link";
import React from "react";
import { RxDoubleArrowRight } from "react-icons/rx";

const Schedule = () => {
  return (
    <div className="w-full min-w-[650px] bg-white">
      <div className="flex justify-between items-center px-5 py-3 border-b bg-blue-700 text-white">
        <h4 className=" font-bold">Schedule</h4>
        <Link href={"/fans"} className="flex items-center gap-[2px] text-sm">
          More
          <RxDoubleArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Schedule;
