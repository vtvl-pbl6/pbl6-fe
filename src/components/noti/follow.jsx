import React, { useState } from "react";
import Utils from "../../support/support_function";
import { useTranslation } from "react-i18next";
import noAvt from "../../assets/imgs/no_avt.jpg";
import "./follow.scss";
import accountInfoAPI from "../../api/accountAPI";

const Follow = ({ follower }) => {
  const { t } = useTranslation();
  const [isFollowing, setIsFollowing] = useState(follower.isFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = isFollowing
        ? await accountInfoAPI.unfollowUser(follower.sender.id)
        : await accountInfoAPI.followUser(follower.sender.id);

      if (response.is_success) {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error("Error handling follow:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="follower-item" key={follower.id}>
      <div className="follower-info">
        <img
          src={follower.sender?.avatar || noAvt}
          className="follower-avatar"
        />
        <div className="follower-details">
          <div className="row-1">
            <div className="follower-username">
              {follower.sender?.display_name}
            </div>
            <div className="follower-time">
              {Utils.formatPostTime(follower.created_at)}
            </div>
          </div>
          <div className="row-2">{t("activity.follow-u")}</div>
        </div>
      </div>
      <button
        className="follow-back-btn"
        onClick={handleFollow}
        disabled={loading}
      >
        {isFollowing ? t("activity.unfollow") : t("activity.follow_back")}
      </button>
    </div>
  );
};

export default Follow;
