"use client";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import Tag from "./ui/Tag";
import Link from "next/link";

export default function RightSidebar() {
  const fetchTags = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/v1/tags/list?page=1&limit=20`
    );
    return res?.data;
  };

  const fetchBlogs = async () => {
    const res = await axios.get(`http://localhost:8000/api/v1/blogs/likes`);
    return res?.data;
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 60,
  });

  const {
    isPending: isPendingBlogs,
    isError: isErrorBlogs,
    data: dataBlogs,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 60,
  });

  console.log(dataBlogs);

  return (
    <div className="dark:border-dark-400 fixed bottom-0 right-0 top-[60px] hidden h-[calc(100vh-60px)] w-[300px] overflow-y-auto border-l border-border-100 bg-lightColor-900 p-2 dark:border-darkColor-400 dark:bg-darkColor-200 lg:flex lg:flex-col">
      <h2 className="my-4 text-lg font-semibold">Popular Tags</h2>
      <div className="flex flex-wrap gap-2">
        {data?.data?.tags?.map((tag) => (
          <Tag key={tag?._id}>{tag?.name}</Tag>
        ))}
      </div>

      <h2 className="my-4 text-lg font-semibold">Popular Blog Articles</h2>
      <div className="flex flex-col flex-wrap gap-4">
        {dataBlogs?.data?.map((blog) => (
          <Link key={blog?._id} href={`/blogs/${blog?.slug}`}>
            <div className="underlineborder rounded-lg border border-border-100 bg-white p-2 text-sm font-medium shadow-sm dark:border-darkColor-400 dark:bg-darkColor-300">
              {blog?.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
