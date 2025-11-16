"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Li = ({ title, href }: { title: string; href: string }) => {
  const pathname = usePathname();
  return (
    <li
      className={`w-full transition-colors hover:bg-sky-100 hover:text-black ${
        pathname === href ? "bg-sky-100 text-black" : ""
      } `}
    >
      <Link href={href} className="block w-full pl-10 py-3 text-base">
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
  return (
    <div className="fixed top-0 left-0 w-[260px] h-screen bg-slate-800 text-white ">
      <nav className="h-full flex flex-col justify-start items-start ">
        <Link href="/" className="font-extrabold p-5">
          VISUAR ADMIN
        </Link>
        <ul className="w-full flex flex-col justify-start items-start shadow text-white font-semibold text-sm">
          <Li title="Management" href="/setting" />
          <Li title="Artist" href="/star" />
          <Li title="LIVE" href="/live" />
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
