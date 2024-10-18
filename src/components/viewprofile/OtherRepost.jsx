import { Box, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../action/Actions";
import { useContext, useEffect, useState } from "react";
import postAPI from "../../api/postAPI";
import noAvt from "../../assets/imgs/no_avt.jpg";
import { TailSpin } from "react-loader-spinner";
import { ThemeContext } from "../../contexts/themeContext";
import AccountContext from "../../contexts/AccountContext";
import { useTranslation } from "react-i18next";
import "./OtherPost.scss";

const OtherRepost = () => {
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);
  const { reposts, setReposts, repostPage, setRepostPage, account } =
    useContext(AccountContext);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const response = await postAPI.getListReposts(repostPage, account.id);
        if (response.data.is_success) {
          const newPosts = response.data.data;
          setReposts((prevPosts) => [...prevPosts, ...newPosts]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    if (reposts.length === 0 || repostPage > 1) {
      callAPI();
    }
  }, [repostPage]);

  return (
    <>
      {reposts.length > 0 ? (
        reposts.map((post, index) => {
          return (
            <div className="container-post" key={`${post.id}-${index}`}>
              <div className="header-post">
                <div className="user-info">
                  <Image
                    src={post.author.avatar_file || noAvt}
                    className="user-avatar"
                    name={post.author.display_name}
                  />
                  <div
                    className="user-name"
                    style={{ color: currentTheme.text }}
                  >
                    <Text>{post.author.display_name}</Text>
                  </div>
                  <Text className="post-time">
                    {new Date(post.created_at).toLocaleString()}
                  </Text>
                </div>
                <div className="more">
                  <BsThreeDots />
                </div>
              </div>
              <div className="post-body">
                <Text className="post-content">{post.content}</Text>
                {post.files && post.files.length > 0 && (
                  <Box className="post-image">
                    <Image src={post.files} />
                  </Box>
                )}
                <div className="actions">
                  <Actions liked={false} setLiked={() => {}} />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="loading-container">
          <TailSpin
            height="25"
            width="25"
            color={currentTheme.text}
            ariaLabel="loading"
            wrapperStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          />
        </div>
      )}
    </>
  );
};

export default OtherRepost;
