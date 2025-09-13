import Image from "next/image";
import React from "react";
import { FanNameBadge, SectionTitle } from "../util/Text";

const FanSection = () => {
  return (
    <div className="w-full max-w-[450px]">
      <SectionTitle text="FANS" />

      <div className="flex flex-col gap-2 p-3">
        <p className="text-sm font-semibold">
          <FanNameBadge fanName="귀여운건팔이길어" isMembership={true} />
        </p>
        <Image src={"/profile/ret.jpg"} alt="족제비" width={450} height={450} />
        <p>이거 너무 귀여워 우리 애기 닮았어~~</p>
      </div>
    </div>
  );
};

export default FanSection;
