"use client";
import Editor from "@/components/editor/Editor";
import {useState, useRef} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

const NewQuestion = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const ref = useRef(null);
  const router = useRouter();

  const handleContentChange = () => {
    if (ref.current) {
      setContent(ref.current.getMarkdown());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: title,
      content: content,
      tags: [],
    };

    console.log(data);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/questions/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      router.push(`/questions/${res.data.data.slug}`);
    } catch (error) {
      alert("Failed to create question");
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
          onChange={handleContentChange}
        />
        <button
          type="submit"
          className="mt-4 rounded-lg bg-blue-500 p-3 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewQuestion;
