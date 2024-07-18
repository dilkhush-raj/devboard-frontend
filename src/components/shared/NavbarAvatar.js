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
        {user?._id ? (
          <>
            <button onClick={() => setOpen(!open)}>
              <Avatar src={user?.avatar} size={35} isBordered={true} />
            </button>

            {open && (
              <div className="fixed right-2 top-[68px] z-10 flex w-max min-w-[300px] flex-col overflow-hidden rounded-lg border border-border-100 bg-darkColor-300 text-base dark:border-darkColor-400">
                <div className="flex items-center justify-between gap-4 p-4 pb-0">
                  <Link
                    href={`/@${user?.username}`}
                    onClick={() => setOpen(false)}
                    className="text-sm"
                  >
                    My Profile
                  </Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
                <d className="flex flex-col items-center gap-2 p-10 pt-5">
                  <Avatar src={user?.avatar} size={100} isBordered={true} />
                  <div className="whitespace-nowrap text-xl font-bold">
                    {user?.fullname}
                  </div>
                  <Link
                    href={`/@${user?.username}`}
                    onClick={() => setOpen(false)}
                    className="text-sm"
                  >
                    @{user?.username}
                  </Link>
                </d>
                <div className="flex items-center gap-2 p-10 pt-0">
                  {user?.interests?.map((interest) => (
                    <Link
                      href={`/?tags=${interest?.name}`}
                      key={interest?._id}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2"
                    >
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
