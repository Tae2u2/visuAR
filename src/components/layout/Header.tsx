import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="absolute top-0 w-full h-16 bg-black text-white px-5">
      <nav className="h-full flex justify-between items-center">
        <Link href="/" className="font-extrabold">
          VISUAR
        </Link>
        <ul className="flex justify-center items-center gap-5 text-white font-semibold text-sm">
          <li>
            <Link href="/setting">Management</Link>
          </li>
          <li>
            <Link href="/star">Artist</Link>
          </li>
          <li>
            <Link href="/live">LIVE</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
