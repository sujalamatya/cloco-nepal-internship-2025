import React from "react";
import { ButtonProps } from "../interface/ButtonProps";

const Button: React.FC<ButtonProps> = ({
  className,
  label = "Button",
  functionName,
}) => {
  return (
    <button className={className} onClick={functionName}>
      {label}
    </button>
  );
};

export default Button;
