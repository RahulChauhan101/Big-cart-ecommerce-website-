import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(() => localStorage.getItem("dark") === "true");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className=" py-3 px-4   rounded bg-gray-700 dark:bg-gray-400 text-gray-400 dark:text-white flex items-center justify-center"
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {dark ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
};

export default DarkModeToggle;
