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

function getStringApproveForm(form) {
  if (form === 0 || form === 1) {
    return form + " form";
  } else {
    return form + " forms";
  }
}

function convertDateFromArrayToString(dateArray) {
  if (!Array.isArray(dateArray)) {
    return dateArray;
  }
  let [year, month, day] = dateArray;
  month = month.toString().padStart(2, "0");
  day = day.toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCurrentlyDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const day = ("0" + currentDate.getDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
function removeSpaceInString(str) {
  return str.replace(/\s+/g, "");
}

function getFirstCharacter(str) {
  return str.charAt(0);
}

function getCurrentDateTime() {
  var now = new Date();

  var year = now.getFullYear();
  var month = String(now.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần cộng thêm 1 và đảm bảo có 2 chữ số
  var day = String(now.getDate()).padStart(2, "0"); // Đảm bảo có 2 chữ số
  var hours = String(now.getHours()).padStart(2, "0"); // Đảm bảo có 2 chữ số
  var minutes = String(now.getMinutes()).padStart(2, "0"); // Đảm bảo có 2 chữ số

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const Utils = {
  getCurrentlyDate,
  getStringComment,
  getStringReply,
  getStringPost,
  getStringApproveForm,
  removeSpaceInString,
  getFirstCharacter,
  convertDateFromArrayToString,
  getCurrentDateTime,
};

export default Utils;
