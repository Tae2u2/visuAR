import { ReactNode } from "react";
import { FcLike, FcRating } from "react-icons/fc";

export const FanNameBadge = ({
  fanName,
  isMembership,
}: {
  fanName: string;
  isMembership?: boolean;
}) => {
  return (
    <span className="inline-flex justify-start items-center gap-1 text-sm font-semibold ">
      {isMembership ? <FcRating size={18} /> : null}
      {fanName}{" "}
    </span>
  );
};

export const ArtistBadge = ({ artistName }: { artistName: string }) => {
  return (
    <span className="inline-flex justify-start items-center gap-1 text-sm font-semibold ">
      <FcLike size={18} />
      {artistName}{" "}
    </span>
  );
};

export const SectionTitle = ({ text }: { text: string }) => {
  return (
    <h4 className="w-full py-3 font-bold bg-blue-700 text-white px-5">
      {text}
    </h4>
  );
};
