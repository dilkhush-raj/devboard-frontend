import {TracingBeam} from "@/components/ui/tracing-beam";
import Article from "./Article";

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
  return (
    <main className="p-4 px-10 pl-20">
      <TracingBeam>
        <div>
          <h1 className="text-3xl font-bold">{data?.data?.title}</h1>
          <picture>
            <img src={data?.data?.banner} alt={data?.data?.title} />
          </picture>
          <Article data={data?.data?.content} />
        </div>
      </TracingBeam>
    </main>
  );
}
