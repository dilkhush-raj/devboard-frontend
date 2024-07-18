import {Avatar} from "@nextui-org/react";
import {IoCalendar} from "react-icons/io5";
import Posts from "@/components/user/Posts";

async function getUserData({username}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/users/user?username=${username}`,
    {next: {revalidate: 7200}}
  );
  if (!res.ok) {
    throw new Error("Failed to fetch tag data");
  }
  return res.json();
}

export default async function UserProfile({params: {username}}) {
  const user = username.slice(3);
  const data = await getUserData({username: user});

  const joinedData = new Date(data?.data?.created_at);
  const joinedDate = joinedData.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="p-4">
      <div className="flex min-h-52 w-full grid-cols-[200px_1fr] rounded-lg border border-border-100 p-4 dark:border-darkColor-400 dark:bg-darkColor-200">
        <Avatar
          src={data?.data?.avatar}
          disableAnimation
          classNames={{
            base: "bg-gradient-to-br  flex-shrink-0 from-[#2563EB] m-auto aspect-square w-[80px] h-[80px] sm:h-[150px] sm:w-[150px] rounded-full object-cover to-[#2196F3]",
            icon: "text-black/80",
          }}
        />
        <div className="flex w-full flex-col justify-end px-6 py-10 pr-0">
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
      <Posts user={data?.data?._id} />
    </main>
  );
}
