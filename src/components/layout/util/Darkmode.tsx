"use client";

import { useTheme } from "next-themes";
import { BiSun } from "react-icons/bi";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <BiSun size={26} />
    </button>
  );
}
