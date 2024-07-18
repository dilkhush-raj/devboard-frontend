"use client";
import Link from "next/link";
import {PiArrowFatUpFill, PiArrowFatDownFill} from "react-icons/pi";
import {FaCommentAlt} from "react-icons/fa";
import MDEditor from "@uiw/react-md-editor";
import ShareButtons from "../ui/ShareButton";
import CardMenu from "../ui/CardMenu";
import {FaCalendarAlt} from "react-icons/fa";
import {Avatar} from "@nextui-org/avatar";
import {User} from "@nextui-org/user";

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
 * @param {string[]} props.tags - Array of tags associated with the blog.
 * @returns {JSX.Element} Rendered BlogCard component.
 */

export default function QuestionCard({
  id,
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
  tags = [],
}) {
  const contentToShow = content?.slice(0, 200) + "...";
  return (
    <div className="relative rounded-lg border border-border-100 bg-white p-4 shadow-sm dark:border-darkColor-400 dark:bg-darkColor-300">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border-100 pb-4 dark:border-darkColor-400">
          <div className="flex items-center gap-2">
            <Link
              href={`/@${author_username}`}
              className="flex items-center gap-2"
            >
              <Avatar
                src={author_profile_img}
                showFallback
                disableAnimation
                isBordered
                size="sm"
                classNames={{
                  base: "bg-gradient-to-br z-10 cursor-pointer from-[#2563EB] to-[#2196F3]",
                  icon: "text-black/80",
                }}
              />
              <div className="flex flex-col justify-center">
                <div className="text-sm">{author}</div>
                <div className="text-xs text-darkColor-150 dark:text-zinc-400">
                  @{author_username}
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-2 pl-4 text-sm">
              <FaCalendarAlt /> {published_at}
            </div>
          </div>
          <CardMenu contentType="Question" id={id} />
        </div>

        <Link href={`/ask-question/${slug}`}>
          <h2 className="text-xl font-bold dark:text-white">{title}</h2>
        </Link>

        <MDEditor.Markdown className="select-text" source={contentToShow} />

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div key={tag._id} className="text-sm">
              #{tag?.name}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex w-max cursor-pointer items-center gap-2 rounded-full bg-lightColor-700 px-3 py-1 dark:bg-darkColor-400">
            <div className="flex items-center gap-2 hover:text-primary-500">
              <PiArrowFatUpFill />
              {like}
            </div>
            <div className="flex items-center gap-2 hover:text-red-600">
              <PiArrowFatDownFill />
              {dislike}
            </div>
          </div>
          <div className="flex w-max cursor-pointer items-center gap-2 rounded-full bg-lightColor-700 px-3 py-1 hover:text-cyan-600 dark:bg-darkColor-400">
            <div className="flex items-center gap-2">
              <FaCommentAlt />
              <div>{comment?.length}</div>
            </div>
          </div>
          <div className="relative flex w-max cursor-pointer items-center gap-2 rounded-full bg-lightColor-700 px-3 py-1 dark:bg-darkColor-400">
            <ShareButtons url={`/blogs/${slug}`} title={title} />
          </div>
        </div>
      </div>
    </div>
  );
}
