import Image from "next/image";
import React from "react";

const DateText = ({ text, date }: { text: string; date: string }) => {
  return (
    <p className="w-full flex gap-3 text-sm text-slate-600">
      <span className="w-[60px] text-sm text-slate-600">{text}</span>
      {date}
    </p>
  );
};

const IdCard = () => {
  return (
    <div className="flex flex-col justify-end items-center w-full max-w-[360px] bg-white rounded-md p-5 shadow">
      <Image src={"/profile/bang.jpg"} alt="artist" width={120} height={120} />
      <h3 className="text-lg font-semibold mt-3">BANGROO</h3>
      <div className="w-full bg-slate-50 mx-5 p-5">
        <DateText text="debut" date="2022.06.05" />
        <DateText text="fanclub" date="2024.03.11" />
        <DateText text="start day" date="2022.04.03" />
        <DateText text="last visit" date="2025.11.19" />
      </div>
    </div>
  );
};

export default IdCard;
