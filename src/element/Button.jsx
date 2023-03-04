import React from "react";
import styled from "styled-components";

const CustomBtn = styled.button``;

const Button = ({ children, ...props }) => {
  return (
    <CustomBtn
      isType={props.type}
      isBackground={props.isBackground}
      isBorder={props.isBorder}
      isColor={props.isColor}
      onClick={props.onClick}
    >
      {children}
    </CustomBtn>
  );
};

export default Button;
