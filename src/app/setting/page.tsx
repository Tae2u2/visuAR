import ArtistLiveAsk from "@/components/manage/ArtistLiveAsk";
import MembershipChart from "@/components/manage/chart/MembershipChart";
import FanUserList from "@/components/manage/FanUserList";

const SettingPage = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex gap-5 ">
        <ArtistLiveAsk />
        <FanUserList />
      </div>
      <MembershipChart />
    </div>
  );
};

export default SettingPage;
