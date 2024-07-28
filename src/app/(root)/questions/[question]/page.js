// @ts-check
import ConvertToReadableDateTimeUI from "@/components/function/convertDateTime";
import Save from "@/components/function/handleSave";
import DeleteQuestion from "@/components/questions/deleteQuestion";
import FetchAnswers from "@/components/questions/fetchAnswers";
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
    <div className="relative p-4">
      <QuestionCard
        id={data?.data?._id}
        slug={data?.data?.slug}
        author={data?.data?.author?.fullname}
        author_username={data?.data?.author?.username}
        author_profile_img={data?.data?.author?.avatar}
        title={data?.data?.title}
        published_at={ConvertToReadableDateTimeUI(data?.data?.createdAt)}
        content={data?.data?.content}
        comment={[]}
        tags={data?.data?.tags}
      />
      <div className="absolute right-8 top-6">
        <Save contentType="Question" id={data?.data?._id} />
      </div>
      <div className="absolute right-16 top-6">
        <DeleteQuestion userId={data?.data?.author?._id} id={data?.data?._id} />
      </div>
      <div>
        <FetchAnswers questionId={data?.data?._id} />
      </div>
    </div>
  );
}
