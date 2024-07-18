import Link from "next/link";
import Logo from "@/assets/logo";
import Sidebar from "@/components/Sidebar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import RightSidebar from "@/components/RightSidebar";
import Search from "@/components/shared/Search";
import NavbarAvatar from "./shared/NavbarAvatar";

export default function Navbar() {
  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-40 flex h-[60px] items-center justify-between border-b border-border-100 bg-lightColor-900 px-2 py-2 shadow-sm dark:border-darkColor-400 dark:bg-darkColor-200 sm:px-5">
        <div className="flex items-center gap-2 sm:gap-4">
          <Sidebar />
          <Link href={"/"}>
            <Logo />
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
