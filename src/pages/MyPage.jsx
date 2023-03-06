import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PageMargin, HotelGridLayoutStyle } from "../utils/style/mixins";
import HotelElement from "element/HotelElement";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getWishList } from "utils/api/api";
import { getCookie } from "utils/cookie/cookie";
import { useQuery } from "react-query";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import {
  globalUserInfoState,
  isLoginModalState,
  isUserState,
} from "store/atoms";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();
  const [wishList, setWishList] = useState([]);
  const token = getCookie("token");
  const setIsUser = useSetRecoilState(isUserState);
  const resetInfo = useResetRecoilState(globalUserInfoState);
  const setIsLoginModal = useSetRecoilState(isLoginModalState);
  const { isLoading } = useQuery("wishList", () => getWishList(token), {
    onSuccess: (response) => {
      setWishList(response.data.data);
    },
    onError: (error) => {
      if (error.response?.data.code === 401) {
        alert("재 로그인이 필요합니다!");
        setIsUser(false);
        resetInfo();
        navigate("/");
        setIsLoginModal(true);
      }
    },
  });
  const settings = {
    dots: true,
    infinite: wishList.length > 5 ? true : false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    slidesPerRows: 1,
    centerPadding: 0,
    // 반응형
    responsive: [
      {
        breakpoint: 1630,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 905,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <MyPageContainer>
      <ListContainer>
        <ListTitle>
          <h1>위시리스트</h1>
        </ListTitle>
        {isLoading === true ? (
          <Message>로딩중입니다.</Message>
        ) : wishList.length === 0 ? (
          <MessageBox>
            <Message>위시리스트가 없습니다.</Message>
          </MessageBox>
        ) : (
          <SliderStyle {...settings}>
            {wishList.map((list) => (
              <HotelElement key={list.id} />
            ))}
          </SliderStyle>
        )}
      </ListContainer>

      <ListContainer>
        <ListTitle>
          <h1>내가 예약한 숙소</h1>
        </ListTitle>
        {/* <ListBox>
          <HotelElement />
          <HotelElement />
          <HotelElement />
          <HotelElement />
          <HotelElement />
        </ListBox> */}
      </ListContainer>

      <ListContainer>
        <ListTitle>
          <h1>내가 등록한 숙소</h1>
        </ListTitle>
        {/* <ListBox>
          <HotelElement />
          <HotelElement />
          <HotelElement />
        </ListBox> */}
      </ListContainer>
    </MyPageContainer>
  );
}

export default MyPage;

const MyPageContainer = styled.div`
  ${PageMargin};
`;
const ListContainer = styled.div`
  margin: 0px 40px;
`;

const ListTitle = styled.div`
  h1 {
    padding-top: 3rem;
    margin-bottom: 1.5rem;
    font-size: 3.2rem;
  }
`;
const ListBox = styled.div`
  ${HotelGridLayoutStyle}
`;

const SliderStyle = styled(Slider)`
  width: 98%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    color: black;
  }
  .slick-track {
    margin: 0;
  }
`;

const MessageBox = styled.div`
  height: 100px;
`;
const Message = styled.span`
  font-size: 1.5rem;
`;
