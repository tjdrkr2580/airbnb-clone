import React from "react";
import styled, { css } from "styled-components";
import { boxBorderRadius } from "../utils/style/mixins";

const CustomBtn = styled.button`
  cursor: pointer;
  width: ${(props) => (props.isType ? "100%" : "15rem")};
  height: 4rem;
  font-size: 1.35rem;
  ${boxBorderRadius};
  ${(props) =>
    props.isType === true
      ? css`
          background: linear-gradient(
            122deg,
            rgb(250, 170, 0) 0%,
            rgb(237, 19, 19) 1.16%,
            rgb(213, 74, 255) 96.42%
          );
          color: white;
          font-size: 1.45rem;
          font-weight: 500;
        `
      : css`
          background-color: transparent;
          color: black;
          font-size: 1.3rem;
          font-weight: 500;
        `}
`;

const Button = ({ children, ...props }) => {
  return (
    <CustomBtn isType={props.type} onClick={props.onClick}>
      {children}
    </CustomBtn>
  );
};

export default Button;

Button.defaultProps = {
  onClick: () => {},
};
