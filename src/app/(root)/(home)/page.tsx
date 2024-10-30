"use client";
import ConvertToReadableDateTimeUI from "@/components/function/convertDateTime";
import {useInfiniteQuery} from "@tanstack/react-query";
import axios from "axios";
import {useInView} from "react-intersection-observer";
import BlogCard from "@/components/shared/BlogCard";
import {useEffect} from "react";
import QuestionCard from "@/components/shared/QuestionCard";
import {Spinner} from "@nextui-org/spinner";
import {useRouter, useSearchParams} from "next/navigation";
import {Suspense} from "react";
import {RxCross2} from "react-icons/rx";

const PageContent = () => {
  const {ref, inView} = useInView();
  const searchParams = useSearchParams();
  const tag = searchParams.get("tags");
  const tagQuery = tag ? `&tag=${tag}` : "";
  const router = useRouter();

  const fetchFeed = async ({pageParam}) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/feed?page=${pageParam}${tagQuery}`;
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
    queryKey: ["feed", tag],
    queryFn: fetchFeed,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60,
    // @ts-ignore
    keepPreviousData: true,
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

  const TagComponent = () => (
    <button
      onClick={() => {
        router.push("/");
      }}
      className="mb-4 flex w-max cursor-pointer items-center gap-2 rounded-lg border border-border-100 px-2 py-1 text-sm dark:border-darkColor-400 dark:bg-darkColor-300"
    >
      {tag}
      <RxCross2 />{" "}
    </button>
  );

  return (
    <>
      <main className="p-4">
        {tag ? <TagComponent /> : null}
        <div className="flex flex-col gap-4">
          {data?.pages?.map((page) => {
            return page?.data?.map((post) =>
              post.type === "blog" ? (
                <BlogCard
                  // id={post?._id}
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
              <Spinner />
            </div>
          ) : (
            <div className="text-center">No more posts</div>
          )}
          <div ref={ref} className="min-h-10"></div>
        </div>
      </main>
    </>
  );
};

const Page = () => {
  return (
    <>
      <Suspense>
        <PageContent />
      </Suspense>
    </>
  );
};
export default Page;
