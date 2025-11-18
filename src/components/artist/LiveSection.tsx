import AnimalEarsLiveWithSelector from "@/features/live/liveSchedule/LiveShowSchedule";
import { SectionTitle } from "../util/Text";
import { Button } from "../util/Custom";

const LiveSection = () => {
  return (
    <div className="flex flex-col justify-start items-start w-full max-w-[350px] rounded-sm bg-slate-100 shadow">
      <SectionTitle text="LIVE" />
      <div className="flex flex-col justify-start items-center w-full p-3 gap-3">
        <Button text="LIVE START" />
        <Button text="ASK LIVE" />
      </div>
    </div>
  );
};

export default LiveSection;
