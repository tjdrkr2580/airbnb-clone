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

const HotelElement = ({ data }) => {
  const navigate = useNavigate();
  console.log(data);

  //별점은 나중에
  return (
    <HotelElementWrapper onClick={() => navigate("/2")}>
      <img
        src={data.thumbnailUrl !== null ? data.thumbnailUrl : hotel}
        alt="view"
      />
      <HotelElementTextWrapper>
        <header className="hotel-header">
          <h1>{data.adminDistrict}, 한국</h1>
          {/* <span className="star">
            <AiFillStar size={15} />
            <span>4.8</span>
          </span> */}
        </header>
        <p>{data.detailAddress}</p>
        <span className="price">₩ {data.pricePerDay} / 박</span>
      </HotelElementTextWrapper>
    </HotelElementWrapper>
  );
};

export default HotelElement;
