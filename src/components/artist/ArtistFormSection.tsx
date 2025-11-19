"use client";

import { useState } from "react";
import Image from "next/image";
import { ArtistBadge, FanNameBadge, SectionTitle } from "../util/Text";

const ArtistFormSection = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]); // 여러 개 업로드 허용
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-[450px] bg-white shadow">
      <SectionTitle text="FANS" />
      <div className="flex flex-col gap-2 p-3">
        <form className="flex flex-col gap-2 justify-start items-start w-full">
          <input
            type="file"
            accept="image/*,video/*"
            className="px-3 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            multiple
            onChange={handleFileChange}
          />
          <br />
          <div className="grid grid-cols-3 gap-2">
            {files.map((file, index) => {
              const url = URL.createObjectURL(file);
              return (
                <div key={index} className="relative">
                  {file.type.startsWith("image/") ? (
                    <img
                      src={url}
                      alt="preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={url}
                      controls
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
          <textarea
            className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
            placeholder="Write something..."
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <p className="text-sm font-semibold">
          <ArtistBadge artistName="나는야쿼까" />
        </p>
        <Image src={"/profile/kka.jpg"} alt="쿼카" width={450} height={450} />
        <p>나 어때</p>
      </div>
    </div>
  );
};

export default ArtistFormSection;
