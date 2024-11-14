import React, { useContext, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/themeContext";
import AccountAPI from "../../../api/accountAPI";
import debounce from "lodash/debounce";
import { SearchOutlined } from "@ant-design/icons";
import noAvt from "../../../assets/imgs/no_avt.jpg";
import "./index.scss";

const Search = ({ setActiveIcon }) => {
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); 

  const searchUsers = async (query) => {
    try {
      const response = await AccountAPI.searchUsers(query, 1);
      if (response.data.is_success) {
        setSearchResults(response.data.data);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query) {
        searchUsers(query);
      }
    }, 200),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleFollowUnfollow = async (userId, isFollowing) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = isFollowing
        ? await AccountAPI.unfollowUser(userId)
        : await AccountAPI.followUser(userId);

      if (response.data.is_success) {
        setSearchResults((prevResults) =>
          prevResults.map((user) =>
            user.id === userId
              ? { ...user, is_followed_by_current_user: !isFollowing }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Error in follow/unfollow:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setActiveIcon("search");
  }, [setActiveIcon]);

  return (
    <div
      className="container-main"
      style={{
        backgroundColor: currentTheme.bgPost,
        color: currentTheme.text,
        "--border-color": currentTheme.borderColor,
      }}
    >
      <div className="search-header">
        <div
          className="search-box"
          style={{ backgroundColor: currentTheme.background }}
        >
          <i className="search-icon">
            <SearchOutlined />
          </i>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={t("search.search")}
            style={{
              color: currentTheme.text,
            }}
          />
        </div>
      </div>
      <div className="search-body">
        {searchResults.length > 0 ? (
          searchResults.map((user) => (
            <div key={user.id} className="profile-card">
              <div className="profile-info">
                <img
                  src={user.avatar || noAvt}
                  alt="Avatar"
                  className="avatar"
                />
                <div className="profile-details">
                  <strong className="username">{user.display_name}</strong>
                  <p className="display-name">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="followers">
                    {user.follower_num} {t("profile.followers")}
                  </p>
                </div>
              </div>
              <button
                className="follow-btn"
                onClick={() =>
                  handleFollowUnfollow(
                    user.id,
                    user.is_followed_by_current_user
                  )
                }
                disabled={loading}
              >
                {user.is_followed_by_current_user
                  ? t("activity.unfollow")
                  : t("activity.follow")}
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">{t("search.no_results")}</p>
        )}
      </div>
    </div>
  );
};

export default Search;
