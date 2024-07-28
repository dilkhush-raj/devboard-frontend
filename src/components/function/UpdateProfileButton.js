"use client";
import useUserStore from "@/stores/useUserStore";
import Link from "next/link";

export default function UpdateProfileButton({user, username}) {
  const userStore = useUserStore((state) => state);

  if (userStore?.isAuth && userStore?.user?._id === user) {
    return (
      <Link
        href={`/@${username}/update`}
        className="transition-colors duration-500 hover:text-primary-400"
      >
        Update Profile
      </Link>
    );
  }

  return null;
}
