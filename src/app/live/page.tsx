import BreadCrumb from "@/components/layout/util/BreadCrumb";
import LiveAskList from "@/features/live/LiveAskList";

const LivePage = () => {
  return (
    <>
      <BreadCrumb title={"Live Check"} category={"live"} locate={"check"} />
      <div className="flex w-full h-screen p-5 gap-5">
        <iframe
          src="face-filter/index.html"
          width="800px"
          height="750px"
          className="border-0 w-full"
        />
        <LiveAskList />
      </div>
    </>
  );
};

export default LivePage;
