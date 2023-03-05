import HotelElement from "element/HotelElement";
import SkeletonHotelElement from "element/SkeletonHotelElement";
import React, { useState } from "react";
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
  const [houses, setHouses] = useState([]);
  const { isLoading } = useQuery("houses", getHouses, {
    onSuccess: (response) => {
      setHouses(response.data.data);
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
          houses.map((house) => <HotelElement key={house.id} />)
        )}
      </HotelGridWrapper>
    </HomeWrapper>
  );
};

export default Home;
