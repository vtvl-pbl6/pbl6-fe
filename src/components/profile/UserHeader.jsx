import React, { useContext, useState } from "react";
import "./UserHeader.scss";
import AccountContext from "../../contexts/AccountContext";
import { useTranslation } from "react-i18next";
import noAvt from "../../assets/imgs/no_avt.jpg";
import { ThemeContext } from "../../contexts/themeContext";

const UserHeader = () => {
    const { account } = useContext(AccountContext);
    const { t } = useTranslation();
    const { currentTheme } = useContext(ThemeContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(
        account.avatar_file?.url || noAvt
    );

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setSelectedAvatar(e.target.result); // Hiển thị ảnh tạm thời
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        // API upload avatar xử lý tại đây
        console.log("Save profile changes");
    };

    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="details">
                    <h2 className="username">{account.display_name || ""}</h2>
                    <p className="fullname">{account.last_name || ""}</p>
                    <p className="bio">{account.bio || ""}</p>
                    <p className="followers">
                        {account.follower_num || 0} {t("followers")}
                    </p>
                </div>
                <img
                    src={account.avatar_file?.url || noAvt}
                    className="profile-image"
                    alt="avatar"
                />
            </div>
            <button
                className="edit-button"
                style={{
                    color: currentTheme.text,
                    backgroundColor: currentTheme.bgPost,
                }}
                onClick={handleOpenModal}
            >
                {t("profile.editProfile")}
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div
                        className="modal-content"
                        style={{ backgroundColor: currentTheme.bgPost }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>{t("profile.editProfile")}</h2>
                        <form onSubmit={handleSave}>
                            {/* Avatar Editing */}
                            <div className="avatar-wrapper"></div>

                            {/* Other fields */}
                            <label>
                                {t("profile.name")}
                                <input
                                    type="text"
                                    style={{
                                        color: currentTheme.text,
                                    }}
                                    defaultValue={account.display_name || ""}
                                />
                            </label>
                            <label>
                                {t("profile.bio")}
                                <textarea
                                    defaultValue={account.bio || ""}
                                    style={{
                                        backgroundColor: currentTheme.bgPost,
                                        color: currentTheme.text,
                                    }}
                                ></textarea>
                            </label>
                            <label>
                                {t("profile.dob")}
                                <input
                                    type="date"
                                    style={{
                                        backgroundColor: currentTheme.bgPost,
                                        color: currentTheme.text,
                                    }}
                                    defaultValue={account.dob || ""}
                                />
                            </label>
                            <div className="modal-actions">
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: currentTheme.text,
                                        color: currentTheme.bgPost,
                                    }}
                                >
                                    {t("profile.save")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserHeader;
