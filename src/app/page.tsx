import ArtistLiveAsk from "@/components/manage/ArtistLiveAsk";
import MembershipChart from "@/components/manage/chart/MembershipChart";
import FanUserList from "@/components/manage/FanUserList";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-5 p-5">
      <ArtistLiveAsk />
      <MembershipChart />
      <FanUserList />
    </div>
  );
}
