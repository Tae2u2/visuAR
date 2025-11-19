"use client";

import { useState } from "react";
import { SectionTitle } from "../util/Text";
import { Button } from "../util/Custom";

const ArtistSection = () => {
  const [artistName, setArtistName] = useState("나는야쿼까");
  return (
    <div className="w-full max-w-[350px] bg-white shadow">
      <SectionTitle text={"ARTIST"} />
      <div className="p-3">
        <form>
          <label
            htmlFor="artistName"
            className="block text-sm font-medium text-gray-700 tracking-tight"
          >
            닉네임변경
          </label>
          <div className="flex gap-1">
            <input
              type="text"
              id="artistName"
              name="artistName"
              className="mt-1 px-3 pt-2 pb-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />
            <Button
              text="EDIT"
              className="bg-black text-white text-sm text-nowrap px-4 font-bold cursor-pointer transition-colors duration-150 hover:bg-slate-800"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArtistSection;
