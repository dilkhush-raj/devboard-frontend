"use client";
import {Spinner, Avatar} from "@nextui-org/react";
import {useInfiniteQuery} from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import confetti from "canvas-confetti";
import {PiConfettiBold} from "react-icons/pi";

const page = () => {
  const {ref, inView} = useInView();
  const ref2 = useRef(null);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const fetchFeed = async ({pageParam}) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/leaderboard?page=${pageParam}&limit=10`;
    const res = await axios.get(url);
    return res?.data;
  };

  const {
    data,
    isError,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchFeed,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });

  const handleConfetti = () => {
    if (data?.pages?.length !== 0 && ref2.current) {
      setIsConfettiActive(true);
      const element = ref2.current;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const bottomY =
        viewportHeight / (element.clientHeight + element.offsetTop);
      const end = Date.now() + 2 * 1000;
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1", "#FE9C16"];

      const frame = () => {
        if (Date.now() > end) {
          setIsConfettiActive(false);
          return;
        }

        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: {x: element.offsetLeft / viewportWidth, y: bottomY},
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: {
            x: (element.offsetLeft + element.offsetWidth) / viewportWidth,
            y: bottomY,
          },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };
      frame();
    }
  };

  useEffect(() => {
    handleConfetti();
  }, [data, ref2]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-60px)] w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No feed found</div>;
  }

  const getOrdinal = (number) => {
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
  };

  // Flatten the pages array to get all users
  const allUsers = data.pages.flatMap((page) => page.data);
  const topThreeUsers = allUsers.slice(0, 3);
  const remainingUsers = allUsers.slice(3);

  return (
    <main ref={ref2} className="relative">
      <div className="relative mb-4 flex items-end justify-center border-b border-border-100 bg-gradient-to-tr from-[#b5c6e0] to-[#ebf4f5] px-2 pt-[200px] dark:border-darkColor-400 dark:from-[#000000] dark:to-[#130F40]">
        {/* 2nd */}
        <button
          onClick={handleConfetti}
          className="absolute bottom-5 left-5 z-10 text-xl"
          disabled={isConfettiActive}
        >
          <PiConfettiBold />
        </button>
        <div className="relative flex h-[300px] w-40 justify-center rounded-tl-lg border-border-100 bg-gradient-to-tr from-[#61f4de] to-[#6e78ff]">
          {topThreeUsers[1] && (
            <Link
              href={`/@${topThreeUsers[1].username}`}
              className="flex flex-col items-center justify-end py-10"
            >
              <div className="absolute top-[-100px] flex flex-col items-center justify-center gap-1">
                <Avatar
                  src={topThreeUsers[1].avatar}
                  isBordered
                  classNames={{
                    base: "bg-gradient-to-br from-[#2563EB] to-[#2196F3]",
                    icon: "text-black/80",
                  }}
                />
                <div>{topThreeUsers[1].fullname}</div>
                <div className="text-xs">@{topThreeUsers[1].username}</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img
                  src="/badges/Silver.svg"
                  className="aspect-square w-20 object-contain"
                />
                <div className="text-3xl font-bold">2nd</div>
                <div>{topThreeUsers[1].credit} pts</div>
              </div>
            </Link>
          )}
        </div>
        {/* 1st */}
        <div className="relative flex h-[400px] w-40 justify-center rounded-t-lg bg-gradient-to-tr from-[#e62314] to-[#f19e18]">
          {topThreeUsers[0] && (
            <Link
              href={`/@${topThreeUsers[0].username}`}
              className="flex flex-col items-center justify-end py-10"
            >
              <div className="absolute top-[-100px] flex flex-col items-center justify-center gap-1">
                <Avatar
                  src={topThreeUsers[0].avatar}
                  isBordered
                  classNames={{
                    base: "bg-gradient-to-br from-[#2563EB] to-[#2196F3]",
                    icon: "text-black/80",
                  }}
                />
                <div>{topThreeUsers[0].fullname}</div>
                <div className="text-xs">@{topThreeUsers[0].username}</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img
                  src="/badges/Champion.svg"
                  className="aspect-square w-20 object-contain"
                />
                <div className="text-3xl font-bold">1st</div>
                <div>{topThreeUsers[0].credit} pts</div>
              </div>
            </Link>
          )}
        </div>
        {/* 3rd */}
        <div className="relative flex h-[250px] w-40 justify-center rounded-tr-lg bg-gradient-to-tr from-[#51c26f] to-[#f2e901]">
          {topThreeUsers[2] && (
            <Link
              href={`/@${topThreeUsers[2].username}`}
              className="flex flex-col items-center justify-end py-10"
            >
              <div className="absolute top-[-100px] flex flex-col items-center justify-center gap-1">
                <Avatar
                  src={topThreeUsers[2].avatar}
                  isBordered
                  classNames={{
                    base: "bg-gradient-to-br from-[#2563EB] to-[#2196F3]",
                    icon: "text-black/80",
                  }}
                />
                <div>{topThreeUsers[2].fullname}</div>
                <div className="text-xs">@{topThreeUsers[2].username}</div>
              </div>
              <dvi className="flex flex-col items-center justify-center">
                <img
                  src="/badges/gold.svg"
                  className="aspect-square w-20 object-contain"
                />
                <div className="text-3xl font-bold">3rd</div>
                <div>{topThreeUsers[2].credit} pts</div>
              </dvi>
            </Link>
          )}
        </div>
      </div>
      {/* Remaining users */}
      <div className="flex flex-col gap-2 p-2 sm:gap-4 sm:p-4">
        {remainingUsers.map((user, index) => (
          <div
            key={user.username}
            className="grid grid-cols-[1fr_80px] items-center justify-between rounded-lg border border-border-100 p-2 dark:border-darkColor-400 dark:bg-darkColor-300 sm:grid-cols-2 sm:gap-2 sm:p-4 sm:pr-8"
          >
            <Link
              href={`/@${user.username}`}
              className="flex w-[180px] items-center gap-4"
            >
              <picture className="aspect-square w-10 overflow-hidden rounded-full object-contain">
                <source srcSet={user.avatar} type="image/webp" />
                <Avatar
                  src={user.avatar}
                  classNames={{
                    base: "bg-gradient-to-br from-[#2563EB] to-[#2196F3]",
                    icon: "text-black/80",
                  }}
                />
              </picture>
              <div className="flex flex-col">
                <div>{user.fullname}</div>
                <div className="text-xs text-darkColor-150 dark:text-zinc-400">
                  @{user.username}
                </div>
              </div>
            </Link>
            <div className="flex items-center justify-between">
              <div className="flex items-center">{user.credit} pts</div>
              <div className="flex items-center">{getOrdinal(index + 4)}</div>
            </div>
          </div>
        ))}
        {isFetchingNextPage ? (
          <div className="flex min-h-80 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            No more users
          </div>
        )}
        <div ref={ref} className="min-h-10"></div>
      </div>
    </main>
  );
};

export default page;
