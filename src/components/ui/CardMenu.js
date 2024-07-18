"use client";
import {useState} from "react";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {CardMenuData} from "@/constants";
import axios from "axios";

export default function CardMenu({contentType, id}) {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    // post request to save blog to /api/v1/saved/create
    axios.post("/api/v1/saved/create", {
      content: id,
      contentType: contentType,
    });
  };

  return (
    <>
      <div className="pr-2 text-lg" onClick={() => setOpen(!open)}>
        <HiOutlineDotsVertical />
      </div>
      <div
        className={`${
          open ? "visible" : "hidden"
        } absolute right-8 top-14 z-20 flex min-w-40 flex-col gap-4 rounded-lg bg-lightColor-850 p-4 shadow-md dark:bg-darkColor-400`}
      >
        {CardMenuData?.map((item) => (
          <div
            key={item.label}
            className={`${item.color} flex cursor-pointer items-center gap-2 rounded-lg`}
            onClick={() => {
              item?.onClick({contentType, id});
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
        className={`${open ? "visible" : "hidden"} fixed inset-0 z-10`}
      >
        {/* Maskable Area */}
      </div>
    </>
  );
}
