import EditBlog from "./EditAnswer";

async function getData({id}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/blogs/blog/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async ({params}) => {
  const id = params.id;
  const data = await getData({id});

  return (
    <div>
      {/* Update Blog */}
      <EditBlog data={data.data} />
    </div>
  );
};

export default page;
