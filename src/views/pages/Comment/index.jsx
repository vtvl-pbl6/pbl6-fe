import React, { useState } from 'react';
import './index.scss';
import BaseButton from '../../../components/base/baseButton';

const ThreadReply = () => {
  const [replyText, setReplyText] = useState('');

  return (
    <div className="thread-container">
      {/* Original Post
      <div className="post">
        <div className="post-header">
          <div className="user-info">
            <img 
              src="/placeholder.svg?height=40&width=40" 
              alt="User avatar" 
              className="avatar"
            />
            <div className="user-details">
              <span className="username">grindsuccess</span>
              <span className="post-time">22 giờ</span>
            </div>
          </div>
          <button className="more-options">•••</button>
        </div>
        <div className="post-content">
          <div className="quote-box">
            <h2>Don't tell people your plans</h2>
            <p>Show them your results.</p>
          </div>
        </div>
      </div> */}

      {/* Reply Section */}
      <div className="reply-section">
        <div className="reply-header">
          <button className="cancel-btn">Hủy</button>
          <span className="reply-to">Bình luận</span>
        </div>
        
        <div className="post">
        <div className="post-header">
          <div className="user-info">
            <img 
              src="/placeholder.svg?height=40&width=40" 
              alt="User avatar" 
              className="avatar"
            />
            <div className="user-details">
              <span className="username">grindsuccess</span>
              <span className="post-time">22 giờ</span>
            </div>
          </div>
          <button className="more-options">•••</button>
        </div>
        {/* Nội dung bài post */}
        <div className="post-content">
          <div className="quote-box">
            <p>Don't tell people your plans</p>
            <img src='/post1.png'/>
          </div>
        </div>
      </div>    

        <div className="reply-compose">
          <img 
            src="/placeholder.svg?height=40&width=40" 
            alt="User avatar" 
            className="avatar"
          />
          <div className="reply-input-container">
            <div className="user-details">
              <span className="other_username">tien.nof</span>
            </div>
            <span className="reply-to-user"></span>
            <textarea
              placeholder="Thêm bình luận"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="reply-input"
            />
            {/* <div className="reply-actions">
              <button className="action-btn">
                <i className="media-icon">🖼️</i>
              </button>
              <button className="action-btn">
                <i className="gif-icon">GIF</i>
              </button>
              <button className="action-btn">
                <i className="hashtag-icon">#</i>
              </button>
              <button className="action-btn">
                <i className="more-icon">⋯</i>
              </button>
            </div> */}
          </div>
        </div>

        <div className="reply-footer">
          <span className="reply-note">Bất kỳ ai cũng có thể trả lời và trích dẫn</span>
          <BaseButton className="post-btn" disabled={!replyText}>Đăng</BaseButton>
        </div>
      </div>
    </div>
  );
};

export default ThreadReply;