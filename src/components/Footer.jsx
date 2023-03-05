import React from "react";
import styled from "styled-components";
import { HeaderFooterStyle, flexRowCenter } from "utils/style/mixins";
import { DiGithubBadge } from "react-icons/di";
import { SiNotion } from "react-icons/si";

const Footer = () => {
  return (
    <FooterContainer>
      <span>© 2023 Hanghae Clone Coding 3조, Inc.</span>
      <span>|</span>
      <span>
        <DiGithubBadge size={16} />
        <a href="https://github.com/AirBnB-Clone-Hanghae99">Github</a>
      </span>
      <span>|</span>
      <span>
        <SiNotion size={11} />
        <a href="https://www.notion.so/A-3-SA-9773e0cae5614e10ac889630f8c6378b">
          Notion
        </a>
      </span>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  z-index: 998;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  ${HeaderFooterStyle}
  justify-content: center;
  gap: 20px;
  border-top: 2px solid ${(props) => props.theme.borderColor};
  span,
  a {
    ${flexRowCenter}
    font-size: 1.2rem;
    text-decoration: none;
    color: black;
    gap: 5px;
  }
`;
