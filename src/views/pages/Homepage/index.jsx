import React, { useContext, useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";
import { Box, Image, Text, Button } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../../../components/action/Actions";
import "./index.scss";
import noAvt from "../../../assets/imgs/no_avt.jpg";
import markImg from "../../../assets/imgs/mark.png";
import { ThemeContext } from "../../../contexts/themeContext";
import postAPI from "../../../api/postAPI";
import AccountContext from "../../../contexts/AccountContext";
import { usePosts } from "../../../contexts/postContext";

const Homepage = ({ setActiveIcon }) => {
  const { posts, setPosts, page, setPage } = usePosts();
  const [loading, setLoading] = useState();
  const [hasMore, setHasMore] = useState();
  const { account } = useContext(AccountContext);
  const { currentTheme } = useContext(ThemeContext);
  const containerRef = useRef(null);

  useEffect(() => {
    setActiveIcon("home");
    const callAPI = async () => {
      try {
        const response = await postAPI.getPosts(page);
        if (response.data.is_success) {
          setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    if (posts.length === 0 || page > 1) {
      callAPI();
    }
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
      ref={containerRef}
    >
      <div className="create-post">
        <div className="user-avatar-container">
          <Image src={account.avatar_file || noAvt} className="user-avatar" />
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
        <div className="loading-container">
          <TailSpin
            height="25"
            width="25"
            color={currentTheme.text}
            ariaLabel="loading"
          />
        </div>
      )}
    </div>
  );
};

export default Homepage;
