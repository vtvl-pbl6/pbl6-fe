import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./UserHeader.scss";
import AccountContext from "../../contexts/AccountContext";
import { useTranslation } from "react-i18next";
import noAvt from "../../assets/imgs/no_avt.jpg";
import { color } from "framer-motion";
import { ThemeContext } from "../../contexts/themeContext";

const UserHeader = () => {
  const { account } = useContext(AccountContext);
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);
  const followerText =
    account.followers?.length > 1 ? t("followers") : t("follower");
  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="details">
          <h2 className="username">{account.display_name || ""}</h2>
          <p className="fullname">{account.last_name || ""}</p>
          <p className="bio">{account.bio || ""}</p>
          <p className="followers">
            {account.followers?.length || 0} {followerText}
          </p>
        </div>
        <img src={account.avatar_file || noAvt} className="profile-image" />
      </div>
      <Link
        to="/edit-profile"
        className="edit-button"
        style={{ color: currentTheme.text }}
      >
        {t("profile.editProfile")}
      </Link>
    </div>
  );
};

export default UserHeader;
