import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/themeContext";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import i18n from "../../../i18n";
import authAPI from "../../../api/authAPI";
import useAuth from "../../../hooks/useAuth";
import BaseButton from "../../../components/base/baseButton";
import BaseInput from "../../../components/base/baseInput";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken, account } = useAuth();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { currentTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const handleLogin = () => {
    setErrors({});
    if (!validator.isEmail(email)) {
      setErrors((prev) => ({ ...prev, email: t("invalidEmail") }));
      return;
    }

    if (validator.isEmpty(password)) {
      setErrors((prev) => ({ ...prev, password: t("requiredPassword") }));
      return;
    }

    const callAPI = async () => {
      try {
        const values = { email, password };
        const response = await authAPI.login(values);

        if (response.data.errors) {
          toast.error(response.data.errors);
          return;
        }

        if (response.status === 200) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(t("loginSuccess"));
          setTimeout(() => navigate("/user-homepage"), 2000);
        } else {
          toast.error(t("loginFailed"));
        }
      } catch (e) {
        console.error(e);
        toast.error(t("loginFailed"));
      }
    };
    callAPI();
  };

  return (
    <div
      className="login-page"
      style={{ backgroundColor: currentTheme.background }}
    >
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <div
        className="login-container"
        style={{ backgroundColor: currentTheme.extraLightGray }}
      >
        <h2 style={{ color: currentTheme.text }}>{t("comeback")}</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <BaseInput
            placeholder={t("email")}
            containerStyles={{ marginBottom: "10px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}

          <BaseInput
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}

          <BaseButton title={t("textLogin")} onClick={handleLogin} />

          <div className="forgot-password">
            <a
              href="/auth/forgot-password"
              style={{ color: currentTheme.text }}
            >
              {t("forgotPassword")}
            </a>
          </div>
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

        <div className="signup-link">
          <span style={{ color: currentTheme.text }}>
            {t("donHaveAcc")}
            <a
              href="/auth/signup"
              style={{ color: currentTheme.text, fontWeight: "bold" }}
            >
              {t("signup")}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
