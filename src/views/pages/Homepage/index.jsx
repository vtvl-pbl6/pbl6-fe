import React, { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Box, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../../../components/action/Actions";
import "./index.scss";
import noAvt from "../../../assets/imgs/no_avt.jpg";
import { ThemeContext } from "../../../contexts/themeContext";
import postAPI from "../../../api/postAPI";
import AccountContext from "../../../contexts/AccountContext";
import CreatePost from "../../../components/post/CreatePost";
import { useTranslation } from "react-i18next";

const Homepage = ({ setActiveIcon }) => {
  const { t } = useTranslation();
  const { posts, setPosts, page, setPage, account } =
    useContext(AccountContext);
  const { currentTheme } = useContext(ThemeContext);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  useEffect(() => {
    setActiveIcon("home");
    const callAPI = async () => {
      try {
        const response = await postAPI.getPosts(page);
        if (response.data.is_success) {
          const newPosts = response.data.data;
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    if (posts.length === 0 || page > 1) {
      callAPI();
    }
    const handleScroll = (e) => {
      const container = e.target;
      if (
        container.scrollHeight - container.scrollTop <=
        container.clientHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const container = document.querySelector(".container-main");
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [page]);

  return (
    <div
      className="container-main"
      style={{
        backgroundColor: currentTheme.bgPost,
        color: currentTheme.text,
        "--border-color": currentTheme.borderColor,
      }}
    >
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
      {posts.length > 0 ? (
        posts.map((post, index) => {
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
        <div className="no-posts">
          <Text
            style={{
              textAlign: "center",
              margin: "20px",
              color: currentTheme.text,
            }}
          >
            {t("post.no_more_posts")}
          </Text>
        </div>
      )}
      {isCreatePostOpen && (
        <CreatePost
          isOpen={isCreatePostOpen}
          onClose={() => setIsCreatePostOpen(false)}
        />
      )}
    </div>
  );
};

export default Homepage;
