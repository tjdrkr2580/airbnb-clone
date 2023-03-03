import HotelElement from "element/HotelElement";
import React from "react";
import styled from "styled-components";

const HomeWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HotelGridWrapper = styled.ul`
  padding: 0.8rem;
  width: auto;
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, 36rem);
  gap: 1rem;
  place-items: center;
  cursor: pointer;
`;

const Home = () => {
  return (
    <HomeWrapper>
      <HotelGridWrapper>
        <HotelElement />
        <HotelElement />
        <HotelElement />
        <HotelElement />
      </HotelGridWrapper>
    </HomeWrapper>
  );
};

export default Home;
