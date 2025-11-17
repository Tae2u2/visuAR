import LiveShowSchedule from "@/features/live/LiveShowSchedule";

const LivePage = () => {
  return (
    <div className="flex w-full h-screen p-5 gap-5">
      <iframe
        src="face-filter/index.html"
        width="800px"
        height="800px"
        className="border-0 w-full"
      />
      <LiveShowSchedule />
    </div>
  );
};

export default LivePage;
