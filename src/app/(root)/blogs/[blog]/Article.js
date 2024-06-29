"use client";
import MDEditor from "@uiw/react-md-editor";

export default function Article({data}) {
  return (
    <article className="prose text-justify">
      <MDEditor.Markdown source={data} />
    </article>
  );
}
