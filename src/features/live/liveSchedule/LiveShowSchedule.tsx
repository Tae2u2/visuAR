"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const LiveShowSchedule = () => {
  return (
    <div className="flex w-full h-auto p-5 gap-5">
      <div className="w-full bg-white rounded shadow p-5">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={[
            { title: "빼빼로데이 라이브", date: "2025-11-11" },
            { title: "[DOIT]컴백방송", date: "2025-11-21" },
          ]}
          nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
        />
      </div>
      <div className="w-full max-w-[350px] bg-white rounded shadow p-5">
        <h3 className="font-roboto font-semibold text-lg mb-3">일정 설명</h3>
      </div>
    </div>
  );
};

export default LiveShowSchedule;
