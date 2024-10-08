import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";

const BaseInput = (props) => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        border: `1px solid ${currentTheme.lightGray}`,
        backgroundColor: currentTheme.extraLightGray,
        borderRadius: "5px",
        padding: "17px",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        style={{
          flex: 1,
          color: currentTheme.text,
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
        }}
        placeholderTextColor={currentTheme.gray}
        value={props.value}
        onChange={props.onChange}
        {...props}
      />
    </div>
  );
};

export default BaseInput;
