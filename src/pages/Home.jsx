import HotelElement from "element/HotelElement";
import SkeletonHotelElement from "element/SkeletonHotelElement";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getHouses } from "utils/api/api";
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
  let houses = undefined;
  const { isLoading, data } = useQuery("houses", getHouses, {
    onSuccess: (response) => {
      houses = response.data.data;
    },
  });
  return (
    <HomeWrapper>
      <HotelGridWrapper>
        {isLoading === true ? (
          <>
            <SkeletonHotelElement />
            <SkeletonHotelElement />
            <SkeletonHotelElement />
            <SkeletonHotelElement />
            <SkeletonHotelElement />
            <SkeletonHotelElement />
            <SkeletonHotelElement />
            <SkeletonHotelElement />
            <SkeletonHotelElement />
            <SkeletonHotelElement />
            <SkeletonHotelElement />
            <SkeletonHotelElement />
          </>
        ) : (
          <>
            <HotelElement />
            <HotelElement />
            <HotelElement />
            <HotelElement />
            <HotelElement />
            <HotelElement />
            <HotelElement />
            <HotelElement />
            <HotelElement />
          </>
        )}
      </HotelGridWrapper>
    </HomeWrapper>
  );
};

export default Home;
