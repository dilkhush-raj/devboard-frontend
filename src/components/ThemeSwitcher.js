"use client";
import { useTheme } from "@/context/ThemeProvider";
import { themes } from "@/constants";
import { useState } from "react";

export default function ThemeSwitcher() {
  const { mode, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const currentTheme = themes.find((theme) => theme.value === mode);
  return (
    <>
      <button
        className="text-2xl transition-all duration-500"
        onClick={() => setOpen(!open)}
      >
        {currentTheme?.icon}
      </button>
      <div
        className={` ${
          open ? "visible " : "hidden "
        } absolute flex transition-all z-50 duration-500 flex-col gap-2 p-1 border rounded-md top-[55px] right-5 bg-lightColor-900 dark:bg-darkColor-200 border-border-100`}
      >
        {themes.map((item) => (
          <button
            key={item.value}
            className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-lightColor-700 hover:dark:bg-darkColor-400 "
            onClick={() => {
              setMode(item.value);
              if (item.value !== "system") {
                localStorage.theme = item.value;
              } else {
                localStorage.removeItem("theme");
              }
              setOpen(!open);
            }}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>
      <div onClick={() => setOpen(!open)} className={`${open ? "visible " : "hidden "} fixed inset-0 z-40`}>
        {/* Maskable Area */}
      </div>
    </>
  );
}
