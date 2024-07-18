"use client";
import Editor from "@/components/editor/Editor";
import axios from "axios";
import {IoBookmarkOutline} from "react-icons/io5";

export default function Article({data, id, type}) {
  const handleSave = async ({contentType, id}) => {
    // Validate input
    if (!contentType || !id) {
      alert("Report this issue to the developer");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/saved/create`,
        {
          content: id,
          contentType: contentType,
        },
        {
          withCredentials: true,
        }
      );

      // Handle different response statuses
      switch (response.status) {
        case 201:
          alert("Saved successfully");
          break;
        case 403:
          alert("Content already saved");
          break;
        default:
          alert("Unexpected response status: " + response.status);
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            alert("Missing data");
            break;
          case 403:
            alert("Content already saved");
            break;
          case 500:
            alert("Failed to save content");
            break;
          default:
            alert("Unexpected error: " + error.response.status);
        }
      } else if (error.request) {
        alert("No response received from the server");
        console.log(error.request);
      } else {
        alert("Error setting up the request: " + error.message);
        console.log("Error", error.message);
      }
    }
  };

  return (
    <>
      <button
        className="absolute right-5 top-10 rounded-full bg-black p-4 text-white"
        onClick={() => handleSave({contentType: type, id: id})}
      >
        <IoBookmarkOutline />
      </button>
      <article className="prose p-4 text-justify">
        <Editor markdown={data} readOnly={true} />
      </article>
    </>
  );
}
