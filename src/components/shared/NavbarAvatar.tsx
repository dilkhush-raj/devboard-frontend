"use client";
import Link from "next/link";
import {useState} from "react";
import {Ripple} from "react-ripple-click";
import {useUserStore} from "@/stores/useUserStore";
import axios from "axios";
import Avatar from "../ui/Avatar";
import Tag from "../ui/Tag";

export default function NavbarAvatar({imgSrc}) {
  const [open, setOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  const useResetUser = useUserStore((state) => state.resetUser);

  const handleLogout = async (data) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/users/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    useResetUser();
    setOpen(false);
  };

  return (
    <>
      <div>
        {/* @ts-ignore */}
        {user?._id ? (
          <>
            <button onClick={() => setOpen(!open)}>
              <Avatar src={user?.avatar} size={35} isBordered={true} alt={""} />
            </button>

            {open && (
              <div className="fixed right-2 top-[68px] z-10 flex w-max min-w-[300px] flex-col overflow-hidden rounded-lg border border-border-100 bg-lightColor-850 text-base dark:border-darkColor-400 dark:bg-darkColor-300">
                <div className="flex items-center justify-between gap-2 p-4 pb-0">
                  <Link
                    href={`/@${user?.username}`}
                    onClick={() => setOpen(false)}
                    className="underline-offset-4 hover:underline"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="underline-offset-4 hover:underline"
                  >
                    Logout
                  </button>
                </div>
                <div className="flex flex-col items-center gap-2 p-10 py-4">
                  <Avatar
                    src={user?.avatar}
                    size={100}
                    isBordered={true}
                    alt={""}
                  />
                  <div className="text-center">
                    <div className="whitespace-nowrap text-xl font-bold">
                      {user?.fullname}
                    </div>
                    <Link
                      href={`/@${user?.username}`}
                      onClick={() => setOpen(false)}
                      className="text-sm text-primary-400 underline-offset-4 hover:underline"
                    >
                      @{user?.username}
                    </Link>
                  </div>
                </div>
                <div className="mb-4 flex items-center justify-center gap-4 text-sm">
                  <Link
                    onClick={() => setOpen(false)}
                    href={"/blogs/new"}
                    className="underline-offset-4 hover:underline"
                  >
                    Write an article
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    href={"/questions/new"}
                    className="underline-offset-4 hover:underline"
                  >
                    Ask a question
                  </Link>
                </div>
                <div className="flex items-center gap-2 p-10 pt-0">
                  {user?.interests?.map((interest) => (
                    <Link
                      // @ts-ignore
                      href={`/?tags=${interest?.name}`}
                      // @ts-ignore
                      key={interest?._id}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2"
                    >
                      {/* @ts-ignore */}
                      <Tag>{interest?.name}</Tag>
                    </Link>
                  ))}
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
            className={`relative isolate flex items-center justify-start gap-4 overflow-hidden rounded-md bg-gradient-primary px-2 py-1 text-sm text-lightColor-900`}
          >
            Log In
            <Ripple />
          </Link>
        )}
      </div>
    </>
  );
}
