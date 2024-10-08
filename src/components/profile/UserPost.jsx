import { Box, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../action/Actions";
import { useContext, useEffect, useState } from "react";
import postAPI from "../../api/postAPI";
import AccountContext from "../../contexts/AccountContext";
import noAvt from "../../assets/imgs/no_avt.jpg";
import { TailSpin } from "react-loader-spinner";
import { ThemeContext } from "../../contexts/themeContext";

const UserPost = () => {
  const { currentTheme } = useContext(ThemeContext);
  const { account } = useContext(AccountContext);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const callAPI = async () => {
      if (!hasMore) return;
      try {
        const response = await postAPI.getPostsByAuthor(page, account.id);
        if (response.data.is_success) {
          const newPosts = response.data.data;
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);

          if (newPosts.length === 0) {
            setHasMore(false);
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    if (posts.length === 0 || page > 1) {
      callAPI();
    }
  }, [page]);

  return (
    <>
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

export default UserPost;
