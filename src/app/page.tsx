import Artist from "@/components/home/Artist";
import Fans from "@/components/home/Fans";
import Notice from "@/components/home/Notice";
import Schedule from "@/components/home/Schedule";

export default function Home() {
  return (
    <div className="flex lg:flex-nowrap flex-wrap lg:flex-row flex-col-reverse justify-start items-start w-full gap-5">
      <div className="flex flex-col gap-5">
        <Notice />
        <Schedule />
      </div>
      <Artist />
      <Fans />
    </div>
  );
}
