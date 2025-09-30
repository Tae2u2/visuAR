import ArtistFormSection from "@/components/artist/ArtistFormSection";
import ArtistSection from "@/components/artist/ArtistSection";
import ContentsByArtist from "@/components/artist/ContentsByArtist";
import FanSection from "@/components/artist/FanSection";
import LiveSection from "@/components/artist/LiveSection";
import AnimalEarsLiveWithSelector from "@/features/live/LiveShowView";
import React from "react";

const StarPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <ContentsByArtist />
      <div className="flex lg:flex-nowrap flex-wrap lg:flex-row flex-col-reverse justify-start items-start w-full gap-5">
        <FanSection />
        <ArtistFormSection />
        <div className="flex flex-col gap-5 w-full">
          <ArtistSection />
          <LiveSection />
        </div>
      </div>
    </div>
  );
};

export default StarPage;
