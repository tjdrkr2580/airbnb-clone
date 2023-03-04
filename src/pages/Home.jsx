import HotelElement from "element/HotelElement";
import SkeletonHotelElement from "element/SkeletonHotelElement";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HotelGridLayoutStyle, PageMargin } from "utils/style/mixins";

const HomeWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${PageMargin}
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
        <SkeletonHotelElement />
      </HotelGridWrapper>
    </HomeWrapper>
  );
};

export default Home;
