import React from "react";
import styled from "styled-components";
import {
  HotelElementTextWrapperStyle,
  HotelElementWrapperStyle,
} from "utils/style/mixins";
import hotel from "../assets/hotel.jpg";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const HotelElementWrapper = styled.li`
  ${HotelElementWrapperStyle}
`;

const HotelElementTextWrapper = styled.ul`
  ${HotelElementTextWrapperStyle}
`;

const HotelElement = () => {
  const navigate = useNavigate();
  return (
    <HotelElementWrapper onClick={() => navigate("/2")}>
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
