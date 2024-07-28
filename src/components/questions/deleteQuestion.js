"use client";
import {RiDeleteBin6Fill} from "react-icons/ri";
import deleteContent from "../function/deleteContent";
import {useRouter} from "next/navigation";
import useUserStore from "@/stores/useUserStore";

export default function DeleteQuestion({id, userId}) {
  const router = useRouter();

  const userStore = useUserStore((state) => state);
  if (userStore?.user?._id === userId) {
    return (
      <div>
        <button
          onClick={() => {
            deleteContent(id, "questions");
            router.back();
          }}
          className=""
        >
          <RiDeleteBin6Fill />
        </button>
      </div>
    );
  } else {
    return null;
  }
}
