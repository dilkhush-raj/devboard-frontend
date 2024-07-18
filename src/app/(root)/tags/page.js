import Tag from "@/components/ui/Tag";
import Link from "next/link";

async function getTagsData() {
  const page = 1;
  const limit = 50;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/tags/list?page=${page}&limit=${limit}`,
    {next: {revalidate: 86400}}
  );
  if (!res.ok) {
    throw new Error("Failed to fetch tag data");
  }
  return res.json();
}

export default async function TagsPage() {
  const data = await getTagsData();

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3">
      {data?.data?.tags?.map((tag) => (
        <Link
          href={`/?tags=${tag?.name}`}
          key={tag?._id}
          className="flex flex-col gap-2 rounded-lg border border-transparent bg-white p-4 shadow-sm dark:border-darkColor-400 dark:bg-darkColor-200"
        >
          <Tag>{tag?.name}</Tag>
          <p className="text-lightColor-300 text-sm dark:text-lightColor-600">
            {tag?.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
