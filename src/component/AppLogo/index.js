import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/WebsiteLogo.png";

const AppLogo = ({ style, disabled }) => {
  const navigate = useNavigate();

  return (
    <img
      src={logo}
      alt="logo"
      style={style}
      onClick={() => {
        if (disabled) {
          return;
        } else {
          navigate("/");
        }
      }}
    />
  );
};

export default AppLogo;
