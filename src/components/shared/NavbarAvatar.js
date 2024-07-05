"use client";

import {NavbarAvatarMenuData} from "@/constants";
import {Avatar} from "@nextui-org/react";
import Link from "next/link";
import {useState} from "react";
import {Ripple} from "react-ripple-click";
import {IoLogOut} from "react-icons/io5";

export default function NavbarAvatar({imgSrc}) {
  const [open, setOpen] = useState(false);
  let user = true;

  return (
    <>
      <div>
        {user ? (
          <>
            <Avatar
              src={imgSrc}
              isBordered
              size="sm"
              className="z-20"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="fixed right-8 top-[60px] z-10 flex w-full max-w-[200px] flex-col overflow-hidden rounded-lg border border-border-100 bg-darkColor-300 text-lg dark:border-darkColor-400">
                {NavbarAvatarMenuData.map((item, index) => (
                  <Link
                    href={item?.link}
                    key={index}
                    onClick={() => setOpen(!open)}
                    className="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-darkColor-400"
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </Link>
                ))}
                <div
                  onClick={() => {
                    setOpen(!open);
                    alert("Logout");
                  }}
                  className="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-darkColor-400"
                >
                  <div className="flex items-center gap-2">
                    <IoLogOut />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            )}
            {open && (
              <div
                onClick={() => setOpen(!open)}
                className="fixed inset-0 bg-black/30"
              />
            )}
          </>
        ) : (
          <Link
            href={"/login"}
            className={`relative isolate flex items-center justify-start gap-4 overflow-hidden rounded-md bg-gradient-primary px-4 py-2 text-lightColor-900`}
          >
            Log In
            <Ripple />
          </Link>
        )}
      </div>
    </>
  );
}
