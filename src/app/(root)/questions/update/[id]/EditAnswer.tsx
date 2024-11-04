"use client";
import Editor from "@/components/editor/Editor";
import {useState, useRef, useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function EditAnswer({data}) {
  const [title, setTitle] = useState(data?.title);
  const [content, setContent] = useState(data?.content);
  const [id, setId] = useState(data?._id);
  const router = useRouter();
  const ref = useRef(null);

  const handleContentChange = () => {
    if (ref.current) {
      setContent(ref.current.getMarkdown());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      content,
    };

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/blogs/update/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      router.push(`/blogs/${response?.data?.data?.slug}`);
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="p-4">
      <form className="my-4 flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg p-3 dark:bg-[#161821]"
        />
        <Editor
          markdown={content}
          editorRef={ref}
          readOnly={false}
          onChange={handleContentChange}
        />
        <button
          type="submit"
          className="bg-blue-500 mt-4 rounded-lg p-3 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
