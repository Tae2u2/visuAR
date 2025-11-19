import Artist from "@/components/home/Artist";
import IdCard from "@/components/home/IdCard";
import Notice from "@/components/home/Notice";
import Schedule from "@/components/home/Schedule";
import BreadCrumb from "@/components/layout/util/BreadCrumb";

const SettingPage = () => {
  return (
    <>
      <BreadCrumb title={"Management"} category={"setting"} locate={"manage"} />
      <div className="flex lg:flex-nowrap flex-wrap lg:flex-row flex-col-reverse justify-start items-start w-full gap-5 p-5 ">
        <div className="flex flex-col gap-5">
          <Notice />
          <Schedule />
        </div>
        <Artist />
        <IdCard />
      </div>
    </>
  );
};

export default SettingPage;
