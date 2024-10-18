import React, { useContext, useEffect, useState } from "react";
import UserHeader from "../../../components/profile/UserHeader";
import UserRepost from "../../../components/profile/UserRepost";
import UserPost from "../../../components/profile/UserPost";
import { ThemeContext } from "../../../contexts/themeContext";
import "./index.scss";
import { useTranslation } from "react-i18next";

const UserPage = ({ setActiveIcon }) => {
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("threads");

  useEffect(() => {
    setActiveIcon("user");
  }, [setActiveIcon]);

  return (
    <div
      className="container-main"
      style={{
        backgroundColor: currentTheme.bgPost,
        color: currentTheme.text,
        "--border-color": currentTheme.borderColor,
        "--text-color": currentTheme.text,
      }}
    >
      <div className="profile-header">
        <div className="profile-info">
          <UserHeader />
        </div>
      </div>
      <div className="tab-container">
        <div
          className={`tab ${activeTab === "threads" ? "active" : ""}`}
          onClick={() => setActiveTab("threads")}
        >
          {t("profile.Threads")}
        </div>
        <div
          className={`tab ${activeTab === "reposts" ? "active" : ""}`}
          onClick={() => setActiveTab("reposts")}
        >
          {t("profile.Reposts")}
        </div>
      </div>
      <div className="profile-body-post">
        <div className="profile-post">
          {activeTab === "threads" ? <UserPost /> : <UserRepost />}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
