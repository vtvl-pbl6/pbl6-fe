import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/themeContext";
import { SunFilled, MoonFilled } from "@ant-design/icons";
import { useTranslation } from 'react-i18next'; 
import i18n from '../../../i18n'; 
import BaseButton from '../../../components/base/baseButton'; 
import BaseInput from '../../../components/base/baseInput'; 
import "./index.scss";

const Login = () => {
    const { currentTheme, toggleTheme, isDarkMode } = useContext(ThemeContext);
    const { t } = useTranslation();  

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang); 
    };

    return (
        <div style={{ backgroundColor: currentTheme.background, padding: '20px' }}>
            <h2 style={{ color: currentTheme.text }}>{t('welcome')}</h2>

            <form className="login-form">
                <label style={{ color: currentTheme.text }}>{t('textLogin')}:</label>
                
                <BaseInput
                    type="text"
                    placeholder={t('textLogin')}
                    containerStyles={{ marginBottom: '10px' }}
                />

                <label style={{ color: currentTheme.text }}>Password:</label>
                
                <BaseInput
                    type="password"
                    placeholder="Password"
                />

                {/* Sử dụng BaseButton */}
                <BaseButton
                    title={t('textLogin')}
                    buttonStyle={{ backgroundColor: currentTheme.extraLightGray }}
                    onClick={() => { /* Xử lý submit */ }}
                />
            </form>

            <BaseButton
                title={isDarkMode ? <SunFilled /> : <MoonFilled />}
                buttonStyle={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: currentTheme.lightGray
                }}
                onClick={toggleTheme}
            />

            <div style={{ marginTop: '20px' }}>
                <BaseButton
                    title="English"
                    onClick={() => changeLanguage('en')}
                    buttonStyle={{ marginRight: '10px' }}
                />
                <BaseButton
                    title="Tiếng Việt"
                    onClick={() => changeLanguage('vi')}
                />
            </div>
        </div>
    );
};

export default Login;
