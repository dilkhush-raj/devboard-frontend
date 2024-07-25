// @ts-check
// Theme Icons
import {HiSun, HiMoon} from "react-icons/hi";
// Navbar Icons
import {RiHomeFill} from "react-icons/ri";
import {PiNewspaperClippingFill} from "react-icons/pi";
import {BsFillPatchQuestionFill} from "react-icons/bs";
import {FaRankingStar} from "react-icons/fa6";
import {IoMdPricetags} from "react-icons/io";

import {IoMdSave} from "react-icons/io";
import {MdReport} from "react-icons/md";

import {MdAccountCircle} from "react-icons/md";
import {RiSettings4Fill} from "react-icons/ri";
import axios from "axios";
/**
 * Available themes for the application.
 * Each theme includes a value, label, and an icon.
 *
 * @type {Array<{ value: string, label: string, icon: JSX.Element }>}
 * @property {string} value - The value representing the theme.
 * @property {string} label - The display label for the theme.
 * @property {JSX.Element} icon - The icon representing the theme.
 */
export const themes = [
  {value: "light", label: "Light", icon: <HiSun />},
  {value: "dark", label: "Dark", icon: <HiMoon />},
];

/**
 * Navigation links for the application's navbar.
 * Each link includes a slug, label, and an icon.
 *
 * @type {Array<{ slug: string, label: string, icon: JSX.Element }>}
 * @property {string} slug - The URL path for the navigation link.
 * @property {string} label - The display label for the navigation link.
 * @property {JSX.Element} icon - The icon representing the navigation link.
 */
export const navLinks = [
  {slug: "/", label: "Home", icon: <RiHomeFill />},
  {slug: "/blogs", label: "Blogs", icon: <PiNewspaperClippingFill />},
  {
    slug: "/questions",
    label: "Ask Question",
    icon: <BsFillPatchQuestionFill />,
  },
  {slug: "/tags", label: "Tags", icon: <IoMdPricetags />},
  {slug: "/leaderboard", label: "Leaderboard", icon: <FaRankingStar />},
];

/**
 * Data for the CardMenu component containing menu items.
 * Each item includes a label, an icon, and an onClick handler function.
 *
 * @type {Array<{ label: string, icon: JSX.Element, onClick: function }>}
 * @property {string} label - The text label for the menu item.
 * @property {JSX.Element} icon - The icon component to be displayed for the menu item.
 * @property {function} onClick - The function to be called when the menu item is clicked.
 */
export const CardMenuData = [
  {
    label: "Save",
    icon: <IoMdSave />,
    onClick: ({contentType, id}) => {
      // post request to save blog to /api/v1/saved/create
      axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/saved/create`,
        {
          content: id,
          contentType: contentType,
        },
        {
          withCredentials: true,
        }
      );

      alert("Saved");
    },
  },
  {
    label: "Report",
    icon: <MdReport />,
    onClick: () => {
      alert("Reported successfully");
    },
  },
];

export const NavbarAvatarMenuData = [
  {
    label: "Account",
    icon: <MdAccountCircle />,
    link: "/account",
    onClick: () => {
      alert("Profile");
    },
  },
  {
    label: "Settings",
    icon: <RiSettings4Fill />,
    link: "/account/settings",
    onClick: () => {
      alert("Settings");
    },
  },
];
