"use client";
import Image from "next/image";
import Link from "next/link";
import {PiArrowFatUpFill, PiArrowFatDownFill} from "react-icons/pi";
import {FaCommentAlt} from "react-icons/fa";
import MDEditor from "@uiw/react-md-editor";
import ShareButtons from "../ui/ShareButton";
import CardMenu from "../ui/CardMenu";
import {FaCalendarAlt} from "react-icons/fa";
import {Button} from "../ui/button";
import {Avatar} from "@nextui-org/react";
import {IoBookmark, IoBookmarkOutline} from "react-icons/io5";
import Tag from "../ui/Tag";
import Editor from "../editor/Editor";

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {markdownToPlainText} from "../function/markdownToPlainText";
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
 * @param {string} props.banner - URL of the banner image.
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
  banner,
  like = 0,
  dislike = 0,
  comment = [],
  tags = [],
  saved = false,
}) {
  // content to show 100 characters
  const contentToShow = content?.toString().slice(0, 200);

  const {theme, setTheme} = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const plainText = markdownToPlainText(contentToShow);

  return (
    <div className="relative mt-2 rounded-lg border border-border-100 bg-white p-4 shadow-sm dark:border-darkColor-400 dark:bg-darkColor-300">
      <div className="absolute -top-[14px] right-4 flex items-center gap-2 rounded-full border border-border-100 bg-white px-4 py-1 text-xs shadow-sm dark:border-darkColor-400 dark:bg-darkColor-300">
        {published_at}
      </div>
      <div className="flex flex-col items-center justify-between gap-2 sm:h-[250px] sm:flex-row">
        {theme === "light" ? (
          <img
            src={banner || "/placeholder.svg"}
            alt="image"
            className="h-[200px] w-full flex-shrink-0 rounded-xl border border-border-100 object-cover dark:border-darkColor-400 sm:h-full sm:w-[250px]"
          />
        ) : (
          <img
            src={banner || "/placeholder-dark.svg"}
            alt="image"
            className="h-[200px] w-full flex-shrink-0 rounded-xl border border-border-100 object-cover dark:border-darkColor-400 sm:h-full sm:w-[250px]"
          />
        )}
        <div className="flex h-full w-full flex-col justify-between gap-2">
          <div className="flex w-full flex-col justify-start gap-2">
            <div className="flex items-start justify-between gap-2 border-b border-border-100 pb-2 dark:border-darkColor-400">
              <Link href={`/blogs/${slug}`} className="w-full">
                <h2 className="w-full text-lg font-bold text-primary-400">
                  {title}
                </h2>
              </Link>
            </div>
            {plainText}
            {content.length > 200 ? "..." : ""}

            <div>
              {tags.slice(0, 3).map((tag) => (
                <Link
                  href={`/?tags=${tag.name}`}
                  key={tag._id}
                  className="rounded-full bg-lightColor-700 px-3 py-1 text-sm shadow-sm dark:bg-darkColor-400"
                >
                  {tag?.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-2 flex w-full flex-wrap items-center justify-between gap-2">
            <Link
              href={`/@${author_username}`}
              className="flex items-center gap-2"
            >
              <Avatar
                src={author_profile_img}
                classNames={{
                  base: "bg-gradient-to-br from-[#2563EB] to-[#2196F3]",
                  icon: "text-black/80",
                }}
              />
              <div className="flex flex-col justify-center">
                <div className="text-sm">{author}</div>
                <div className="text-xs text-primary-400">
                  @{author_username}
                </div>
              </div>
            </Link>
            <div>
              <Link href={`/blogs/${slug}`}>
                <Button>Read</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
