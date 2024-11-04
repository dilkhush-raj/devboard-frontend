"use client";
import ConvertToReadableDateTimeUI from "@/components/function/convertDateTime";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import {useInView} from "react-intersection-observer";
import Answer from "@/components/shared/AnswerCard";
import {useEffect, useRef, useState} from "react";
import {Spinner} from "@nextui-org/spinner";
import Editor from "../editor/Editor";

export default function FetchAnswers({questionId}) {
  const {ref, inView} = useInView();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [editingAnswer, setEditingAnswer] = useState(null);
  const queryClient = useQueryClient();

  const editorRef = useRef(null);

  const fetchFeed = async ({pageParam}) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/answers/question/${questionId}?page=${pageParam}`;
    const res = await axios.get(url);
    return res?.data;
  };

  const {
    data,
    isError,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["answers", questionId],
    queryFn: fetchFeed,
    initialPageParam: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });

  const {mutate: updateAnswer} = useMutation({
    mutationFn: async (data) => {
      const res = await axios
        .put(
          `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/answers/update/${editingAnswer.id}`,
          data,
          {
            headers: {"Content-Type": "application/json"},
            withCredentials: true,
          }
        )
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      // toast.success("Answer updated successfully");
      queryClient.invalidateQueries({queryKey: ["answers", questionId]});
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response?.data?.message || `Failed to update answer`);
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-60px)] w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleDeleteAnswer = (deletedAnswerId) => {
    queryClient.setQueryData(["answers", questionId], (oldData) => {
      return {
        // @ts-ignore
        ...oldData,
        // @ts-ignore
        pages: oldData.pages.map((page) => ({
          ...page,
          answer: page.answer.filter((post) => post._id !== deletedAnswerId),
        })),
      };
    });
  };

  const handleVote = async (answerId, voteType) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/answers/${voteType}/${answerId}`,
        {},
        {withCredentials: true}
      );
      // @ts-ignore
      await queryClient.invalidateQueries(["answers", questionId]);
    } catch (error) {
      // @ts-ignore
      toast.error(error.response?.data?.message || `Failed to ${voteType}`);
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getMarkdown());
    }
  };

  const handleUpdateClick = (answerId, content) => {
    setEditingAnswer({id: answerId, content});
    setOpen(true);
    setContent(content);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const data = {content};
    // @ts-ignore
    updateAnswer(data);
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {content};

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/answers/create/${questionId}`,
        data,
        {
          headers: {"Content-Type": "application/json"},
          withCredentials: true,
        }
      );
      // @ts-ignore
      await queryClient.invalidateQueries(["answers", questionId]);
      setOpen(false);
      setContent("");
    } catch (error) {
      // Handle error
    }
  };

  const handleUpvoteAnswer = (answerId) => handleVote(answerId, "upvote");
  const handleDownvoteAnswer = (answerId) => handleVote(answerId, "downvote");

  return (
    <main className="py-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="mb-4 w-full border-b border-border-100 text-2xl font-bold dark:border-dark-700">
          Answers
        </h2>
        <div>
          <button onClick={() => setOpen(!open)} className="w-max">
            Answer it
          </button>
        </div>
      </div>
      {open && (
        <div className="mb-5 flex flex-col gap-4">
          <Editor
            markdown={content}
            editorRef={editorRef}
            onChange={handleContentChange}
          />
          <div className="flex gap-4">
            <button onClick={editingAnswer ? handleUpdateSubmit : handleSubmit}>
              {editingAnswer ? "Update" : "Submit"}
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setEditingAnswer(null);
                setContent("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {data?.pages?.map((page) => {
          return page?.answer?.map((post) => (
            <Answer
              key={post?._id}
              id={post?._id}
              author={post?.author?.fullname}
              authorId={post?.author?._id}
              author_username={post?.author?.username}
              // author_profile_img={post?.author?.avatar}
              published_at={ConvertToReadableDateTimeUI(post?.createdAt)}
              content={post?.content}
              upvotes={post?.upvotes}
              downvotes={post?.downvotes}
              onDelete={handleDeleteAnswer}
              onUpvote={handleUpvoteAnswer}
              onDownvote={handleDownvoteAnswer}
              onUpdateClick={handleUpdateClick}
            />
          ));
        })}
        {isFetchingNextPage ? (
          <div className="flex min-h-80 items-center justify-center">
            Loading...
          </div>
        ) : (
          <div className="text-center">No more posts</div>
        )}
        <div ref={ref} className="min-h-10"></div>
      </div>
    </main>
  );
}
