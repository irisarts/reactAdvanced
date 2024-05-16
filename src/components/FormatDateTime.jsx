export const FormatDateTime = (dateTimeString, format) => {
  if (!dateTimeString) return "";

  const dateTime = new Date(dateTimeString);

  if (format === "datetime-local") {
    const year = dateTime.getFullYear().toString().padStart(4, "0");
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = dateTime.getDate().toString().padStart(2, "0");
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } else {
    const formattedDate = dateTime.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = dateTime.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} at ${formattedTime}`;
  }
};