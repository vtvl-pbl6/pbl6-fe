import React, { useContext, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/themeContext";
import accountInfoAPI from "../../../api/accountAPI";
import debounce from "lodash/debounce";
import { SearchOutlined } from "@ant-design/icons";
import marAvt from "../../../assets/imgs/mark.png";
import "./index.scss";

const Search = ({ setActiveIcon }) => {
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchUsers = async (query) => {
    try {
      const response = await accountInfoAPI.searchUsers(query, 1);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query) {
        searchUsers(query);
      }
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
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
            placeholder={t("search")}
            style={{
              color: currentTheme.text,
            }}
          />
        </div>
      </div>
      <div className="search-body">
        <div className="search-results">
          <div className="profile-card">
            <div className="profile-info">
              <img src={marAvt} alt="Avatar" className="avatar" />
              <div className="profile-details">
                <strong className="username">hoaiitu_</strong>
                <p className="display-name">
                  Hoaii Tu{" "}
                  <span role="img" aria-label="sunflower">
                    🌻
                  </span>
                </p>
                <p className="followers">96 followers</p>
              </div>
            </div>
            <button className="follow-btn">Follow back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
