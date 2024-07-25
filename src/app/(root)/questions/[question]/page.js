// @ts-check
import QuestionCard from "@/components/shared/QuestionCard";

async function getData({question}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/questions/slug/${question}`
  );

  return res.json();
}

export default async function AskQuestion({params}) {
  const question = params.question;

  const data = await getData({question});

  return (
    <div className="p-4">
      <QuestionCard
        id={data?.data?._id}
        slug={data?.data?.slug}
        author={data?.data?.author?.fullname}
        author_username={data?.data?.author?.username}
        author_profile_img={data?.data?.author?.avatar}
        title={data?.data?.title}
        published_at={data?.data?.created_at}
        content={data?.data?.content}
        comment={[]}
        tags={data?.data?.tags}
      />
    </div>
  );
}
