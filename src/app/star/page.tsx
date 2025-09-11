import ArtistSection from "@/components/artist/ArtistSection";
import FanSection from "@/components/artist/FanSection";
import LiveSection from "@/components/artist/LiveSection";
import AnimalEarsLiveWithSelector from "@/features/live/LiveShowView";
import React from "react";

const StarPage = () => {
  return (
    <div>
      <ArtistSection />
      <LiveSection />
      <FanSection />
    </div>
  );
};

export default StarPage;
