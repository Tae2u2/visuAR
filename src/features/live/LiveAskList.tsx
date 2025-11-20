"use client";

import { SectionTitle } from "@/components/util/Text";

type LiveItem = {
  id: number;
  name: string;
  timeStamp: string;
  platform: "app" | "instagram" | "tiktok" | "youtube";
  estimatedTime: number;
  staff: number;
};

const LiveAskList = () => {
  const liveAskList: LiveItem[] = [
    {
      id: 1,
      name: "A김",
      timeStamp: "2025-12-01 14:23",
      platform: "instagram",
      estimatedTime: 35,
      staff: 2,
    },
    {
      id: 2,
      name: "B임",
      timeStamp: "2025-12-02 09:10",
      platform: "youtube",
      estimatedTime: 50,
      staff: 1,
    },
    {
      id: 3,
      name: "C차",
      timeStamp: "2025-12-03 11:42",
      platform: "app",
      estimatedTime: 20,
      staff: 0,
    },
    {
      id: 4,
      name: "정우",
      timeStamp: "2025-12-04 18:15",
      platform: "tiktok",
      estimatedTime: 45,
      staff: 3,
    },
    {
      id: 5,
      name: "A김",
      timeStamp: "2025-12-05 16:50",
      platform: "youtube",
      estimatedTime: 55,
      staff: 4,
    },
    {
      id: 6,
      name: "B임",
      timeStamp: "2025-12-06 10:22",
      platform: "instagram",
      estimatedTime: 15,
      staff: 2,
    },
    {
      id: 7,
      name: "C차",
      timeStamp: "2025-12-07 19:33",
      platform: "app",
      estimatedTime: 60,
      staff: 5,
    },
    {
      id: 8,
      name: "정우",
      timeStamp: "2025-12-09 08:44",
      platform: "tiktok",
      estimatedTime: 25,
      staff: 1,
    },
    {
      id: 9,
      name: "A김",
      timeStamp: "2025-12-10 15:00",
      platform: "instagram",
      estimatedTime: 30,
      staff: 2,
    },
    {
      id: 10,
      name: "B임",
      timeStamp: "2025-12-12 13:12",
      platform: "app",
      estimatedTime: 40,
      staff: 3,
    },
    {
      id: 11,
      name: "C차",
      timeStamp: "2025-12-13 17:20",
      platform: "youtube",
      estimatedTime: 10,
      staff: 0,
    },
    {
      id: 12,
      name: "정우",
      timeStamp: "2025-12-15 21:05",
      platform: "tiktok",
      estimatedTime: 55,
      staff: 4,
    },
  ];

  type ColoredLiveItem = LiveItem & { color: string };

  function attachColorByName(data: LiveItem[]): ColoredLiveItem[] {
    const colorMap: Record<string, string> = {
      A김: "bg-blue-600",
      B임: "bg-green-600",
      C차: "bg-indigo-600",
      정우: "bg-rose-600",
    };

    return data.map((item) => ({
      ...item,
      color: colorMap[item.name] ?? "bg-orange-600",
    }));
  }

  const coloredLiveAskList = attachColorByName(liveAskList);
  return (
    <div className="w-full h-[750px] rounded shadow bg-white">
      <SectionTitle text={"Live Ask List"} />
      <div className="p-5 h-full max-h-[680px] overflow-y-auto">
        <ul className="flex flex-col w-full bg-gray-200 gap-2 p-5">
          {coloredLiveAskList.map((askItem) => (
            <li
              key={askItem.id}
              className="flex items-center justify-between gap-1 p-5 bg-white rounded shadow text-sm"
            >
              <span
                className={`block ${askItem.color} w-4 h-4 rounded-full mr-2`}
              ></span>
              {askItem.timeStamp}
              <b>{askItem.name}</b>
              <p className="w-full max-w-[360px] flex justify-end gap-3">
                플랫폼(<b>{askItem.platform}</b>) 예상시간(
                {askItem.estimatedTime}
                분) 필요인원({askItem.staff}명)
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LiveAskList;
