"use client";
import {navLinks} from "@/constants";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {useState} from "react";
import {IoMenu, IoClose} from "react-icons/io5";
import {Button} from "@nextui-org/button";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <div
        className={`${
          open ? "" : "translate-x-[-100%]"
        } dark:border-dark-400 fixed bottom-0 left-0 top-[60px] z-30 flex h-[calc(100vh-60px)] w-[220px] flex-col justify-between gap-4 overflow-y-auto border-r border-border-100 bg-lightColor-900 p-4 transition-transform duration-300 dark:border-darkColor-400 dark:bg-darkColor-200 md:translate-x-0`}
      >
        <div className="flex flex-col gap-3">
          {navLinks.map((item) => {
            const isActive =
              (pathname.includes(item.slug) && item.slug.length > 1) ||
              pathname === item.slug
                ? "bg-gradient-primary text-white"
                : "bg-transparent";
            return (
              <div key={item?.slug}>
                <Link href={item?.slug} onClick={() => setOpen(false)}>
                  <Button
                    className={` ${isActive} flex w-full items-center justify-start gap-4 rounded-md px-4 py-6 text-base hover:bg-lightColor-700 dark:hover:bg-darkColor-400`}
                  >
                    {item?.icon}
                    {item?.label}
                  </Button>
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
        } fixed inset-0 top-[60px] z-10 bg-[#00000036] dark:bg-[#01010299]`}
      >
        {/* Maskable Area */}
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="fixed right-5 top-0 z-50 flex h-[60px] items-center justify-center p-2 text-3xl md:hidden"
      >
        {open ? <IoClose /> : <IoMenu />}
      </button>
    </>
  );
}
