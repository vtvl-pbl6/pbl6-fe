import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../contexts/themeContext";
import AccountContext from "../../../contexts/AccountContext";
import { Link } from "react-router-dom";
import {
  HomeFilled,
  SearchOutlined,
  PlusOutlined,
  HeartOutlined,
  UserOutlined,
  SettingOutlined,
  RightOutlined,
  LeftOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import i18n from "../../../i18n";
import "./sidebar.scss";
import CreatePost from "../../../components/post/CreatePost";

const Sidebar = ({ activeIcon, setActiveIcon }) => {
  const { currentTheme, toggleTheme, isDarkMode } = useContext(ThemeContext);
  const [isSettingMenuOpen, setIsSettingMenuOpen] = useState(false);
  const [isAppearanceMenuOpen, setIsAppearanceMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const { logout } = useContext(AccountContext);
  const iconColor = (iconName) =>
    activeIcon === iconName ? currentTheme.text : currentTheme.gray;

  const toggleSettingMenu = () => {
    setIsSettingMenuOpen(!isSettingMenuOpen);
    setIsAppearanceMenuOpen(false);
    setIsLanguageMenuOpen(false);
  };

  const openAppearanceMenu = () => {
    setIsAppearanceMenuOpen(true);
    setIsLanguageMenuOpen(false);
  };

  const openLanguageMenu = () => {
    setIsLanguageMenuOpen(true);
    setIsAppearanceMenuOpen(false);
  };

  const closeSettingMenu = (e) => {
    if (!e.target.closest(".setting-item")) {
      setIsSettingMenuOpen(false);
      setIsAppearanceMenuOpen(false);
      setIsLanguageMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isSettingMenuOpen) {
      document.addEventListener("click", closeSettingMenu);
    } else {
      document.removeEventListener("click", closeSettingMenu);
    }
    return () => {
      document.removeEventListener("click", closeSettingMenu);
    };
  }, [isSettingMenuOpen]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      className="sidebar"
      style={{
        backgroundColor: currentTheme.background,
        "--hover-color": currentTheme.lightGray,
        "--border-color": currentTheme.borderColor,
      }}
    >
      <div className="logo-section"></div>
      <div className="sidebar-menu">
        <Link
          to="/user-homepage"
          className="sidebar-item"
          onClick={() => setActiveIcon("home")}
        >
          <HomeFilled style={{ color: iconColor("home") }} />
        </Link>
        <Link
          to="/search"
          className="sidebar-item"
          onClick={() => setActiveIcon("search")}
        >
          <SearchOutlined style={{ color: iconColor("search") }} />
        </Link>
        <div
          className="sidebar-item"
          style={{ backgroundColor: currentTheme.lightGray }}
          onClick={() => setIsCreatePostOpen(true)}
        >
          <PlusOutlined
            className="plus-icon"
            style={{ color: iconColor("post") }}
          />
        </div>
        <Link
          to="/activity"
          className="sidebar-item"
          onClick={() => setActiveIcon("activity")}
        >
          <HeartOutlined style={{ color: iconColor("activity") }} />
        </Link>
        <Link
          to="/profile "
          className="sidebar-item"
          onClick={() => setActiveIcon("user")}
        >
          <UserOutlined style={{ color: iconColor("user") }} />
        </Link>
      </div>

      <div className="setting-item">
        <SettingOutlined
          onClick={toggleSettingMenu}
          style={{ color: currentTheme.text }}
        />
        {isSettingMenuOpen && (
          <div
            className={`setting-menu ${
              isAppearanceMenuOpen ? "show-appearance expanded" : ""
            } ${isLanguageMenuOpen ? "show-language expanded" : ""}`}
            style={{
              backgroundColor: currentTheme.extraLightGray,
              color: currentTheme.text,
            }}
          >
            <div className="settings-menu">
              <div className="setting-option" onClick={openAppearanceMenu}>
                Appearance{" "}
                <RightOutlined
                  style={{
                    fontSize: "13px",
                    color: currentTheme.gray,
                    marginLeft: "84px",
                  }}
                />
              </div>
              <div className="setting-option" onClick={openLanguageMenu}>
                Language{" "}
                <RightOutlined
                  style={{
                    fontSize: "13px",
                    color: currentTheme.gray,
                    marginLeft: "100px",
                  }}
                />
              </div>
              <div className="setting-option">Settings</div>
              <hr style={{ flex: 1, borderColor: currentTheme.borderColor }} />
              <div
                className="setting-option"
                onClick={async () => {
                  await logout();
                }}
              >
                Log out
              </div>
            </div>
            <div className="appearance-menu">
              <div
                className="back-option"
                onClick={() => setIsAppearanceMenuOpen(false)}
              >
                <LeftOutlined
                  style={{
                    fontSize: "13px",
                    color: currentTheme.gray,
                    marginRight: "40px",
                  }}
                />{" "}
                Appearance
              </div>
              <div
                className="appearance-options"
                style={{
                  marginTop: "10px",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isDarkMode ? "#0A0A0A" : "#FAFAFA",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    onClick={() => {
                      if (isDarkMode) toggleTheme();
                    }}
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: isDarkMode ? "#0A0A0A" : "#F5F5F5",
                      borderColor: isDarkMode ? "" : "#D0D0D0",
                      borderWidth: isDarkMode ? "0px" : "1px",
                      borderStyle: isDarkMode ? "" : "solid",
                      borderRadius: "5px",
                    }}
                  >
                    <SunOutlined
                      style={{
                        color: isDarkMode ? "#777777" : "#000000",
                      }}
                    />
                  </div>
                  <div
                    onClick={() => {
                      if (!isDarkMode) toggleTheme();
                    }}
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: isDarkMode ? "#1E1E1E" : "#FAFAFA",
                      borderColor: isDarkMode ? "#3e3f3f" : "",
                      borderWidth: isDarkMode ? "1px" : "",
                      borderStyle: isDarkMode ? "solid" : "",
                      borderRadius: "5px",
                    }}
                  >
                    <MoonOutlined
                      style={{
                        color: isDarkMode ? "#ffffff" : "#777777",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="language-menu">
              <div
                className="back-option"
                onClick={() => setIsLanguageMenuOpen(false)}
              >
                <LeftOutlined
                  style={{
                    fontSize: "13px",
                    color: currentTheme.gray,
                    marginRight: "50px",
                  }}
                />{" "}
                Language
              </div>
              <div className="lang-options-container">
                <div
                  className="lang-option"
                  onClick={() => changeLanguage("en")}
                >
                  EN
                </div>
                <div
                  className="lang-option"
                  onClick={() => changeLanguage("vi")}
                >
                  VI
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isCreatePostOpen && (
        <CreatePost
          isOpen={isCreatePostOpen}
          onClose={() => setIsCreatePostOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
