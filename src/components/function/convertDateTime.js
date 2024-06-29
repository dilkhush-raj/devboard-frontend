function convertToReadableDateTime(isoDateString) {
  const date = new Date(isoDateString);
  const istDate = new Date(date.getTime());
  const dateOptions = {day: "numeric", month: "long", year: "numeric"};
  const readableDate = istDate.toLocaleDateString("en-IN", dateOptions);

  // Format the time
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const readableTime = istDate.toLocaleTimeString("en-IN", timeOptions);

  return `${readableDate}, ${readableTime}`;
}

export {convertToReadableDateTime};

export default function ConvertToReadableDateTimeUI(isoDateString) {
  const data = convertToReadableDateTime(isoDateString);
  return <>{data}</>;
}
