import Avatar from "@/components/ui/Avatar";
import {IoCalendar} from "react-icons/io5";
import Posts from "@/components/user/Posts";
import UpdateProfileButton from "@/components/function/UpdateProfileButton";

async function getUserData({username}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/users/user?username=${username}`,
    {next: {revalidate: 7200}}
  );
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
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
      <div className="relative flex min-h-52 w-full grid-cols-[200px_1fr] rounded-lg border border-border-100 p-4 dark:border-darkColor-400 dark:bg-dark-800">
        <div className="flex flex-shrink-0 items-center">
          <Avatar src={data?.data?.avatar} size={150} isBordered={true} />
        </div>
        <div className="flex w-full flex-col justify-end px-6 py-10 pr-0">
          <div className="text-2xl font-semibold">{data?.data?.fullname}</div>
          <div className="text-sm text-primary-400">
            @{data?.data?.username}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <IoCalendar /> Joined {joinedDate}
          </div>
          <div className="mt-4 text-justify text-sm">{data?.data?.bio}</div>
        </div>
        <div className="absolute right-2 top-2">
          <UpdateProfileButton user={data?.data?._id} username={user} />
        </div>
      </div>
      <Posts user={data?.data?._id} username={user} />
    </main>
  );
}
