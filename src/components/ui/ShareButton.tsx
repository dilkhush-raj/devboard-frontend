"use client";
import {useState} from "react";
import {FaShareAlt} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import {IoLogoWhatsapp} from "react-icons/io";
import {IoLogoLinkedin} from "react-icons/io5";
import {MdEmail} from "react-icons/md";
import {FaRedditAlien} from "react-icons/fa6";
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

const ShareButtons = ({url, title}) => {
  const [open, setOpen] = useState(false);
  const link = process.env.NEXT_PUBLIC_URL + url;

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
        <div className="absolute left-0 top-10 z-50 flex flex-col gap-4 rounded-lg bg-lightColor-850 px-6 py-6 shadow-md dark:bg-darkColor-400">
          <TwitterShareButton title={title} url={link}>
            <div className="flex items-center gap-4">
              <FaXTwitter />
              Twitter
            </div>
          </TwitterShareButton>
          <LinkedinShareButton
            title={title}
            source={link || ""}
            url={link || ""}
          >
            <div className="flex items-center gap-4">
              <IoLogoLinkedin />
              LinkedIn
            </div>
          </LinkedinShareButton>
          <EmailShareButton subject={title} body={link} url={link}>
            <div className="flex items-center gap-4">
              <MdEmail />
              Email
            </div>
          </EmailShareButton>
        </div>
      ) : null}
      <div
        onClick={() => setOpen(!open)}
        className={`${open ? "visible" : "hidden"} fixed inset-0 z-40`}
      >
        {/* Maskable Area */}
      </div>
    </>
  );
};

export default ShareButtons;
