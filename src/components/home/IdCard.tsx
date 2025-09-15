import Image from "next/image";
import React from "react";

const IdCard = () => {
  return (
    <div className="w-full max-w-[360px] bg-gray-100 rounded-md p-5 shadow">
      <Image src={"/profile/bang.jpg"} alt="artist" width={120} height={120} />
      <h3 className="text-lg font-bold mt-3">
        <span className="text-sm">Artist</span>방스타
      </h3>
      <p>데뷔일</p>
      <p>팬클럽 창단일</p>

      <p>가입일</p>
      <p>최근 방문일</p>
    </div>
  );
};

export default IdCard;
