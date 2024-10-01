import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar/sidebar";
import { ThemeContext } from "../../contexts/themeContext";
import "./UserLayout.scss";

function UserLayout(props) {
  const [activeIcon, setActiveIcon] = useState("home");
  const { currentTheme } = useContext(ThemeContext);

  return (
    <div className="layout-wrapper">
      <Sidebar activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      <div
        className="content-body"
        style={{
          background: currentTheme.background,
          color: currentTheme.text,
        }}
      >
        <props.component setActiveIcon={setActiveIcon} />
      </div>
    </div>
  );
}

export default UserLayout;
