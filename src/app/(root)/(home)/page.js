"use client";
import Answer from "@/components/shared/Answer";
import Loading from "./loading";
import Editor from "@/components/shared/Editor";
import MDEditor from "@uiw/react-md-editor";

const page = () => {
  return (
    <main className="p-4">
      <Editor />
      <MDEditor.Markdown source="## Hello Markdown!" />
    </main>
  );
};
export default page;
