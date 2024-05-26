// @ts-check
"use client";
import BlogCard from "@/components/shared/BlogCard";
import { useEffect, useState } from "react";

/**
 * Blog page showing a list of blog posts.
 * @typedef {Object} BlogPost
 * @property {number} id - The unique identifier of the blog post.
 * @property {string} title - The title of the blog post.
 * @property {string} author - The author of the blog post.
 * @property {string} date_published - The date the blog post was published.
 * @property {string} content - The content of the blog post.
 */

/**
 * @returns {JSX.Element}
 */
export default function Page() {
  /**
   * @type {[BlogPost[], React.Dispatch<React.SetStateAction<BlogPost[]>>]}
   */
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyapi.online/api/blogposts");
      const data = /** @type {BlogPost[]} */ (await res.json());
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      {data?.map((blog) => (
        <BlogCard
          key={blog?.id}
          content={blog?.content}
          id={blog?.id}
          title={blog.title}
          author={blog?.author}
          author_profile_img=""
          author_username="@undefined"
          comment={[]}
          published_at={blog?.date_published}
          slug=""
          dislike={0}
          like={0}
        />
      ))}
    </div>
  );
}
