function convertToReadableDateTime(isoDateString) {
  const date = new Date(isoDateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // Determine the readable time difference
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 1) {
    return "Today";
  } else if (diffInDays < 2) {
    return "Yesterday";
  } else {
    const dateOptions = {day: "numeric", month: "long", year: "numeric"};
    return date.toLocaleDateString("en-IN", dateOptions);
  }
}

export {convertToReadableDateTime};

export default function ConvertToReadableDateTimeUI(isoDateString) {
  const data = convertToReadableDateTime(isoDateString);
  return <span>{data}</span>;
}
