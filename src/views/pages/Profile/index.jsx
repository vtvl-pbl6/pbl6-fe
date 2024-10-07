import React, { useContext, useEffect, useState } from "react";
import UserHeader from "../../../components/profile/UserHeader";
import UserPost from "../../../components/profile/UserPost";
import { Image } from "@chakra-ui/react";
import { ThemeContext } from "../../../contexts/themeContext";
import noAvt from "../../../assets/imgs/no_avt.jpg";
import "./index.scss";
import CreatePost from "../../../components/post/CreatePost";
import { useTranslation } from "react-i18next";
import AccountContext from "../../../contexts/AccountContext";

const UserPage = ({ setActiveIcon }) => {
  const { t } = useTranslation();
  const { account } = useContext(AccountContext);
  const { currentTheme } = useContext(ThemeContext);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  useEffect(() => {
    setActiveIcon("user");
  });

  return (
    <div
      className="container-main"
      style={{
        backgroundColor: currentTheme.bgPost,
        color: currentTheme.text,
        "--border-color": currentTheme.borderColor,
      }}
    >
      <div className="profile-header">
        <div className="profile-info">
          <UserHeader />
        </div>
      </div>
      <div className="create-post" onClick={() => setIsCreatePostOpen(true)}>
        <div className="user-avatar-container">
          <Image src={account?.avatar_file || noAvt} className="user-avatar" />
        </div>
        <input
          type="text"
          placeholder={t("createPost.what_is_new")}
          className="input-post"
          readOnly
          style={{
            backgroundColor: currentTheme.inputBackground,
            color: currentTheme.text,
          }}
        />
        <button
          className="post-button"
          style={{
            backgroundColor: currentTheme.extraLightGray,
            color: currentTheme.text,
          }}
        >
          {t("createPost.post")}
        </button>
      </div>
      <div className="profile-body-post">
        <div className="profile-post">
          <UserPost />
        </div>
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

export default UserPage;
