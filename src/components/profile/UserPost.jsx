import { Box, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../action/Actions";
import { useContext, useEffect, useState } from "react";
import postAPI from "../../api/postAPI";
import AccountContext from "../../contexts/AccountContext";
import noAvt from "../../assets/imgs/no_avt.jpg";
import { ThemeContext } from "../../contexts/themeContext";
import CreatePost from "../post/CreatePost";
import { useTranslation } from "react-i18next";
import ImageList from "../post/ImageList";
import Utils from "../../support/support_function";
import { Dropdown, Menu, Modal, Input, Button } from "antd";
import "./UserPost.scss";
import BaseButton from "../base/baseButton";

const UserPost = () => {
    const { t } = useTranslation();
    const { currentTheme } = useContext(ThemeContext);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const { userPosts, setUserPosts, userPage, setUserPage, account } =
        useContext(AccountContext);
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const [isReportModalVisible, setIsReportModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [postToDelete, setPostToDelete] = useState(null);

    const showDeleteModal = (post) => {
        setIsDeleteModalVisible(true);
        setPostToDelete(post);
    };

    const handleCancelDeleteModal = () => {
        setIsDeleteModalVisible(false);
        setPostToDelete(null);
    };

    const handleDeletePost = () => {
        if (postToDelete) {
            setUserPosts((prevPosts) =>
                prevPosts.filter((post) => post.id !== postToDelete.id)
            );
            alert("Bài đăng đã được xóa.");
            handleCancelDeleteModal();
        }
    };
    const showReportModal = () => {
        setIsReportModalVisible(true);
    };

    const handleCancelReportModal = () => {
        setIsReportModalVisible(false);
        setReportReason("");
    };

    const handleSendReport = () => {
        if (!reportReason.trim()) {
            alert("Vui lòng nhập lý do báo cáo.");
        } else {
            alert(`Báo cáo đã gửi với lý do: ${reportReason}`);
            handleCancelReportModal(); // Đóng modal và reset input
        }
    };

    useEffect(() => {
        const callAPI = async () => {
            try {
                setIsLoading(true);
                const response = await postAPI.getPostsByAuthor(
                    userPage,
                    account.id
                );
                if (response.data.is_success) {
                    const newPosts = response.data.data;
                    if (newPosts.length === 0) {
                        setHasMorePosts(false);
                    } else {
                        setUserPosts((prevPosts) => [
                            ...prevPosts,
                            ...newPosts,
                        ]);
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
            <div
                className="create-post"
                onClick={() => setIsCreatePostOpen(true)}
            >
                <div className="user-avatar-container">
                    <Image
                        src={account?.avatar_file?.url || noAvt}
                        className="user-avatar"
                    />
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
            {userPosts.length > 0 ? (
                userPosts.map((post, index) => {
                    return (
                        <div
                            className="container-post"
                            key={`${post.id}-${index}`}
                        >
                            <div className="header-post">
                                <div className="user-info">
                                    <Image
                                        src={
                                            post.author.avatar_file?.url ||
                                            noAvt
                                        }
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
                                        {Utils.formatPostTime(post.created_at)}
                                    </Text>
                                </div>
                                <div className="more">
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item
                                                    key="edit"
                                                    onClick={() =>
                                                        alert(
                                                            "Chỉnh sửa bài đăng (cần triển khai chi tiết)."
                                                        )
                                                    }
                                                >
                                                    Chỉnh sửa bài đăng
                                                </Menu.Item>
                                                <Menu.Item
                                                    key="delete"
                                                    onClick={() =>
                                                        showDeleteModal(post)
                                                    }
                                                >
                                                    Xóa bài đăng
                                                </Menu.Item>
                                                <Menu.Item
                                                    key="report"
                                                    onClick={showReportModal}
                                                >
                                                    Yêu cầu kiểm duyệt
                                                </Menu.Item>
                                            </Menu>
                                        }
                                        trigger={["click"]}
                                    >
                                        <BsThreeDots
                                            style={{ cursor: "pointer" }}
                                        />
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="post-body">
                                <Text className="post-content">
                                    {post.content}
                                </Text>
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
                                    <Actions
                                        reactionNum={post.reaction_num || null}
                                        sharedNum={post.shared_num || null}
                                        commentsLength={
                                            (post.comments || []).length
                                        }
                                    />
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
            <Modal
                title="Yêu cầu kiểm duyệt"
                visible={isReportModalVisible}
                onCancel={handleCancelReportModal}
                footer={[
                    <Button key="cancel" onClick={handleCancelReportModal}>
                        Hủy
                    </Button>,
                    <BaseButton
                        key="submit"
                        title="Gửi"
                        onClick={handleSendReport}
                        buttonStyle={{
                            backgroundColor: currentTheme.text,
                            color: currentTheme.background,
                            padding: "7px 12px",
                            marginLeft: "5px",
                        }}
                    />,
                ]}
            >
                <Input
                    type="text"
                    rows={4}
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    placeholder="Nhập lý do..."
                />
            </Modal>
            <Modal
                title="Xóa bài đăng"
                visible={isDeleteModalVisible}
                onCancel={handleCancelDeleteModal}
                footer={[
                    <Button key="cancel" onClick={handleCancelDeleteModal}>
                        Hủy
                    </Button>,
                    <BaseButton
                        key="submit"
                        title="Xóa"
                        onClick={handleDeletePost}
                        buttonStyle={{
                            backgroundColor: "red",
                            color: "white",
                            padding: "7px 12px",
                            marginLeft: "5px",
                        }}
                    />,
                ]}
            >
                <Text>Bạn chắc chắn muốn xóa bài đăng này?</Text>
            </Modal>
        </>
    );
};

export default UserPost;
