"use client";
import Link from "next/link";
import {PiArrowFatUpFill, PiArrowFatDownFill} from "react-icons/pi";
import axios from "axios";
import {useState} from "react";
import {toast} from "react-hot-toast";
import useUserStore from "@/stores/useUserStore";
import Editor from "../editor/Editor";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {RiDeleteBin6Fill} from "react-icons/ri";
import {FaKeyboard} from "react-icons/fa";

export default function AnswerCard({
  id,
  published_at,
  author,
  authorId,
  author_username,
  content,
  onDelete,
  onUpvote,
  onDownvote,
  onUpdateClick, // Add this new prop
  upvotes: initialUpvotes,
  downvotes: initialDownvotes,
}) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [open, setOpen] = useState(false);
  // @ts-ignore
  const userid = useUserStore((state) => state.user._id);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/answers/delete/${id}`,
        {withCredentials: true}
      );
      setOpen(false);
      onDelete(id);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to delete");
    }
  };

  const hasUpvoted = upvotes?.includes(userid);
  const hasDownvoted = downvotes?.includes(userid);
  const userStore = useUserStore((state) => state);

  const handleUpdate = () => {
    onUpdateClick(id, content);
    setOpen(false);
  };
  return (
    <div className="relative rounded-lg border border-border-100 bg-white p-4 shadow-sm dark:border-darkColor-400 dark:bg-dark-800">
      <div className="flex flex-col gap-4">
        <Editor
          markdown={content}
          editorRef={null}
          readOnly={true}
          onChange={undefined}
        />

        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex w-max items-center gap-2 rounded-full bg-lightColor-700 px-3 py-1 dark:bg-darkColor-400">
            <div
              className={`flex cursor-pointer items-center gap-2 ${hasUpvoted ? "text-primary-500" : "hover:text-primary-500"}`}
              onClick={() => onUpvote(id)}
            >
              <PiArrowFatUpFill />
              {upvotes?.length}
            </div>
            <div
              className={`flex cursor-pointer items-center gap-2 ${hasDownvoted ? "text-red-600" : "hover:text-red-600"}`}
              onClick={() => onDownvote(id)}
            >
              <PiArrowFatDownFill />
              {downvotes?.length}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span>{published_at},</span> answered by
            <Link href={`/@${author_username}`} className="text-primary-500">
              {author}
            </Link>
          </div>
        </div>
      </div>
      {/* @ts-ignore */}
      {userStore?.isAuth && userStore?.user?._id === authorId && (
        <div className="absolute right-2 top-2">
          <>
            <button
              className="z-10 rounded-full p-2"
              onClick={() => setOpen(!open)}
            >
              <HiOutlineDotsVertical />
            </button>
            <div
              className={`${
                open ? "visible" : "hidden"
              } absolute right-6 top-0 z-20 flex min-w-40 flex-col gap-4 rounded-lg bg-lightColor-850 p-4 shadow-md dark:bg-dark-600`}
            >
              <button
                className={`flex cursor-pointer items-center gap-2 rounded-lg hover:text-primary-500`}
                onClick={handleUpdate}
              >
                <FaKeyboard />
                Update
              </button>
              <button
                className={`flex cursor-pointer items-center gap-2 rounded-lg hover:text-red-600`}
                onClick={handleDelete}
              >
                <RiDeleteBin6Fill />
                Delete
              </button>
            </div>
            <div
              onClick={() => setOpen(!open)}
              className={`${open ? "visible" : "hidden"} fixed inset-0 z-10`}
            >
              {/* Maskable Area */}
            </div>
          </>
        </div>
      )}
    </div>
  );
}
