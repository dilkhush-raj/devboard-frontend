"use client";
import {useTheme} from "next-themes";
import {themes} from "@/constants";
import {useState, useEffect} from "react";

export default function ThemeSwitcher() {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentThemeIndex = themes.findIndex((mode) => mode.value === theme);

  const handleThemeSwitch = () => {
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    const nextTheme = themes[nextThemeIndex];

    setTheme(nextTheme.value);
    if (nextTheme.value !== "system") {
      localStorage.theme = nextTheme.value;
    } else {
      localStorage.removeItem("theme");
    }
  };

  if (!mounted) {
    return null; // Prevents rendering on the server
  }

  return (
    <button
      className="text-2xl transition-all duration-500"
      onClick={handleThemeSwitch}
    >
      {themes[currentThemeIndex]?.icon}
    </button>
  );
}
