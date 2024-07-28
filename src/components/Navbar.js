import Link from "next/link";
import {Gugi} from "next/font/google";
import Sidebar from "@/components/Sidebar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import RightSidebar from "@/components/RightSidebar";
import Search from "@/components/shared/Search";
import NavbarAvatar from "./shared/NavbarAvatar";

const gugi = Gugi({subsets: ["latin"], weight: ["400"]});
export default function Navbar() {
  return (
    <>
      <nav className="dark:bg-dark-800 fixed left-0 right-0 top-0 z-40 flex h-[60px] items-center justify-between border-b border-border-100 bg-lightColor-900 px-2 py-2 shadow-sm dark:border-darkColor-400 sm:px-5">
        <div className="flex items-center gap-2 sm:gap-4">
          <Sidebar />
          <Link href={"/"} className={gugi.className + " text-xl"}>
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              DEV
            </span>{" "}
            Board
          </Link>
        </div>
        <Search />
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeSwitcher />
          <NavbarAvatar imgSrc={"/avatar.jpg"} />
        </div>
      </nav>
      <RightSidebar />
    </>
  );
}
