// @ts-check
"use client";
import BlogCard from "@/components/shared/BlogCard";
import Empty from "@/components/ui/Empty";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

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
 * Fetches the blog posts from the API.
 * @returns {Promise<{data: BlogPost[]}>} The response containing blog posts.
 */
const fetchBlogs = async () => {
  const res = await axios.get(`https://dummyapi.online/api/blogposts`);
  return res;
};

/**
 * Use query hook to fetch blog posts from the API and cache it for an hour.
 * @typedef {Object} QueryResult
 * @property {boolean} isLoading - Indicates if the query is still loading.
 * @property {boolean} isError - Indicates if there was an error fetching the data.
 * @property {BlogPost[]} data - The fetched blog posts.
 * @property {Error} error - The error that occurred while fetching the data.
 */

/**
 * Blog page component.
 * @returns {JSX.Element} The blog page component.
 */
export default function Page() {
  /**
   * Fetches the blog posts from the API and caches it for an hour.
   * @returns {QueryResult} The result of the query.
   */
  const {isLoading, isError, data, error} = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 60, // Cache for an hour
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return (
      <div className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center">
        <Empty>No Tags Found</Empty>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {data?.data?.map((blog) => (
        <BlogCard
          key={blog.id}
          content={blog.content}
          id={blog.id}
          title={blog.title}
          author={blog.author}
          author_profile_img=""
          author_username="@undefined"
          comment={[]}
          published_at={blog.date_published}
          slug=""
          dislike={0}
          like={0}
        />
      ))}
    </div>
  );
}
