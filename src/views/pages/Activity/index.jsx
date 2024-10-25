import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/themeContext";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./index.scss";

const Activity = ({ setActiveIcon }) => {
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);
  const [selectedItem, setSelectedItem] = useState("all");
  const [followers, setFollowers] = useState([
    {
      id: 1,
      username: "diemhanh2007",
      time: "3w",
      avatar: "path/to/avatar1.jpg",
    },
    { id: 2, username: "pret_tzyy", time: "4w", avatar: "path/to/avatar2.jpg" },
  ]);
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "ne.itfot",
      time: "10w",
      avatar: "path/to/avatar_comment1.jpg",
      comment: "Mê Haikyuu!! quá đi mí bảnh ơi 😢",
      isSelfPost: true, // Post by yourself
    },
    {
      id: 2,
      username: "_red.san",
      time: "10w",
      avatar: "path/to/avatar_comment2.jpg",
      comment: "sao bạn không nói mình xem sớm hơn...",
      isSelfPost: false, // Comment by others
    },
    {
      id: 3,
      username: "_red.san",
      time: "11w",
      avatar: "path/to/avatar_comment2.jpg",
      comment: "dữ ha",
      isSelfPost: false, // Comment by others
    },
    // Add more comments here...
  ]);

  const handleMenuClick = (e) => {
    setSelectedItem(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick} className="activity-dropdown">
      <Menu.Item key="all">{t("activity.all")}</Menu.Item>
      <Menu.Item key="follow">{t("activity.follow")}</Menu.Item>
      <Menu.Item key="like">{t("activity.like")}</Menu.Item>
      <Menu.Item key="comment">{t("activity.comment")}</Menu.Item>
      <Menu.Item key="repost">{t("activity.repost")}</Menu.Item>
    </Menu>
  );

  useEffect(() => {
    setActiveIcon("activity");
  }, [setActiveIcon]);

  return (
    <div className="main-wrapper">
      <div className="activity-header">
        {t(`activity.${selectedItem}`)}
        <Dropdown style={{}} overlay={menu} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <DownOutlined
              style={{
                color: currentTheme.text,
                marginLeft: "10px",
                fontSize: "10px",
              }}
            />
          </a>
        </Dropdown>
      </div>
      <div
        className="container-main"
        style={{
          backgroundColor: currentTheme.bgPost,
          color: currentTheme.text,
          "--border-color": currentTheme.borderColor,
        }}
      >
        <div className="activity-body">
          {selectedItem === "follow" && (
            <div className="followers-list">
              {followers.map((follower) => (
                <div className="follower-item" key={follower.id}>
                  <div className="follower-info">
                    <img
                      src={follower.avatar}
                      alt={follower.username}
                      className="follower-avatar"
                    />
                    <div className="follower-details">
                      <div className="follower-username">
                        {follower.username}
                      </div>
                      <div className="follower-time">{follower.time}</div>
                    </div>
                  </div>
                  <button className="follow-back-btn">
                    {t("activity.follow_back")}
                  </button>
                </div>
              ))}
            </div>
          )}

          {selectedItem === "comment" && (
            <div className="comments-list">
              {comments.map((comment) => (
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
