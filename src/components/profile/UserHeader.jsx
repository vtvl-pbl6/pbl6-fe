import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./UserHeader.scss";
import AccountContext from "../../contexts/AccountContext";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../contexts/themeContext";
import noAvt from "../../assets/imgs/no_avt.jpg";
const UserHeader = () => {
  const { account } = useContext(AccountContext);
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);
  return (
    <div>
      <div className="profile-info">
        <div className="details">
          <h2 className="username">{account.display_name}</h2>
          <p className="fullname">{account.first_name}</p>
          <p className="bio">{account.bio}</p>
          <p className="followers">46 followers</p>
        </div>
        <img src={account.avatar_file || noAvt} className="profile-image" />
      </div>
      <Link to="/edit-profile" className="edit-button">
        Edit Profile
      </Link>
    </div>
  );
};

export default UserHeader;
