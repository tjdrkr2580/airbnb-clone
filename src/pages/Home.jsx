import HotelElement from "element/HotelElement";
import React from "react";
import styled from "styled-components";
import { HotelGridLayoutStyle } from "utils/style/mixins";

const HomeWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HotelGridWrapper = styled.ul`
  ${HotelGridLayoutStyle}
`;

const Home = () => {
  return (
    <HomeWrapper>
      <HotelGridWrapper>
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
      </HotelGridWrapper>
    </HomeWrapper>
  );
};

export default Home;
