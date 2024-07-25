"use client";
import ConvertToReadableDateTimeUI from "@/components/function/convertDateTime";
import {useInfiniteQuery} from "@tanstack/react-query";
import axios from "axios";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import QuestionCard from "@/components/shared/QuestionCard";
import {Spinner} from "@nextui-org/react";

const page = () => {
  const {ref, inView} = useInView();

  const fetchFeed = async ({pageParam}) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/feed/question?page=${pageParam}&limit=5`;
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
    queryKey: ["ask-question"],
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
    <main className="p-4">
      <div className="flex flex-col gap-4">
        {data?.pages?.map((page) => {
          return page?.data?.map((post) => (
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
};
export default page;
