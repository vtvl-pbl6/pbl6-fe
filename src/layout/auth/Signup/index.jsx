import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import authAPI from "../../../api/authAPI";
import BaseButton from "../../../components/base/baseButton";
import BaseInput from "../../../components/base/baseInput";
import { ThemeContext } from "../../../contexts/themeContext";
import "./index.scss";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const { currentTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSignup = () => {
    setErrors({});

    if (validator.isEmpty(email)) {
      setErrors((prev) => ({ ...prev, email: t("validation.emailRequired") }));
      return;
    }

    if (!validator.isEmail(email)) {
      setErrors((prev) => ({ ...prev, email: t("validation.invalidEmail") }));
      return;
    }

    if (validator.isEmpty(username)) {
      setErrors((prev) => ({
        ...prev,
        username: t("validation.usernameRequired"),
      }));
      return;
    }

    if (validator.isEmpty(password)) {
      setErrors((prev) => ({
        ...prev,
        password: t("validation.passwordRequired"),
      }));
      return;
    }

    if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: t("validation.passwordMinLength"),
      }));
      return;
    }

    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$/;
    if (!passwordCriteria.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password: t("validation.passwordCriteria"),
      }));
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: t("validation.passwordMismatch"),
      }));
      return;
    }

    const userAccount = {
      email: email,
      username: username,
      password: password,
      confirm_password: confirmPassword,
    };

    const callAPI = async () => {
      try {
        const response = await authAPI.register(userAccount);

        const { is_success } = response.data

        if(is_success) {
          toast.success(t("accountRegistered"));
          setTimeout(navigate("/auth/login"), 1000);
        }
      } catch (error) {
        if (error.response.data) {
          const {errors} = error.response.data
          errors.map(error => {
            toast.error(error.message);
          })
        } else {
          toast.error(t("signupFailed"));
        }
      }
    };

    callAPI();
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
        theme="colored"
      />

      <div
        className="signup-container"
        style={{ backgroundColor: currentTheme.extraLightGray }}
      >
        <h2 style={{ color: currentTheme.text }}>{t("welcome")}</h2>

        <form
          className="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <BaseInput
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}

          <BaseInput
            placeholder={t("username")}
            containerStyles={{ marginBottom: "10px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <div className="error-message">{errors.username}</div>
          )}

          <BaseInput
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}

          <BaseInput
            type="password"
            placeholder={t("confirmPassword")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <div className="error-message">{errors.confirmPassword}</div>
          )}

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
