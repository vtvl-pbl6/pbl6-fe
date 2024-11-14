function getStringComment(comment) {
  if (comment === 0 || comment === 1) {
    return comment + " comment";
  } else {
    return comment + " comments";
  }
}

function getStringReply(reply) {
  if (reply === 0 || reply === 1) {
    return reply + " reply";
  } else {
    return reply + " replies";
  }
}

function getStringPost(post) {
  if (post === 0 || post === 1) {
    return post + " post";
  } else {
    return post + " posts";
  }
}
function formatPostTime(createdAt) {
  const [date, time] = createdAt.split(" ");
  const [day, month, year] = date.split("-");
  const [hours, minutes] = time.split(":").map((part) => part.split(".")[0]);

  const postDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
  const now = new Date();
  const differenceInMilliseconds = now - postDate;

  const seconds = Math.floor(differenceInMilliseconds / 1000);
  const minutesDiff = Math.floor(seconds / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);

  if (daysDiff >= 3) {
    return postDate.toLocaleDateString();
  } else if (daysDiff === 2) {
    return "2 ngày trước";
  } else if (daysDiff === 1) {
    return "1 ngày trước";
  } else if (hoursDiff > 0) {
    return `${hoursDiff} giờ trước`;
  } else if (minutesDiff > 0) {
    return `${minutesDiff} phút trước`;
  } else {
    return "Vừa mới";
  }
}

function formatDate(dateString) {
  if (!dateString || typeof dateString !== "string") {
    return "Invalid date";
  }

  const [day, month, year] = dateString.split(" ")[0].split("-");
  if (!day || !month || !year) {
    return "Invalid date format";
  }
  return `${day}-${month}-${year}`;
}

function formatDateTime(dateString) {
  if (!dateString || typeof dateString !== "string") {
    return "Invalid date";
  }

  const [datePart, timePart] = dateString.split(" ");
  if (!datePart || !timePart) {
    return "Invalid date-time format";
  }

  const [day, month, year] = datePart.split("-");
  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = timePart ? timePart.split(".")[0] : "00:00:00";
  return `${formattedTime} ${formattedDate}`;
}
function formatContent(content) {
  if (!content || typeof content !== "string") {
    return "Invalid content";
  }

  const mainContent = content.split("\n")[0];

  const formattedContent =
    mainContent.length > 75 ? mainContent.slice(0, 75) + "..." : mainContent;

  return formattedContent
    .split(/(<strong>.*?<\/strong>)/)
    .map((segment, index) => {
      if (segment.startsWith("<strong>") && segment.endsWith("</strong>")) {
        return (
          <strong key={index}>{segment.replace(/<\/?strong>/g, "")}</strong>
        );
      } else {
        return segment;
      }
    });
}

function formatReason(content) {
  if (!content || typeof content !== "string") {
    return "Invalid reason";
  }

  const reason = content.split("\n")[1];

  if (reason) {
    const reasonText = reason.split(":")[1];
    return reasonText ? reasonText.trim() : "Không có lí do cụ thể";
  }

  return "Không có lí do cụ thể";
}

const Utils = {
  getStringComment,
  getStringReply,
  getStringPost,
  formatPostTime,
  formatDate,
  formatDateTime,
  formatContent,
  formatReason,
};

export default Utils;
