"use client";
import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CardMenuData } from "@/constants";

export default function CardMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="pr-2 text-lg" onClick={() => setOpen(!open)}>
        <HiOutlineDotsVertical />
      </div>
      <div
        className={`${
          open ? "visible" : "hidden"
        } z-20 absolute top-14 right-8 flex gap-4 flex-col shadow-md min-w-40 bg-lightColor-850 rounded-lg dark:bg-darkColor-400 p-4`}
      >
        {CardMenuData?.map((item) => (
          <div
            key={item.label}
            className={`${item.color} flex items-center gap-2 cursor-pointer rounded-lg`}
            onClick={() => {
              item?.onClick();
              setOpen(!open);
            }}
          >
            {item?.icon}
            <div>{item?.label}</div>
          </div>
        ))}
      </div>
      <div
        onClick={() => setOpen(!open)}
        className={`${open ? "visible" : "hidden"} z-10 fixed inset-0`}
      >
        {/* Maskable Area */}
      </div>
    </>
  );
}