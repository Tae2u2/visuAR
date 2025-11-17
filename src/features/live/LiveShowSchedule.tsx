"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const LiveShowSchedule = () => {
  return (
    <div className="w-full h-[700px]">
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
  );
};

export default LiveShowSchedule;
