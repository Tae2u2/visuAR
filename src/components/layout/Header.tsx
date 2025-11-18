"use client";

import Link from "next/link";
import { BiBell, BiSun, BiUser } from "react-icons/bi";
import DarkModeToggle from "./util/Darkmode";

const Header = () => {
  return (
    <div className="absolute top-0 w-full h-16 bg-white shadow px-5 dark:text-white">
      <nav className="h-full flex justify-between items-center">
        <Link href="/" className="font-extrabold">
          VISUAR
        </Link>
        <ul className="flex justify-center items-center gap-5 text-gray-600 font-semibold text-sm">
          <li>
            <button>
              <BiBell size={26} />
            </button>
          </li>
          <li>
            <DarkModeToggle />
          </li>
          <li>
            <button>
              <BiUser size={26} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
