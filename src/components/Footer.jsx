import React from "react";
import styled from "styled-components";
import { HeaderFooterStyle } from "utils/style/mixins";

const Footer = () => {
  return (
    <FooterContainer>
      <span>© 2023 hanghae cloncoding 3조, Inc.</span>
      <span>|</span>
      <span>개인정보 처리방침</span>
      <span>|</span>
      <span>이용약관</span>
      <span>|</span>
      <span>사이트맵</span>
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
  span {
    font-size: 1.2rem;
  }
`;
