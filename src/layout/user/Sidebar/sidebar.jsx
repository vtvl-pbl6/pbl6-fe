import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../contexts/themeContext";
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

const Sidebar = ({ activeIcon, setActiveIcon }) => {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  const [isSettingMenuOpen, setIsSettingMenuOpen] = useState(false);
  const [isAppearanceMenuOpen, setIsAppearanceMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

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
        <Link
          to="/post"
          className="sidebar-item"
          onClick={() => setActiveIcon("post")}
        >
          <PlusOutlined style={{ color: iconColor("post") }} />
        </Link>
        <Link
          to="/activity"
          className="sidebar-item"
          onClick={() => setActiveIcon("activity")}
        >
          <HeartOutlined style={{ color: iconColor("activity") }} />
        </Link>
        <Link
          to="/user"
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
                Appearance <RightOutlined />
              </div>
              <div className="setting-option" onClick={openLanguageMenu}>
                Language <RightOutlined />
              </div>
              <div className="setting-option">Settings</div>
              <hr style={{ flex: 1, borderColor: currentTheme.gray }} />
              <div className="setting-option">Log out</div>
            </div>
            <div className="appearance-menu">
              <div
                className="back-option"
                onClick={() => setIsAppearanceMenuOpen(false)}
              >
                <LeftOutlined /> Appearance
              </div>
              <div className="appearance-options">
                <div
                  className="setting-option"
                  onClick={toggleTheme}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: `1px solid ${currentTheme.borderColor}`,
                    borderRadius: "5px",
                    margin: "5px",
                    padding: "10px",
                  }}
                >
                  <SunOutlined />
                </div>
                <div
                  className="setting-option"
                  onClick={toggleTheme}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: `1px solid ${currentTheme.borderColor}`,
                    borderRadius: "5px",
                    margin: "5px",
                    padding: "10px",
                  }}
                >
                  <MoonOutlined />
                </div>
              </div>
            </div>
            <div className="language-menu">
              <div
                className="back-option"
                onClick={() => setIsLanguageMenuOpen(false)}
              >
                <LeftOutlined /> Language
              </div>
              <div
                className="setting-option"
                onClick={() => changeLanguage("en")}
              >
                EN
              </div>
              <div
                className="setting-option"
                onClick={() => changeLanguage("vi")}
              >
                VI
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
