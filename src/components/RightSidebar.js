"use client";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import Tag from "./ui/Tag";

export default function RightSidebar() {
  const fetchTags = async () => {
    const res = await axios.get(`http://localhost:8000/api/v1/tags/list`);
    return res?.data;
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <div className="fixed hidden lg:flex lg:flex-col top-[60px] bottom-0 p-2 right-0 h-[calc(100vh-60px)] border-l dark:border-dark-400 border-border-100 w-[300px] overflow-y-auto bg-lightColor-900  dark:border-darkColor-400  dark:bg-darkColor-200 ">
      <h2 className="my-4 text-lg font-semibold">Popular Tags</h2>
      <div className="flex flex-wrap gap-2 ">
        {data?.data?.map((tag) => (
          <Tag key={tag?._id}>{tag?.name}</Tag>
        ))}
      </div>
    </div>
  );
}
