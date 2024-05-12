// Theme Icons
import { HiSun, HiMoon } from "react-icons/hi";
import { HiMiniComputerDesktop } from "react-icons/hi2";
// Navbar Icons
import { RiHomeFill } from "react-icons/ri";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { MdLibraryBooks } from "react-icons/md";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { FaRankingStar } from "react-icons/fa6";

export const themes = [
  { value: "light", label: "Light", icon: <HiSun /> },
  { value: "dark", label: "Dark", icon: <HiMoon /> },
  { value: "system", label: "System", icon: <HiMiniComputerDesktop /> },
];

export const navLinks = [
  { slug: "/", label: "Home", icon: <RiHomeFill />},
  { slug: "/blogs", label: "Blogs", icon: <PiNewspaperClippingFill />},
  { slug: "/knowledges", label: "Knowledge", icon: <MdLibraryBooks />},
  { slug: "/ask-question", label: "Ask Question", icon: <BsFillPatchQuestionFill />},
  { slug: "/leaderboard", label: "Leaderboard", icon: <FaRankingStar />},
]