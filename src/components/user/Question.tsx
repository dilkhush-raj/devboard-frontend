"use client";
import ConvertToReadableDateTimeUI from "@/components/function/convertDateTime";
import {useInfiniteQuery} from "@tanstack/react-query";
import axios from "axios";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import {Spinner} from "@nextui-org/spinner";
import QuestionCard from "@/components/shared/QuestionCard";

export default function UserQuestion({author}) {
  const {ref, inView} = useInView();

  const fetchFeed = async ({pageParam}) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/questions/author?author=${author}&page=${pageParam}&limit=2`;
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
    queryKey: ["userQuestion", author],
    queryFn: fetchFeed,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.currentPage < lastPage.data.totalPages) {
        return lastPage.data.currentPage + 1;
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

  return (
    <main className="">
      <div className="flex flex-col gap-4">
        {data?.pages?.map((page) => {
          return page?.data?.questions?.map((post) => (
            <QuestionCard
              id={post?._id}
              key={post?._id}
              author={post?.author?.fullname}
              author_profile_img={post?.author?.avatar}
              author_username={post?.author?.username}
              comment={[]}
              content={post?.content}
              published_at={ConvertToReadableDateTimeUI(post?.createdAt)}
              slug={post?.slug}
              tags={post?.tags}
              title={post?.title}
              dislike={post?.dislike}
              like={post?.like}
            />
          ));
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
    </main>
  );
}
