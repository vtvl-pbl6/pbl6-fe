import React, { useContext, useState, useEffect, useRef } from "react";
import UserHeader from "../../../components/profile/UserHeader";
import UserPost from "../../../components/profile/UserPost";
import { Box, Image, Text, Button } from "@chakra-ui/react";
import { ThemeContext } from "../../../contexts/themeContext";
import markImg from "../../../assets/imgs/mark.png";
import "./index.scss";

const UserPage = () => {
  const { currentTheme } = useContext(ThemeContext);
  return (
    <>
      <div className="profile-header">
        <UserHeader />
      </div>
      <div className="create-post">
        <div className="user-avatar-container">
          <Image src={markImg} className="user-avatar" />
        </div>
        <input
          type="text"
          placeholder="What's new?"
          className="input-post"
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
          Post
        </button>
      </div>
      <div className="profile-post">
        <UserPost />
      </div>
    </>
  );
};

export default UserPage;
