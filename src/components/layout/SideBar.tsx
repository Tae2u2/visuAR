"use client";

import { useBoolean } from "@/hooks/useBoolean";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { FcVideoCall } from "react-icons/fc";

const Li = ({
  title,
  href,
  isChildLi,
}: {
  title: string;
  href: string;
  isChildLi?: boolean;
}) => {
  const pathname = usePathname();

  if (isChildLi) {
    return (
      <li
        className={`w-full transition-all hover:bg-sky-100 hover:text-sky-600 ${
          pathname === href ? "text-sky-600" : ""
        } `}
      >
        <Link
          href={href}
          className="flex justify-between items-center w-full pl-10 pr-2 py-3 text-base"
        >
          {title}
        </Link>
      </li>
    );
  }

  return (
    <li
      className={`w-full transition-colors hover:bg-sky-100 hover:text-sky-600 ${
        pathname === href ? "bg-sky-100 text-sky-600" : ""
      } `}
    >
      <Link
        href={href}
        className="flex justify-between items-center w-full pl-10 pr-2 py-3 text-base"
      >
        {title}
      </Link>
    </li>
  );
};

const SideBar = ({
  onClick,
  openSideBar,
}: {
  onClick: () => void;
  openSideBar: boolean;
}) => {
  const {
    value: liveSection,
    setTrue: setLiveSectionOpen,
    setFalse: setLiveSectionFalse,
    toggle: setLiveSectionToggle,
  } = useBoolean(false);
  return (
    <div className="fixed top-0 left-0 w-[260px] h-screen bg-white shadow-md ">
      <nav className="h-full flex flex-col justify-start items-start ">
        <Link
          href="/"
          className="flex items-center gap-1 text-lg font-roboto font-bold py-5 px-10 text-teal-800"
        >
          <FcVideoCall size={24} />
          VISUAR ADMIN
        </Link>
        <ul className="w-full flex flex-col justify-start items-start text-gray-600 text-sm">
          <li className="w-full px-10 py-3 font-semibold text-[13px] tracking-widest text-slate-700">
            MANAGE
          </li>
          <Li title="Management" href="/setting" />
          <Li title="Artist" href="/star" />
          <li className="w-full px-10 py-3 font-semibold text-[13px] tracking-widest text-slate-700">
            FANS
          </li>
          <li
            onClick={() => setLiveSectionToggle()}
            className={`w-full flex justify-between items-center pl-10 pr-5 py-2 text-[16.5px] transition-colors cursor-pointer hover:bg-sky-100 hover:text-sky-600 ${
              liveSection ? "bg-sky-100 text-sky-600" : ""
            }`}
          >
            Live {liveSection ? <BiChevronRight /> : <BiChevronDown />}
          </li>
          {liveSection ? (
            <>
              <Li title="Live filter" href="/live" isChildLi />
              <Li title="Live schedule" href="/live/schedule" isChildLi />
            </>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
