import axios from "axios";

const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/blogs/delete/${id}`,
      {
        withCredentials: true,
      }
    );

    // Handle different response statuses
    // switch (response.status) {
    //   case 200:
    //     alert("Blog deleted successfully");
    //     break;
    //   case 403:
    //     alert("You don't have permission to delete this blog");
    //     break;
    //   default:
    //     alert("Unexpected response status: " + response.status);
    // }
  } catch (error) {
    console.log(error);
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 400:
    //       alert("Missing data");
    //       break;
    //     case 403:
    //       alert("You don't have permission to delete this blog");
    //       break;
    //     case 500:
    //       alert("Failed to delete blog");
    //       break;
    //     default:
    //       alert("Unexpected error: " + error.response.status);
    // }
    // } else if (error.request) {
    //   alert("No response received from the server");
    //   console.log(error.request);
    // } else {
    //   alert("Error setting up the request: " + error.message);
    //   console.log("Error", error.message);
    // }
  }
};

export default deleteBlog;
