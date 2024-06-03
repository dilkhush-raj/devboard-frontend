"use client";
import Image from "next/image";
import Link from "next/link";
import {PiArrowFatUpFill, PiArrowFatDownFill} from "react-icons/pi";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {FaCommentAlt} from "react-icons/fa";
import {useState} from "react";
import MDEditor from "@uiw/react-md-editor";
import ShareButtons from "../ui/ShareButton";

/**
 * Answer component to display an answer card with author details, upvote/downvote functionality, comments, and sharing options.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.data - Data required for rendering the answer.
 * @param {string} props.data.author - Name of the answer's author.
 * @param {string} props.data.author_username - Username of the answer's author.
 * @param {string} props.data.author_profile_img - Profile image URL of the author.
 * @param {string} props.data.answer - The answer text in markdown format.
 * @param {string} props.data.tweet - The tweet text in markdown format.
 * @param {number} [props.data.upvote=0] - Number of upvotes.
 * @param {number} [props.data.downvote=0] - Number of downvotes.
 * @param {number} [props.data.id] - Unique identifier for the answer.
 * @returns {JSX.Element} Rendered Answer component.
 */

export default function Answer({data}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative rounded-lg bg-white p-4 shadow-sm dark:bg-darkColor-300">
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-between">
            <Link
              href={`/user/${data?.author_username}`}
              className="flex items-center gap-2"
            >
              <Image
                src={data?.author_profile_img || "/avatar.jpg"}
                width={40}
                height={40}
                className="rounded-full"
                alt={data?.author}
              />
              <div className="flex flex-col justify-center">
                <div className="text-sm">{data?.author}</div>
                <div className="text-xs">{data?.author_username}</div>
              </div>
            </Link>
            <div className="pr-2 text-lg" onClick={() => setOpen(!open)}>
              <HiOutlineDotsVertical />
            </div>
          </div>
          <div
            className={`${
              open ? "visible" : "hidden"
            } absolute right-8 top-2 z-50 min-w-40 rounded-lg bg-lightColor-850 p-4 shadow-md dark:bg-darkColor-400`}
          >
            <div>Save</div>
            <div>Report</div>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className={`${
              open ? "visible" : "hidden"
            } fixed inset-0 z-40 bg-[#00000064]`}
          >
            {/* Maskable Area */}
          </div>
        </div>

        <MDEditor.Markdown
          className="select-text"
          source={data?.answer || data?.tweet}
        />
        {/* <div>{data?.answer || data?.tweet}</div> */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex w-max cursor-pointer items-center gap-2 rounded-full bg-lightColor-700 px-3 py-1 dark:bg-darkColor-400">
            <div className="flex items-center gap-2 hover:text-primary-500">
              <PiArrowFatUpFill />
              {data?.upvote || 0}
            </div>
            <div className="flex items-center gap-2 hover:text-red-600">
              <PiArrowFatDownFill />
              {data?.downvote || 0}
            </div>
          </div>
          <div className="flex w-max cursor-pointer items-center gap-2 rounded-full bg-lightColor-700 px-3 py-1 hover:text-cyan-600 dark:bg-darkColor-400">
            <div className="flex items-center gap-2">
              <FaCommentAlt />
              <div>32</div>
            </div>
          </div>
          <div className="relative flex w-max cursor-pointer items-center gap-2 rounded-full bg-lightColor-700 px-3 py-1 dark:bg-darkColor-400">
            <ShareButtons
              title={"DevBoard"}
              url={"https://dev-board-ten.vercel.app/"}
              key={data?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
