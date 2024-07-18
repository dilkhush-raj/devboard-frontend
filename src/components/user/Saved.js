"use client";
import ConvertToReadableDateTimeUI from "@/components/function/convertDateTime";
import {useInfiniteQuery} from "@tanstack/react-query";
import axios from "axios";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import {Spinner} from "@nextui-org/react";
import QuestionCard from "@/components/shared/QuestionCard";
import BlogCard from "@/components/shared/BlogCard";

export default function UserQuestion({author}) {
  const {ref, inView} = useInView();
  const fetchFeed = async ({pageParam}) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/saved/list?page=${pageParam}`;

    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
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
    queryKey: ["userSavedPost", author],
    queryFn: fetchFeed,
    initialPageParam: 1,
    // staleTime: 1000 * 60 * 60,
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

  console.log(data);

  return (
    <main className="">
      <div className="flex flex-col gap-4">
        {data?.pages?.map((page) => {
          return page?.data?.saved?.map((post) =>
            post?.contentType === "Question" ? (
              <QuestionCard
                id={post?.content?._id}
                key={post?.content?._id}
                author={post?.content?.author?.fullname}
                author_profile_img={post?.content?.author?.avatar}
                author_username={post?.content?.author?.username}
                comment={[]}
                content={post?.content?.content}
                published_at={ConvertToReadableDateTimeUI(
                  post?.content?.created_at
                )}
                slug={post?.content?.slug}
                tags={post?.content?.tags}
                title={post?.content?.title}
                dislike={post?.content?.dislike}
                like={post?.content?.like}
              />
            ) : (
              <BlogCard
                id={post?.content?._id}
                key={post?.content?._id}
                author={post?.content?.author?.fullname}
                author_profile_img={post?.content?.author?.avatar}
                author_username={post?.content?.author?.username}
                comment={[]}
                content={post?.content?.content}
                published_at={ConvertToReadableDateTimeUI(
                  post?.content?.created_at
                )}
                slug={post?.content?.slug}
                tags={post?.content?.tags}
                title={post?.content?.title}
                dislike={post?.content?.dislike}
                like={post?.content?.like}
                banner={post?.content?.banner}
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
    </main>
  );
}
