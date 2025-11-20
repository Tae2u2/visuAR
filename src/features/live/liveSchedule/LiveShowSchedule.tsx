"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import { SectionTitle } from "@/components/util/Text";
interface Event {
  id: string;
  title: string;
  date?: string;
  start?: string;
  end?: string;
}

const LiveShowSchedule = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "빼빼로데이 라이브",
      start: "2025-11-11",
      end: "2025-11-12",
    },
    {
      id: "2",
      title: "[DOIT]컴백방송",
      start: "2025-11-21",
      end: "2025-11-21",
    },
    {
      id: "3",
      title: "블랙프라이데이 세일 라이브",
      start: "2025-11-29",
      end: "2025-11-30",
    },
    {
      id: "4",
      title: "크리스마스 특집 라이브",
      start: "2025-12-24T08:00:00+09:00",
      end: "2025-12-25T12:00:00+09:00",
    },
  ]);

  const handleEventAdd = (info: any) => {
    const title = prompt("일정 제목을 입력하세요");
    if (!title || !title.trim()) return;

    // dateClick은 dateStr만 있고, select는 startStr/endStr 있음
    const start = info.startStr || info.dateStr;
    const end = info.endStr || info.dateStr;

    const newEvent: Event = {
      id: String(Date.now()),
      title,
      start,
      end,
    };

    setEvents((prev) => [...prev, newEvent]);
  };
  return (
    <div className="flex w-full h-auto p-5 gap-5">
      <div className="w-full bg-white rounded shadow p-5">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          select={handleEventAdd}
          selectable={true}
          nowIndicator={true}
          editable={true}
          selectMirror={true}
        />
      </div>
      <div className="w-full max-w-[350px] bg-white rounded shadow ">
        <SectionTitle text="Live Schedule" />
        <ul className="flex flex-col gap-3 h-full max-h-[900px] overflow-y-scroll p-5 m-4 bg-gray-100">
          {events.map((event) => (
            <li
              key={event.id}
              className="flex flex-col p-3 bg-white rounded text-sm shadow"
            >
              {event.title}
              <span className="font-medium text-sm text-gray-600">
                시작: {event.start}
                <br />
                종료: {event.end}
              </span>{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LiveShowSchedule;
