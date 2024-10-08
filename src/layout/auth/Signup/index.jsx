import React, { useContext, useState } from "react";
import moment from "moment";
import authAPI from "../../../api/authAPI";
import { ThemeContext } from "../../../contexts/themeContext";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseButton from "../../../components/base/baseButton";
import BaseInput from "../../../components/base/baseInput";
import "./index.scss";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const { currentTheme, isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const handleSignup = () => {
    if (
      email === "" ||
      username === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error(
        `${
          (email === "" && "Email") ||
          (password === "" && "Password") ||
          (username === "" && "Username") ||
          (confirmPassword === "" && "Confirm password")
        } can be empty. Please input ${
          (email === "" && "Email") ||
          (password === "" && "Password") ||
          (username === "" && "Username") ||
          (confirmPassword === "" && "Confirm password")
        }`
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error(
        "Your password and confirm password is different. Please re-enter your password and confirm password"
      );
      return;
    }
    var userAccount = {
      email: email,
      username: username,
      password: password,
      confirm_password: confirmPassword,
    };
    const callAPI = async () => {
      await authAPI
        .register(userAccount)
        .then((response) => {
          if (response.data.fail) {
            toast.error(
              "This email has been registered please choose another email to register"
            );
          } else {
            toast.success("Account successfully registered");
          }
        })
        .catch((error) => console.log(error));
    };
    callAPI();
  };
  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };
  return (
    <div
      className="signup-page"
      style={{ backgroundColor: currentTheme.background }}
    >
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="colored"
      />

      <div
        className="signup-container"
        style={{ backgroundColor: currentTheme.extraLightGray }}
      >
        <h2 style={{ color: currentTheme.text }}>{t("welcome")}</h2>

        <form className="signup-form">
          <BaseInput
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <BaseInput
            placeholder={t("username")}
            containerStyles={{ marginBottom: "10px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <BaseInput
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <BaseInput
            placeholder={t("confirmPassword")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <BaseButton title={t("signup")} onClick={handleSignup} />
        </form>
        <div
          className="or-divider"
          style={{ marginTop: "20px", display: "flex", alignItems: "center" }}
        >
          <hr style={{ flex: 1, borderColor: currentTheme.gray }} />
          <span style={{ margin: "0 10px", color: currentTheme.text }}>
            {t("or")}
          </span>
          <hr style={{ flex: 1, borderColor: currentTheme.gray }} />
        </div>
        <div className="login-link" style={{ marginTop: "10px" }}>
          <span style={{ color: currentTheme.text }}>
            {t("haveAcc")}
            <a
              href="/auth/login"
              style={{ color: currentTheme.text, fontWeight: "bold" }}
            >
              {t("textLogin")}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
