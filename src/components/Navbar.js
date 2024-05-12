import Logo from "@/assets/logo";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

export default function Navbar() {
  return (
    <>
      <nav className=" fixed pr-20 md:pr-7 right-0 left-0 flex top-0 z-50 shadow-sm h-[60px] items-center justify-between py-2 border-b px-7 bg-lightColor-900 border-border-100 dark:border-darkColor-400 dark:bg-darkColor-200 ">
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="items-center hidden px-4 text-gray-400 border rounded-md md:flex dark:text-lightColor-500 bg-lightColor-700 dark:bg-darkColor-300 border-border-100 ">
          <span className="text-xl ">
            <FiSearch />
          </span>
          <input
            className="w-[400px] placeholder:text-gray-400 placeholder:dark:text-lightColor-500 bg-lightColor-700 dark:bg-darkColor-300 focus:outline-none  p-2 "
            type="text"
            placeholder="Search anything globally"
          />
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <img
            className="w-8 rounded-full aspect-square"
            src="/avatar.jpg"
            alt=""
          />
        </div>
      </nav>
      <Sidebar />
      <RightSidebar />
    </>
  );
}
