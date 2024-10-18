import React, { useContext } from "react";
import "./OtherHeader.scss";
import AccountContext from "../../contexts/AccountContext";
import { useTranslation } from "react-i18next";
import noAvt from "../../assets/imgs/no_avt.jpg";
import { color } from "framer-motion";
import { ThemeContext } from "../../contexts/themeContext";
import BaseButton from "../base/baseButton";
import { background } from "@chakra-ui/react";

const OtherHeader = () => {
  const { account } = useContext(AccountContext);
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);
  // const followerText =
  //   account.followers?.length > 1 ? t("followers") : t("follower");
  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="details">
          <h2 className="username"> ThuyLe
            {/* {account.display_name || ""} */}
          </h2>
          <p className="fullname">lethuy200
            {/* {account.last_name || ""} */}
          </p>
          <p className="bio">arigatou
            {/* {account.bio || ""} */}
          </p>
          <p className="followers"> 1000
            {/* {account.followers?.length || 0} {followerText} */}
          </p>
        </div>
        <img 
        // src={account.avatar_file || noAvt}
        className="profile-image" />
      </div>
      {/* <div className="header-actions">
        <button className="btn-follow">Follow</button>
      </div> */}
      <div className="header-actions">
          <BaseButton
            title="Follow"
            buttonStyle={{padding : '7px',width: '80%'}}
            className="btn-follow">
            {/* style={{
              color: currentTheme.text
            }} */}
            {t("Follow")}
            </BaseButton>
        </div>
    </div>
  );
};

export default OtherHeader;