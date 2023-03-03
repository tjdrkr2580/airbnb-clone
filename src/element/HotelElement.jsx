import React from "react";
import styled from "styled-components";
import { boxBorderRadius } from "utils/style/mixins";
import hotel from "../assets/hotel.jpg";
import { AiFillStar } from "react-icons/ai";

const HotelElementWrapper = styled.li`
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  min-width: 33rem;
  height: 41rem;
  img {
    object-fit: cover;
    object-position: center;
    ${boxBorderRadius}
    width: 100%;
    height: 70%;
  }
`;

const HotelElementTextWrapper = styled.ul`
  padding: 0.2rem;
  padding-top: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-family: Pretendard;
  .hotel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .star {
      display: flex;
      gap: 0.2rem;
      align-items: center;
      span {
        font-size: 1.3rem;
        font-weight: 500;
      }
    }
  }
  h1 {
    font-size: 1.5rem;
    color: black;
  }
  p {
    font-size: 1.2rem;
    color: ${(props) => props.theme.selectColor1};
  }
  .price {
    font-weight: 500;
    font-size: 1.4rem;
    margin-top: 0.8rem;
  }
`;

const HotelElement = () => {
  return (
    <HotelElementWrapper>
      <img src={hotel} alt="view" />
      <HotelElementTextWrapper>
        <header className="hotel-header">
          <h1>인천 부평구, 한국</h1>
          <span className="star">
            <AiFillStar size={15} />
            <span>4.8</span>
          </span>
        </header>
        <p>도심 속 전망</p>
        <span className="price">₩ 316,233 / 박</span>
      </HotelElementTextWrapper>
    </HotelElementWrapper>
  );
};

export default HotelElement;
