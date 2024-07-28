"use client";
import useUserStore from "@/stores/useUserStore";
import axios from "axios";
import Link from "next/link";
import {IoBookmarkOutline} from "react-icons/io5";
import {IoMdArrowBack} from "react-icons/io";
import {useRouter} from "next/navigation";
import Editor from "@/components/editor/EditorComponent";
import {FaPen} from "react-icons/fa";
import {RiDeleteBin6Fill} from "react-icons/ri";
import deleteBlog from "@/components/function/deleteBlog";

export default function Article({data, id, type, userId}) {
  const authUser = useUserStore((state) => state);
  const isAuth = authUser?.isAuth;

  const router = useRouter();
  const handleSave = async ({contentType, id}) => {
    // Validate input
    if (!contentType || !id) {
      alert("Report this issue to the developer");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/saved/create`,
        {
          content: id,
          contentType: contentType,
        },
        {
          withCredentials: true,
        }
      );

      // Handle different response statuses
      switch (response.status) {
        case 201:
          alert("Saved successfully");
          break;
        case 403:
          alert("Content already saved");
          break;
        default:
          alert("Unexpected response status: " + response.status);
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            alert("Missing data");
            break;
          case 403:
            alert("Content already saved");
            break;
          case 500:
            alert("Failed to save content");
            break;
          default:
            alert("Unexpected error: " + error.response.status);
        }
      } else if (error.request) {
        alert("No response received from the server");
        console.log(error.request);
      } else {
        alert("Error setting up the request: " + error.message);
        console.log("Error", error.message);
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="absolute left-2 top-2 flex items-center justify-center gap-3 rounded-full bg-black p-2 text-xl text-white"
      >
        <IoMdArrowBack />
      </button>
      {isAuth && (
        <button
          className="absolute right-2 top-2 aspect-square rounded-full bg-black p-3 text-white"
          onClick={() => handleSave({contentType: type, id: id})}
        >
          <IoBookmarkOutline />
        </button>
      )}
      {userId === authUser?.user?._id && (
        <Link
          href={`/blogs/update/${id}`}
          className="absolute right-2 top-14 aspect-square rounded-full bg-black p-3 text-white"
        >
          <FaPen />
        </Link>
      )}
      {userId === authUser?.user?._id && (
        <button
          onClick={() => {
            deleteBlog(id);
            router.back();
          }}
          className="absolute right-2 top-28 aspect-square rounded-full bg-black p-3 text-white"
        >
          <RiDeleteBin6Fill />
        </button>
      )}
      <article className="prose p-4 text-justify">
        <Editor markdown={data} readOnly={true} />
      </article>
    </div>
  );
}
