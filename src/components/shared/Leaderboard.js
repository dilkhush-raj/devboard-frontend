"use client";
import {Avatar} from "@nextui-org/react";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import confetti from "canvas-confetti";
import {PiConfettiBold} from "react-icons/pi";
import {motion} from "framer-motion";

export default function Leaderboard({data}) {
  const ref = useRef(null);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const handleConfetti = () => {
    if (data.length !== 0 && ref.current) {
      setIsConfettiActive(true);
      const element = ref.current;
      const viewportWidth = window.innerWidth;
      const end = Date.now() + 100;
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1", "#FE9C16"];

      const frame = () => {
        if (Date.now() > end) {
          setIsConfettiActive(false);
          return;
        }

        confetti({
          particleCount: 5,
          angle: 45,
          spread: 35,
          startVelocity: 60,
          origin: {x: element.offsetLeft / viewportWidth, y: 0.5},
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 135,
          spread: 35,
          startVelocity: 60,
          origin: {
            x: (element.offsetLeft + element.offsetWidth) / viewportWidth,
            y: 0.5,
          },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };
      frame();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleConfetti();
    }, 300);
  }, [data, ref]);

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

  const allUsers = data?.data;
  const topThreeUsers = allUsers.slice(0, 3);
  const remainingUsers = allUsers.slice(3);

  return (
    <main ref={ref} className="relative">
      <div className="mb-4 overflow-hidden">
        <div className="relative flex items-end justify-center border-b border-border-100 bg-gradient-to-tr from-[#b5c6e0] to-[#ebf4f5] px-2 pt-[200px] dark:border-darkColor-400 dark:from-[#000000] dark:to-[#130F40]">
          <button
            onClick={handleConfetti}
            className="absolute bottom-5 left-5 z-10 text-xl"
            disabled={isConfettiActive}
          >
            <PiConfettiBold />
          </button>
          {/* 2nd */}
          <motion.div
            className="relative flex h-[300px] w-40 justify-center rounded-tl-lg border-border-100 bg-gradient-to-tr from-[#61f4de] to-[#6e78ff]"
            initial={{y: 410}}
            animate={{y: 0}}
            transition={{type: "spring", stiffness: 100, delay: 0.1}}
          >
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
          </motion.div>
          {/* 1st */}
          <motion.div
            className="relative flex h-[400px] w-40 justify-center rounded-t-lg bg-gradient-to-tr from-[#e62314] to-[#f19e18]"
            initial={{y: 510}}
            animate={{y: 0}}
            transition={{type: "spring", stiffness: 100, delay: 0.2}}
          >
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
          </motion.div>
          {/* 3rd */}
          <motion.div
            className="relative flex h-[250px] w-40 justify-center rounded-tr-lg bg-gradient-to-tr from-[#51c26f] to-[#f2e901]"
            initial={{y: 360}}
            animate={{y: 0}}
            transition={{type: "spring", stiffness: 100, delay: 0.3}}
          >
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
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="/badges/Gold.svg"
                    className="aspect-square w-20 object-contain"
                  />
                  <div className="text-3xl font-bold">3rd</div>
                  <div>{topThreeUsers[2].credit} pts</div>
                </div>
              </Link>
            )}
          </motion.div>
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
      </div>
    </main>
  );
}
