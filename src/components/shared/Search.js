"use client";
import {Spinner} from "@nextui-org/react";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {FiSearch} from "react-icons/fi";
import {MdKeyboardCommandKey} from "react-icons/md";
import {BackgroundGradientAnimation} from "../ui/background-gradient-animation";

export default function Search() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setOpen(true);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 100);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => {
          setOpen(!open);
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }, 100);
        }}
        className="fixed right-[80px] flex items-center gap-2 rounded-lg px-4 py-2 sm:right-[115px] md:static md:w-full md:max-w-[400px] md:justify-between md:border md:border-border-100 md:dark:border-darkColor-400"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">
            <FiSearch />
          </span>
          <span className="hidden md:block">Search here...</span>
        </div>
        <div className="hidden items-center gap-1 text-sm text-lightColor-400 dark:text-gray-600 md:flex">
          <MdKeyboardCommandKey />K
        </div>
      </button>

      {open ? <SearchComponent inputRef={inputRef} /> : null}
      <div
        onClick={() => setOpen(!open)}
        className={`${open ? "visible" : "hidden"} fixed inset-0 bg-sky-800/20 backdrop-blur-lg`}
      >
        <BackgroundGradientAnimation></BackgroundGradientAnimation>
        {/* Maskable Area */}
      </div>
    </>
  );
}

const SearchComponent = ({inputRef}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (query.length >= 3) {
        fetchResults();
      } else {
        setResults([]);
      }
    }, 500);

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

  // console.log(results);

  return (
    <div className="fixed inset-0 bottom-auto top-[100px] z-50 mx-auto max-h-[50vh] min-h-[500px] w-full max-w-[600px] bg-darkColor-400/30 text-white backdrop-blur-lg md:rounded-lg">
      <div className="flex items-center gap-4 border-b border-border-100 p-3 pr-5">
        <FiSearch className="text-xl" />
        <input
          type="text"
          placeholder="Search here..."
          className="w-full border-none bg-transparent placeholder:text-white focus:outline-none"
          ref={inputRef}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex items-center gap-1 text-sm">esc</div>
      </div>
      <div>
        {isLoading ? (
          <div className="flex max-h-[50vh] min-h-[300px] items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="hide-scrollbar flex max-h-[50vh] min-h-[400px] flex-col gap-4 overflow-auto p-4">
            {results.map((result) => (
              <div key={result._id} className="">
                <Link
                  href={`/${result.type === "blog" ? "blogs" : "ask-question"}/${result.slug}`}
                >
                  <div className="relative rounded-lg border border-border-100 p-2">
                    <div className="absolute -top-3 px-2 py-1 text-xs font-medium capitalize">
                      {result.type}
                    </div>
                    <h3 className="text-lg font-bold">{result.title}</h3>
                    <p className="text-sm">
                      {result.content.substring(0, 100)}...
                    </p>
                  </div>
                </Link>
              </div>
            ))}
            {query.length < 3 && results.length === 0 && (
              <div className="flex max-h-[50vh] min-h-[300px] flex-col items-center justify-center text-center text-lightColor-500">
                <div>Please enter at least 3 characters</div>
              </div>
            )}
            {results.length === 0 && query.length > 3 && (
              <div className="flex max-h-[50vh] min-h-[300px] items-center justify-center text-center text-lightColor-500">
                <div>No results found</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
