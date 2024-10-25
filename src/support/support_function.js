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

const Utils = {
  getStringComment,
  getStringReply,
  getStringPost,
  formatPostTime,
};

export default Utils;
