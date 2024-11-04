import Link from "next/link";
import Article from "./Article";
import {convertToReadableDateTime} from "@/components/function/convertDateTime";
import Avatar from "@/components/ui/Avatar";

async function getData({slug}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/blogs/slug/${slug}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function BlogPage({params}) {
  const slug = params.blog;

  const data = await getData({slug});

  const date = convertToReadableDateTime(data?.data?.createdAt);

  return (
    <main suppressHydrationWarning={true}>
      <div className="relative">
        <picture>
          <img
            src={data?.data?.banner || "/placeholder.svg"}
            alt={data?.data?.title}
            className="h-[300px] w-full object-cover"
          />
        </picture>
        <h1 className="my-2 px-4 text-3xl font-bold">{data?.data?.title}</h1>
        <div className="flex justify-between gap-4 px-4">
          <Link
            href={`/@${data?.data?.author?.username}`}
            className="flex items-center gap-2"
          >
            <Avatar
              src={data?.data?.author?.avatar}
              size={40}
              isBordered={true}
              alt={""}
            />
            <div className="flex flex-col justify-center">
              <div className="text-sm">{data?.data?.author?.fullname}</div>
              <div className="text-xs text-primary-400">
                @{data?.data?.author?.username}
              </div>
            </div>
          </Link>
          <div className="my-2 text-sm">{date}</div>
        </div>
        <hr className="my-2 mt-4 border-border-100 dark:border-darkColor-400" />
        <Article
          id={data?.data?._id}
          type={"Blog"}
          data={data?.data?.content}
          userId={data?.data?.author?._id}
        />
      </div>
    </main>
  );
}
