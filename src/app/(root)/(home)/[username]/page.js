"use client";
import {usePathname} from "next/navigation";
import ErrorPage from "next/error";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {IoCalendar} from "react-icons/io5";
import Empty from "@/components/ui/Empty";
import Tag from "@/components/ui/Tag";

const UserProfile = () => {
  const pathname = usePathname();
  const username = pathname.slice(1);

  const fetchUser = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/users/user`;
    console.log(url);
    const res = await axios.get(url, {
      params: {
        username: username.slice(1),
      },
    });
    return res?.data;
  };

  const {isLoading, isError, data, error} = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 60, // Cache for an hour
  });

  if (!username.startsWith("@")) {
    return <ErrorPage statusCode={404} />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <ErrorPage statusCode={404} />;
  }
  const joinedData = new Date(data?.data?.created_at);
  const joinedDate = joinedData.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <main className="p-4">
      <div className="grid min-h-52 w-full rounded-lg border border-border-100 dark:border-darkColor-400 dark:bg-darkColor-200 sm:grid-cols-[200px_1fr]">
        <img
          src={data?.data?.avatar}
          alt={data?.data?.username}
          width={150}
          height={150}
          className="m-auto aspect-square rounded-full object-cover"
        />
        <div className="flex flex-col justify-end px-6 py-10">
          <div className="text-2xl font-semibold">{data?.data?.fullname}</div>
          <div className="text-sm text-darkColor-150 dark:text-zinc-400">
            @{data?.data?.username}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <IoCalendar /> Joined {joinedDate}
          </div>
          <div className="mt-4 text-justify text-sm">{data?.data?.bio}</div>
        </div>
      </div>

      <div className="mt-4 w-full rounded-lg border border-border-100 p-6 dark:border-darkColor-400 dark:bg-darkColor-200">
        <h3 className="text-xl font-semibold">Stats</h3>
        <hr className="my-2 border-border-100 dark:border-darkColor-400" />
        <div className="flex gap-4 pt-2">
          <Tag>Questions: 0</Tag>
          <Tag>Answers: 0</Tag>
          <Tag>Points: 0</Tag>
          <Tag>Leaderboard Rank: 0</Tag>
        </div>
      </div>

      <div className="mt-4 w-full rounded-lg border border-border-100 p-6 dark:border-darkColor-400 dark:bg-darkColor-200">
        <h3 className="text-xl font-semibold">Top Posts</h3>
        <hr className="my-2 border-border-100 dark:border-darkColor-400" />
        <Empty>No posts yet</Empty>
      </div>
    </main>
  );
};

export default UserProfile;
