// TooltipComponent.tsx
import React from "react";
import Tooltip from "@mui/material/Tooltip";

const TooltipComponent = ({ title, children, placement = "top" }) => {
  return (
    <Tooltip title={title} placement={placement} arrow>
      {children}
    </Tooltip>
  );
};

export default TooltipComponent;
