import React from "react";
import styled from "styled-components";
import {
  HotelElementTextWrapperStyle,
  HotelElementWrapperStyle,
} from "utils/style/mixins";
import hotel from "../assets/hotel.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";

const HotelElementWrapper = styled.li`
  ${HotelElementWrapperStyle}
`;

const HotelElementTextWrapper = styled.ul`
  ${HotelElementTextWrapperStyle}
`;

const ButtonWrapper = styled.ul`
  display: flex;
  margin-top: 0.75rem;
  gap: 1rem;
  button {
    width: 40%;
  }
`;

const HotelElement = ({ house, made }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  //별점은 나중에
  return (
    <HotelElementWrapper>
      <img
        src={house?.thumbnailUrl !== null ? house?.thumbnailUrl : hotel}
        alt="view"
        onClick={() => navigate(`/${house.id}`)}
      />
      <HotelElementTextWrapper onClick={() => navigate(`/${house.id}`)}>
        <header className="hotel-header">
          <h1>{house?.adminDistrict}, 한국</h1>
        </header>
        <p>{house?.detailAddress}</p>
        <span className="price">
          ₩ {house?.pricePerDay.toLocaleString("en")} / 박
        </span>
      </HotelElementTextWrapper>
      {pathname === "/profile" && made === true && (
        <ButtonWrapper>
          <Button>수정</Button>
          <Button type={true}>삭제</Button>
        </ButtonWrapper>
      )}
    </HotelElementWrapper>
  );
};

export default HotelElement;
