"use client";
import { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaRedditAlien } from "react-icons/fa6";
import {
  EmailShareButton,
  LinkedinShareButton,
  RedditShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";

/**
 * ShareButtons component to display share buttons for social media platforms.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} url - The URL to share
 * @param {string} title - The title of the page
 * @returns {JSX.Element} Rendered ShareButtons component.
 */

const ShareButtons = ({ url, title }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 hover:text-green-600"
      >
        <FaShareAlt />
        <div>Share</div>
      </div>

      {open ? (
        <div className="absolute left-0 z-50 flex flex-col gap-4 px-6 py-6 rounded-lg shadow-md top-10 bg-lightColor-850 dark:bg-darkColor-400">
          <TwitterShareButton title={title} url={url}>
            <div className="flex items-center gap-4">
              <FaXTwitter />
              Twitter
            </div>
          </TwitterShareButton>
          <WhatsappShareButton>
            <div className="flex items-center gap-4">
              <IoLogoWhatsapp />
              WhatsApp
            </div>
          </WhatsappShareButton>
          <LinkedinShareButton>
            <div className="flex items-center gap-4">
              <IoLogoLinkedin />
              LinkedIn
            </div>
          </LinkedinShareButton>
          <RedditShareButton>
            <div className="flex items-center gap-4">
              <FaRedditAlien />
              Reddit
            </div>
          </RedditShareButton>
          <EmailShareButton>
            <div className="flex items-center gap-4">
              <MdEmail />
              Email
            </div>
          </EmailShareButton>
        </div>
      ) : null}
      <div
        onClick={() => setOpen(!open)}
        className={`${open ? "visible" : "hidden"} z-40 fixed inset-0`}
      >
        {/* Maskable Area */}
      </div>
    </>
  );
};

export default ShareButtons;
