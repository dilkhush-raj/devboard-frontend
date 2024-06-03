"use client";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import Tag from "@/components/ui/Tag";
import Loading from "./loading";
import Empty from "@/components/ui/Empty";

export default function TagsPage() {
  const fetchTags = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/tags/list`
    );
    return res?.data;
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 60,
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    console.log(error);
  }

  if (!data) {
    return (
      <div className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center">
        <Empty>No Tags Found</Empty>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3">
      {data?.data?.map((tag) => (
        <div
          key={tag?._id}
          className="flex flex-col gap-2 rounded-lg bg-white p-4 shadow-sm dark:bg-darkColor-200"
        >
          <Tag>{tag?.name}</Tag>
          <p className="text-lightColor-300 text-sm dark:text-lightColor-600">
            {tag?.description}
          </p>
        </div>
      ))}
    </div>
  );
}
