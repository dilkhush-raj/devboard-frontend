"use client";
import {navLinks} from "@/constants";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {useState} from "react";
import {IoMenu, IoClose} from "react-icons/io5";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <div
        className={`${
          open ? "" : " translate-x-[-100%] "
        } z-30 md:translate-x-0 fixed transition-transform duration-300 flex flex-col gap-4 justify-between top-[60px] bottom-0 p-4 left-0 h-[calc(100vh-60px)] border-r dark:border-dark-400 border-border-100 dark:border-darkColor-400 w-[220px] overflow-y-auto bg-lightColor-900 dark:bg-darkColor-200 `}
      >
        <div className="flex flex-col gap-3">
          {navLinks.map((item) => {
            const isActive =
              (pathname.includes(item.slug) && item.slug.length > 1) ||
              pathname === item.slug;
            return (
              <div key={item?.slug}>
                <Link
                  href={item?.slug}
                  onClick={() => setOpen(false)}
                  className={`${
                    isActive ? " bg-gradient-primary text-lightColor-900 " : ""
                  } flex items-center hover:bg-lightColor-700 dark:hover:bg-darkColor-400 justify-start gap-4 bg-transparent py-3 px-4 rounded-md `}
                >
                  {item?.icon}
                  {item?.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div
        onClick={() => setOpen(!open)}
        className={`${
          open ? "" : "hidden"
        } fixed inset-0 top-[60px] bg-[#00000036] dark:bg-[#01010299] z-10`}
      >
        {/* Maskable Area */}
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="fixed md:hidden top-0 right-5 z-50 p-2 flex items-center justify-center text-3xl h-[60px] "
      >
        {open ? <IoClose /> : <IoMenu />}
      </button>
    </>
  );
}
