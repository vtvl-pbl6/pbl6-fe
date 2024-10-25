import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../contexts/themeContext";
import "./index.scss";
import { useTranslation } from "react-i18next";
import OtherPost from "../../../components/viewprofile/OtherPost";
import OtherRepost from "../../../components/viewprofile/OtherRepost";
import OtherHeader from "../../../components/viewprofile/OtherHeader";

const ViewProfile = ({ setActiveIcon }) => {
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("threads");

  // useEffect(() => {
  //   setActiveIcon("user");
  // }, [setActiveIcon]);

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
          <OtherHeader />
        </div>
      </div>
      <div className="tab-container">
        <div
          className={`tab ${activeTab === "threads" ? "active" : ""}`}
          onClick={() => setActiveTab("threads")}
        >
          {/* {t("profile.Threads")} */}
          {t("Threads")}
        </div>
        <div
          className={`tab ${activeTab === "reposts" ? "active" : ""}`}
          onClick={() => setActiveTab("reposts")}
        >
          {/* {t("profile.Reposts")} */}
          {t("Reposts")}
        </div>
      </div>
      <div className="profile-body-post">
        <div className="profile-post">
          {activeTab === "threads" ? <OtherPost /> : <OtherRepost />}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
