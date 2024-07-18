import Tag from "./ui/Tag";
import Link from "next/link";

async function getTagData() {
  const page = 1;
  const limit = 15;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/tags/list?page=${page}&limit=${limit}`,
    {next: {tags: ["collection"]}}
  );
  if (!res.ok) {
    throw new Error("Failed to fetch tag data");
  }
  return res.json();
}

async function getBlogData() {
  const page = 1;
  const limit = 4;
  const sort = "-like";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/blogs/likes?page=${page}&limit=${limit}&sort=${sort}`,
    {next: {revalidate: 86400}}
  );
  if (!res.ok) {
    throw new Error("Failed to fetch blog data");
  }
  return res.json();
}

export default async function RightSidebar() {
  const tagData = await getTagData();
  const blogData = await getBlogData();

  return (
    <div className="dark:border-dark-400 fixed bottom-0 right-0 top-[60px] hidden h-[calc(100vh-60px)] w-[300px] overflow-y-auto border-l border-border-100 bg-lightColor-900 p-2 dark:border-darkColor-400 dark:bg-darkColor-200 lg:flex lg:flex-col">
      <h2 className="text-lg font-semibold text-primary-400">
        Popular Articles
      </h2>
      <div className="flex flex-col flex-wrap gap-1">
        {blogData?.data?.map((blog) => (
          <Link
            key={blog?._id}
            href={`/blogs/${blog?.slug}`}
            className="flex gap-2 border-b border-border-100 pb-2 dark:border-darkColor-400"
          >
            <div className="underlineborder break-words rounded-lg p-2 text-sm font-medium shadow-sm">
              {blog?.title}
            </div>
          </Link>
        ))}
      </div>
      <h2 className="mb-2 mt-4 text-lg font-semibold text-primary-400">
        Popular Tags
      </h2>
      <div className="flex flex-wrap gap-2">
        {tagData?.data?.tags?.map((tag) => (
          <Link key={tag?._id} href={`/?tags=${tag?.name}`}>
            <Tag>{tag?.name}</Tag>
          </Link>
        ))}
      </div>
    </div>
  );
}
