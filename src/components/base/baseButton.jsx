import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";

const BaseButton = ({ buttonStyle, textStyle, title = '', onClick = () => {}, ...props }) => {
    const { currentTheme } = useContext(ThemeContext); 

    const buttonColor = currentTheme.text;
    const textColor = currentTheme.background;

    return (
        <button
            onClick={onClick}
            style={{
                padding: '10px 20px',
                backgroundColor: buttonColor,
                color: textColor,
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                ...buttonStyle  // Kết hợp thêm styles truyền vào nếu có
            }}
            {...props} 
        >
            <span style={{ fontSize: '16px', fontWeight: 'bold', ...textStyle }}>
                {title}
            </span>
        </button>
    );
};

export default BaseButton;
