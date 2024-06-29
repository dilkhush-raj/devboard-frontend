"use client";
import axios from "axios";
import {useInView} from "react-intersection-observer";

const page = () => {
  const {ref, inView} = useInView();

  const fetchFeed = async ({pageParam}) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/leaderboard`;
    const res = await axios.get(url);
    return res?.data;
  };

  const data1 = [
    {
      _id: "5f9ee7ef0e9ae50001d0d1e0",
      username: "John Doe",
      fullname: "John Doe",
      avatar: "https://avatar.iran.liara.run/public/1",
      credit: "100",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1e1",
      username: "Jane Smith",
      fullname: "Jane Smith",
      avatar: "https://avatar.iran.liara.run/public/2",
      credit: "150",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1e2",
      username: "Alice Johnson",
      fullname: "Alice Johnson",
      avatar: "https://avatar.iran.liara.run/public/3",
      credit: "200",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1e3",
      username: "Bob Brown",
      fullname: "Bob Brown",
      avatar: "https://avatar.iran.liara.run/public/4",
      credit: "250",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1e4",
      username: "Charlie Davis",
      fullname: "Charlie Davis",
      avatar: "https://avatar.iran.liara.run/public/5",
      credit: "300",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1e5",
      username: "David Evans",
      fullname: "David Evans",
      avatar: "https://avatar.iran.liara.run/public/6",
      credit: "350",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1e6",
      username: "Ella White",
      fullname: "Ella White",
      avatar: "https://avatar.iran.liara.run/public/7",
      credit: "400",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1e7",
      username: "Frank Green",
      fullname: "Frank Green",
      avatar: "https://avatar.iran.liara.run/public/8",
      credit: "450",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1e8",
      username: "Grace Hall",
      fullname: "Grace Hall",
      avatar: "https://avatar.iran.liara.run/public/9",
      credit: "500",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1e9",
      username: "Henry King",
      fullname: "Henry King",
      avatar: "https://avatar.iran.liara.run/public/10",
      credit: "550",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1ea",
      username: "Ivy Lee",
      fullname: "Ivy Lee",
      avatar: "https://avatar.iran.liara.run/public/11",
      credit: "600",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1eb",
      username: "Jack Miller",
      fullname: "Jack Miller",
      avatar: "https://avatar.iran.liara.run/public/12",
      credit: "650",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1ec",
      username: "Karen Nelson",
      fullname: "Karen Nelson",
      avatar: "https://avatar.iran.liara.run/public/13",
      credit: "700",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1ed",
      username: "Liam Martinez",
      fullname: "Liam Martinez",
      avatar: "https://avatar.iran.liara.run/public/14",
      credit: "750",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1ee",
      username: "Mia Perez",
      fullname: "Mia Perez",
      avatar: "https://avatar.iran.liara.run/public/15",
      credit: "800",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1ef",
      username: "Noah Robinson",
      fullname: "Noah Robinson",
      avatar: "https://avatar.iran.liara.run/public/16",
      credit: "850",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1f0",
      username: "Olivia Scott",
      fullname: "Olivia Scott",
      avatar: "https://avatar.iran.liara.run/public/17",
      credit: "900",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1f1",
      username: "Paul Thomas",
      fullname: "Paul Thomas",
      avatar: "https://avatar.iran.liara.run/public/18",
      credit: "950",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1f2",
      username: "Quinn Walker",
      fullname: "Quinn Walker",
      avatar: "https://avatar.iran.liara.run/public/19",
      credit: "1000",
    },
    {
      _id: "5f9ee7ef0e9ae50001d0d1f3",
      username: "Ruby Young",
      fullname: "Ruby Young",
      avatar: "https://avatar.iran.liara.run/public/20",
      credit: "1050",
    },
  ];

  function getOrdinal(number) {
    const suffixes = ["st", "nd", "rd", "th"];
    const lastDigit = number % 10;

    if (lastDigit === 1 && number % 100 !== 11) {
      return number + suffixes[0];
    } else if (lastDigit === 2 && number % 100 !== 12) {
      return number + suffixes[1];
    } else if (lastDigit === 3 && number % 100 !== 13) {
      return number + suffixes[2];
    } else {
      return number + suffixes[3];
    }
  }

  return (
    <main className="p-4">
      <div className="flex flex-col gap-4">
        {data1.map((user, index) => (
          <div className="flex items-center justify-between gap-2 rounded-lg border border-border-100 p-4 pr-8 dark:border-darkColor-400 dark:bg-darkColor-300">
            <div className="flex w-[180px] items-center gap-4">
              <picture className="aspect-square w-10 overflow-hidden rounded-full object-contain">
                <source srcSet={user?.avatar} type="image/webp" />
                <img src={user?.avatar} alt={user?.username} />
              </picture>
              <div className="flex flex-col">
                <div>{user?.fullname}</div>
                <div className="text-xs text-darkColor-150 dark:text-zinc-400">
                  @{user?.username}
                </div>
              </div>
            </div>
            <div className="flex items-center">{user.credit}</div>
            <div className="flex items-center">{getOrdinal(index + 1)}</div>
          </div>
        ))}
        <div ref={ref} className="min-h-10"></div>
      </div>
    </main>
  );
};
export default page;
