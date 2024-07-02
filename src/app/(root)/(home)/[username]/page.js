"use client";
import {usePathname} from "next/navigation";
import ErrorPage from "next/error";
import {useEffect, useState} from "react";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useInView} from "react-intersection-observer";
import {IoCalendar} from "react-icons/io5";
import Tag from "@/components/ui/Tag";
import BlogCard from "@/components/shared/BlogCard";
import ConvertToReadableDateTimeUI from "@/components/function/convertDateTime";
import {Spinner} from "@nextui-org/react";
import QuestionCard from "@/components/shared/QuestionCard";
import Posts from "./Posts";

const UserProfile = () => {
  const pathname = usePathname();
  const username = pathname.slice(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const TopPosts = ({author}) => {
    const {ref, inView} = useInView();

    const fetchPosts = async (props) => {
      const author = props?.queryKey[0];
      const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/feed?author=${author}&page=${props?.pageParam}&limit=2`;
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
      queryKey: [author],
      queryFn: fetchPosts,
      initialPageParam: 1,
      staleTime: 1000 * 60 * 60,
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.totalPages) {
          return lastPage.currentPage + 1;
        }
        return undefined;
      },
    });

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

    setTotalBlogs(data?.pages[0]?.totalBlogs);
    setTotalQuestions(data?.pages[0]?.totalQuestions);

    return (
      <div className="w-full py-6">
        <h3 className="text-xl font-semibold">Top Posts</h3>
        <hr className="mb-6 mt-2 border-border-100 dark:border-darkColor-400" />
        <div className="flex flex-col gap-4">
          {data?.pages?.map((page) => {
            return page?.data?.map((post) =>
              post.type === "blog" ? (
                <BlogCard
                  id={post?._id}
                  key={post?._id}
                  author={post?.author?.fullname}
                  author_profile_img={post?.author?.avatar}
                  author_username={post?.author?.username}
                  comment={[]}
                  content={post?.content}
                  published_at={ConvertToReadableDateTimeUI(post?.created_at)}
                  slug={post?.slug}
                  tags={post?.tags}
                  title={post?.title}
                  dislike={post?.dislike}
                  like={post?.like}
                  banner={post?.banner}
                />
              ) : (
                <QuestionCard
                  id={post?._id}
                  key={post?._id}
                  author={post?.author?.fullname}
                  author_profile_img={post?.author?.avatar}
                  author_username={post?.author?.username}
                  comment={[]}
                  content={post?.content}
                  published_at={ConvertToReadableDateTimeUI(post?.created_at)}
                  slug={post?.slug}
                  tags={post?.tags}
                  title={post?.title}
                  dislike={post?.dislike}
                  like={post?.like}
                />
              )
            );
          })}
          {isFetchingNextPage ? (
            <div className="flex min-h-80 items-center justify-center">
              Loading...
            </div>
          ) : (
            <div className="text-center">No more posts</div>
          )}
          <div ref={ref} className="min-h-10"></div>
        </div>
      </div>
    );
  };

  const fetchUser = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/users/user`;
    const res = await axios.get(url, {
      params: {
        username: username.slice(1),
      },
    });
    return res?.data;
  };

  const {isLoading, isError, data, error} = useQuery({
    queryKey: [username],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 60, // Cache for an hour
  });

  if (!username.startsWith("@")) {
    return <ErrorPage statusCode={404} />;
  }

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

      <div className="mt-4 flex w-full gap-4 rounded-lg border border-border-100 p-6 dark:border-darkColor-400 dark:bg-darkColor-200">
        <div className="flex flex-col items-center justify-center gap-2">
          <img
            className="h-18 object-contain"
            src={"/badges/legend.svg"}
            alt="badges"
          />
          <div>Legend</div>
        </div>
        {/* <badgeImage className="h-24 w-24 rounded-full" /> */}
        <div className="w-full">
          <h3 className="text-xl font-semibold">Stats</h3>
          <hr className="my-2 border-border-100 dark:border-darkColor-400" />
          <div className="flex flex-wrap gap-4 pt-2">
            <Tag>Questions: {totalQuestions}</Tag>
            <Tag>Blogs: {totalBlogs}</Tag>
            <Tag>Points: {totalBlogs * 10}</Tag>
            <Tag>Leaderboard Rank: 0</Tag>
          </div>
        </div>
      </div>

      {/* <TopPosts author={data?.data?._id} /> */}

      <Posts user={"6662338196e7a6fedc4229f2"} />
    </main>
  );
};

export default UserProfile;
