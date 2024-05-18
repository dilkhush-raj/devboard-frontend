"use client";
import Image from "next/image";
import Link from "next/link";
import { PiArrowFatUpFill, PiArrowFatDownFill } from "react-icons/pi";
import { FaCommentAlt } from "react-icons/fa";
import MDEditor from "@uiw/react-md-editor";
import ShareButtons from "../ui/ShareButton";
import CardMenu from "../ui/CardMenu";

/**
 * BlogCard component to display a blog card with author details, like/dislike functionality, comments, and sharing options.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {number} props.id - Unique identifier for the blog.
 * @param {string} props.slug - URL slug for the blog post.
 * @param {string} props.author - Name of the blog's author.
 * @param {string} props.author_username - Username of the blog's author.
 * @param {string} props.author_profile_img - Profile image URL of the author.
 * @param {string} props.title - Title of the blog.
 * @param {string} props.published_at - Date of publication of the blog.
 * @param {string} props.content - The content text in markdown format.
 * @param {number} [props.like=0] - Number of likes. Defaults to 0 if not provided.
 * @param {number} [props.dislike=0] - Number of dislikes. Defaults to 0 if not provided.
 * @param {Object[]} props.comment - Array of comment objects.
 * @param {number} props.comment[].id - Unique identifier for the comment.
 * @param {string} props.comment[].user - User who made the comment.
 * @param {string} props.comment[].data - Content of the comment.
 * @returns {JSX.Element} Rendered BlogCard component.
 */

export default function BlogCard({
  slug,
  title,
  published_at,
  author,
  author_username,
  author_profile_img,
  content,
  like = 0,
  dislike = 0,
  comment = [],
}) {
  return (
    <div className="relative p-4 rounded-lg shadow-sm bg-lightColor-800 dark:bg-darkColor-300">
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-between">
            <Link
              href={`/user/${author_username}`}
              className="flex items-center gap-2"
            >
              <Image
                src={author_profile_img || "/avatar.jpg"}
                width={40}
                height={40}
                className="rounded-full"
                alt={author}
              />
              <div className="flex flex-col justify-center">
                <div className="text-sm">{author}</div>
                <div className="text-xs">{author_username}</div>
              </div>
              <li className="pl-4 text-xs ">{published_at}</li>
            </Link>
            <CardMenu />
          </div>
        </div>

        <h2 className="text-xl font-bold dark:text-white">{title}</h2>

        <MDEditor.Markdown className="select-text" source={content} />
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer w-max bg-lightColor-700 dark:bg-darkColor-400">
            <div className="flex items-center gap-2 hover:text-primary-500">
              <PiArrowFatUpFill />
              {like}
            </div>
            <div className="flex items-center gap-2 hover:text-red-600">
              <PiArrowFatDownFill />
              {dislike}
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer hover:text-cyan-600 w-max bg-lightColor-700 dark:bg-darkColor-400">
            <div className="flex items-center gap-2">
              <FaCommentAlt />
              <div>{comment?.length}</div>
            </div>
          </div>
          <div className="relative flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer w-max bg-lightColor-700 dark:bg-darkColor-400">
            <ShareButtons url={`/blogs/${slug}`} title={title} />
          </div>
        </div>
      </div>
    </div>
  );
}
