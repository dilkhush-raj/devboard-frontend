"use client";
import {useEffect, useRef, useState} from "react";
import Logo from "@/assets/logo";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import {FiSearch} from "react-icons/fi";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import {Kbd} from "@nextui-org/kbd";
import {Avatar} from "@nextui-org/react";

export default function Navbar() {
  const searchInputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        searchInputRef.current.focus();
      } else if (event.key === "Escape") {
        setQuery("");
        setResults([]);
        setIsActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (query.length >= 3) {
        fetchResults();
        setIsActive(true);
      } else {
        setResults([]);
        setIsActive(false);
      }
    }, 500); // Debounce time of 500ms

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [query]);

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/feed/search?q=${query}`
      );
      const data = await response.json();
      setResults(data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputBlur = () => {
    // Set a timeout to allow click event to register on result link
    setTimeout(() => {
      setIsActive(false);
    }, 200);
  };

  const handleInputFocus = () => {
    if (query.length >= 3) {
      setIsActive(true);
    }
  };

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 flex h-[60px] items-center justify-between border-b border-border-100 bg-lightColor-900 px-7 py-2 pr-20 shadow-sm dark:border-darkColor-400 dark:bg-darkColor-200 md:pr-7">
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="hidden items-center rounded-md border border-border-100 bg-lightColor-700 px-4 text-gray-400 dark:bg-darkColor-300 dark:text-lightColor-500 md:flex">
          <span className="text-xl">
            <FiSearch />
          </span>
          <input
            ref={searchInputRef}
            className="w-[400px] bg-lightColor-700 p-2 placeholder:text-gray-400 focus:outline-none dark:bg-darkColor-300 placeholder:dark:text-lightColor-500"
            type="text"
            placeholder="Search anything globally"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
          />
          <Kbd
            keys={query.length > 0 ? ["esc"] : ["command"]}
            className="text-gray-400 dark:text-lightColor-500"
          >
            {query.length > 0 ? "esc" : "K"}
          </Kbd>
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Avatar
            showFallback
            isBordered
            size="sm"
            name={""}
            src={"author_profile_img"}
          />
        </div>
      </nav>
      {isActive && (
        <div className="fixed left-0 right-0 top-[60px] z-50 mx-auto min-h-60 max-w-xl rounded-b-lg border border-t-0 border-border-100 bg-lightColor-900 px-7 py-2 shadow-md dark:bg-darkColor-200">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {results.map((result) => (
                <li key={result._id} className="py-2">
                  <Link
                    href={`/${result.type === "blog" ? "blogs" : "ask-question"}/${result.slug}`}
                  >
                    <div className="relative rounded-lg border border-border-100 p-4 dark:border-darkColor-400">
                      <div className="absolute -top-3 bg-white px-2 py-1 text-xs font-medium capitalize dark:bg-darkColor-300">
                        {result.type}
                      </div>
                      <h3 className="text-lg font-bold">{result.title}</h3>
                      <p className="text-sm text-gray-500">
                        {result.content.substring(0, 100)}...
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
              {results.length === 0 && (
                <div className="flex h-60 items-center justify-center text-center text-gray-400 dark:text-lightColor-500">
                  <div>No results found</div>
                </div>
              )}
            </ul>
          )}
        </div>
      )}
      <Sidebar />
      <RightSidebar />
    </>
  );
}
