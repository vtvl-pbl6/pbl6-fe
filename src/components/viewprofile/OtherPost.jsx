import { Box, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../action/Actions";
import { useContext, useEffect, useState } from "react";
import postAPI from "../../api/postAPI";
import AccountContext from "../../contexts/AccountContext";
import noAvt from "../../assets/imgs/no_avt.jpg";
import { TailSpin } from "react-loader-spinner";
import { ThemeContext } from "../../contexts/themeContext";
// import CreatePost from "../post/CreatePost";
import { useTranslation } from "react-i18next";
import ImageList from "../post/ImageList";
import "./OtherPost.scss";

const OtherPost = () => {
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const { userPosts, setUserPosts, userPage, setUserPage, account } =
    useContext(AccountContext);
  // const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  useEffect(() => {
    const callAPI = async () => {
      try {
        setIsLoading(true);
        const response = await postAPI.getPostsByAuthor(userPage, account.id);
        if (response.data.is_success) {
          const newPosts = response.data.data;
          if (newPosts.length === 0) {
            setHasMorePosts(false);
          } else {
            setUserPosts((prevPosts) => [...prevPosts, ...newPosts]);
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if ((userPosts.length === 0 || userPage > 1) && hasMorePosts) {
      callAPI();
    }
  }, [userPage]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 80
      ) {
        if (!isLoading) {
          setUserPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);
  return (
    <>
      {/* <div className="create-post" onClick={() => setIsCreatePostOpen(true)}>
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
      </div> */}
      {userPosts.length > 0 ? (
        userPosts.map((post, index) => {
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
                    <ImageList
                      files={post.files}
                      setFiles={() => {}}
                      isEditable={false}
                    />
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
      {/* {isCreatePostOpen && (
        <CreatePost
          isOpen={isCreatePostOpen}
          onClose={() => setIsCreatePostOpen(false)}
        />
      )} */}
    </>
  );
};

export default OtherPost;
