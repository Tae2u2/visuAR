import React from "react";
import { SectionTitle } from "../util/Text";

const ArtistLiveAsk = () => {
  return (
    <div className="w-full max-w-[550px]">
      <SectionTitle text="Artist Live Ask" />
      <div className="flex flex-col gap-2 p-5 shadow ">
        <p className="font-semibold text-sm">라이브 예약 요청</p>
        <ul className="flex flex-col gap-3 w-full">
          <li className="w-full px-6 py-2 rounded-full bg-slate-100 shadow">
            <p className="text-sm">
              아티스트 김멍멍의 라이브 방송 예약 <br />
              <span>2025-09-16 20:00</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ArtistLiveAsk;
