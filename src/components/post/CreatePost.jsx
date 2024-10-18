import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import "./CreatePost.scss";
import postAPI from "../../api/postAPI";
import { ToastContainer, toast } from "react-toastify";
import { Dropdown, Button, Menu } from "antd";
import "react-toastify/dist/ReactToastify.css";
import ImageList from "./ImageList";
import AccountContext from "../../contexts/AccountContext";
import noAvt from "../../assets/imgs/no_avt.jpg";
import BaseButton from "../base/baseButton";
import { ThemeContext } from "../../contexts/themeContext";

const MAX_CHAR = 500;

const CreatePost = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext); // Lấy currentTheme từ context
  const [files, setFiles] = useState([]);
  const { account } = useContext(AccountContext);
  const handleFileChange = (event) => {
    setFiles([...files, ...Array.from(event.target.files)]);
  };
  const [postContent, setPostContent] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [loading, setLoading] = useState(false);

  const handleContentChange = (e) => {
    const inputText = e.target.value;

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostContent(truncatedText);
    } else {
      setPostContent(inputText);
    }
  };

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setPostContent(e.target.value);
  };

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", postContent);
      formData.append("visibility", visibility);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await postAPI.createPost(formData);
      if (res.data.error) {
        toast.error(res.data.error);
        return;
      }
      toast.success(t("post_created_successfully"));
      onClose();
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleVisibilityChange = ({ key }) => {
    setVisibility(key);
  };

  const visibilityMenu = (
    <Menu onClick={handleVisibilityChange}>
      <Menu.Item key="PUBLIC">{t("createPost.public")}</Menu.Item>
      <Menu.Item key="FRIEND_ONLY">{t("createPost.friend_only")}</Menu.Item>
      <Menu.Item key="PRIVATE">{t("createPost.private")}</Menu.Item>
    </Menu>
  );

  if (!isOpen) return null;

  return (
    <>
      <div className="modal">
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content">
          <div className="modal-header" style={{ color: currentTheme.text }}>
            <h2>{t("createPost.new_thread")}</h2>
          </div>
          <div
            className="body-container"
            style={{ backgroundColor: currentTheme.bgPost }}
          >
            <div
              className="modal-body"
              style={{ backgroundColor: currentTheme.bgPost }}
            >
              <div
                className="form-control"
                style={{ backgroundColor: currentTheme.bgPost }}
              >
                <div
                  className="form-left"
                  style={{ backgroundColor: currentTheme.bgPost }}
                >
                  <div className="avatar">
                    <img src={account.avatar_file || noAvt} alt="Avatar" />
                  </div>
                  <div className="vertical-line"></div>
                  <div className="mini-avatar">
                    <img src={noAvt} alt="Mini Avatar" />
                  </div>
                </div>
                <div className="form-right">
                  <div
                    className="display-name"
                    style={{ color: currentTheme.text }}
                  >
                    {account.display_name}
                  </div>
                  <div
                    className="input"
                    style={{ backgroundColor: currentTheme.bgPost }}
                  >
                    <textarea
                      placeholder={t("createPost.what_is_new")}
                      onChange={handleContentChange}
                      onInput={handleInput}
                      value={postContent}
                      className="textarea"
                      style={{
                        color: currentTheme.text,
                        backgroundColor: currentTheme.bgPost,
                      }}
                    />
                    <ImageList
                      files={files}
                      setFiles={setFiles}
                      isEditable={true}
                    />
                  </div>
                  <div className="icon-container">
                    <label htmlFor="file-upload" className="file-upload-label">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H13.5V8.25z"
                        />
                      </svg>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Dropdown overlay={visibilityMenu} trigger={["hover"]}>
                <Button
                  className="visibility-dropdown"
                  style={{
                    color: currentTheme.text,
                    backgroundColor: currentTheme.bgPost,
                  }}
                >
                  {t(`createPost.${visibility.toLowerCase()}`)}
                </Button>
              </Dropdown>
              <BaseButton
                title={loading ? t("createPost.posting") : t("createPost.post")}
                onClick={handleCreatePost}
                buttonStyle={{
                  padding: "0px 0px",
                  fontSize: "6px",
                  width: "55px",
                  height: "30px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreatePost;
