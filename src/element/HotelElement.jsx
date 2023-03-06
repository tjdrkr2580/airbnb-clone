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

const HotelElement = ({ house }) => {
  const navigate = useNavigate();

  //별점은 나중에
  return (
    <HotelElementWrapper onClick={() => navigate(`/${house.id}`)}>
      <img
        src={house.thumbnailUrl !== null ? house.thumbnailUrl : hotel}
        alt="view"
      />
      <HotelElementTextWrapper>
        <header className="hotel-header">
          <h1>{house.adminDistrict}, 한국</h1>
          {/* <span className="star">
            <AiFillStar size={15} />
            <span>4.8</span>
          </span> */}
        </header>
        <p>{house.detailAddress}</p>
        <span className="price">
          ₩ {house.pricePerDay.toLocaleString("en")} / 박
        </span>
      </HotelElementTextWrapper>
    </HotelElementWrapper>
  );
};

export default HotelElement;
