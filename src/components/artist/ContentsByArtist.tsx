"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FanNameBadge, SectionTitle } from "../util/Text";

const ContentsByArtist = () => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const members = [
    "김민지",
    "박서연",
    "이지우",
    "최하늘",
    "송은비",
    "정다은",
    "오윤서",
    "임수아",
  ];

  const contents = [
    {
      id: 1,
      author: "김민지",
      content:
        "오늘 연습 너무 힘들었어요 😭 그래도 팬분들 생각하면서 힘냈어요!",
      image: "/profile/ret.jpg",
      isMembership: true,
    },
    {
      id: 2,
      author: "박서연",
      content: "새로운 안무 연습 중이에요! 곧 보여드릴게요 ✨",
      image: "/profile/fox.jpg",
      isMembership: false,
    },
    {
      id: 3,
      author: "이지우",
      content: "오늘 녹음 작업했는데 너무 재밌었어요! 기대해주세요 💕",
      image: "/profile/cat.jpg",
      isMembership: true,
    },
    {
      id: 4,
      author: "최하늘",
      content: "팬분들이 보내주신 편지 읽었어요. 너무 감동이에요 🥺",
      image: "/profile/kki.jpg",
      isMembership: false,
    },
    {
      id: 5,
      author: "송은비",
      content: "새로운 헤어스타일 어때요? 어떤 색깔이 더 어울릴까요?",
      image: "/profile/kka.jpg",
      isMembership: true,
    },
    {
      id: 6,
      author: "정다은",
      content: "오늘 라이브 방송 재밌었나요? 다음에 또 만나요!",
      image: "/profile/ret.jpg",
      isMembership: false,
    },
    {
      id: 7,
      author: "오윤서",
      content: "컴백 준비하느라 바쁘지만 행복해요! 곧 좋은 소식 들려드릴게요",
      image: "/profile/bang.jpg",
      isMembership: true,
    },
    {
      id: 8,
      author: "임수아",
      content: "팬분들과 함께하는 시간이 가장 행복해요 💖",
      image: "/profile/bbock.jpg",
      isMembership: false,
    },
  ];

  const filteredContents = selectedMember
    ? contents.filter((content) => content.author === selectedMember)
    : contents;

  return (
    <div className="flex min-h-screen">
      {/* 좌측 멤버 리스트 위젯 */}
      <div className="fixed left-[280px] top-24 w-48 bg-white border border-slate-300 rounded-lg shadow-lg p-4 z-10">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setSelectedMember(null)}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              selectedMember === null
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            전체
          </button>
          {members.map((member) => (
            <button
              key={member}
              onClick={() => setSelectedMember(member)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                selectedMember === member
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {member} {member.includes("김") ? "💌" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* 우측 콘텐츠 리스트 */}
      <div className="flex flex-col ml-52">
        <SectionTitle text="CONTENTS" />
        <div className="flex flex-col gap-6 max-w-[450px] mx-auto">
          {filteredContents.map((content) => (
            <div key={content.id} className="w-full">
              <div className="flex flex-col gap-2 p-3 border-b-2 border-slate-300 bg-white">
                <p className="text-sm font-semibold">
                  <FanNameBadge
                    fanName={content.author}
                    isMembership={content.isMembership}
                  />
                </p>
                <Image
                  src={content.image}
                  alt={`${content.author} 게시물`}
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
                <p className="text-sm">{content.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentsByArtist;
