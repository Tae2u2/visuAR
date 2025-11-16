import React from "react";
import { SectionTitle } from "../util/Text";
import { ColorCardWidget, ColorCardWidgetProps } from "./util.tsx/DataWidget";

const ArtistLiveAsk = () => {
  const noticeMockData: ColorCardWidgetProps[] = [
    {
      text: "아티스트 김멍멍 라이브 요청",
      time: "2025-11-15 20:00",
      type: "live",
    },
    {
      text: "아티스트 김멍멍 팬미팅 요청",
      time: "2025-11-20 18:00",
      type: "fan-event",
    },
    {
      text: "토끼, 김냥 라디오 출연",
      time: "2025-11-25 15:00",
      type: "radio",
    },
    {
      text: "뽁아리 틱톡(컴백스포) 업로드",
      time: "2025-11-28 19:00",
      type: "upload",
    },
    {
      text: "쿼카 틱톡(이라이라) 업로드",
      time: "2025-12-01 12:00",
      type: "upload",
    },
  ];

  return (
    <ul className="flex gap-3 w-full p-5 bg-white shadow">
      {noticeMockData.map((noticeItem) => (
        <ColorCardWidget
          key={noticeItem.text + noticeItem.time}
          text={noticeItem.text}
          time={noticeItem.time}
          type={noticeItem.type}
        />
      ))}
    </ul>
  );
};

export default ArtistLiveAsk;
