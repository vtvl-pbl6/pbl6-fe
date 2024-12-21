import React from "react";

const Comment = ({ comment }) => {
  return (
    <div className="comments-list">
      <div className="comment-item" key={comment.id}>
        <div className="comment-info">
          <img
            src={comment.avatar}
            alt={comment.username}
            className="comment-avatar"
          />
          <div
            className={`comment-details ${
              comment.isSelfPost ? "self-post" : ""
            }`}
          >
            <div className="comment-username">{comment.username}</div>
            <div className="comment-time">{comment.time}</div>
            <div className="comment-text">{comment.comment}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
