import React, { useState } from "react";
import styled from "styled-components";
import {
  HotelElementTextWrapperStyle,
  HotelElementWrapperStyle,
} from "utils/style/mixins";
import hotel from "../assets/hotel.jpg";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userNamePersistState, isLoginModalState } from "store/atoms";
import { useMutation, useQueryClient } from "react-query";
import { postWish } from "utils/api/api";
import { getCookie } from "utils/cookie/cookie";
import LikeState from "components/LikeState";

const HotelElementWrapper = styled.li`
  ${HotelElementWrapperStyle}
  position: relative;
`;

const HotelElementTextWrapper = styled.ul`
  ${HotelElementTextWrapperStyle}
`;

const HotelElement = ({ house, isWish }) => {
  const navigate = useNavigate();
  const localUserName = useRecoilState(userNamePersistState);
  const setIsLoginModal = useSetRecoilState(isLoginModalState);
  const [islikeState, setIsLikeState] = useState(house.isLike);

  // 로그인 x -> 하트 눌렀을 때
  const moveLogin = (e) => {
    e.stopPropagation();
    alert("로그인 후 가능합니다. 로그인 해주세요.");
    setIsLoginModal(true);
  };
  // 로그인 o -> 하트 눌렀을 때
  const likeClick = (e, id) => {
    e.stopPropagation();
    setIsLikeState(!islikeState);
    likeMutation.mutate(id);
  };

  const queryClient = useQueryClient();
  const likeMutation = useMutation((id) => postWish(id, getCookie("token")), {
    onSuccess: (res) => {
      alert(res.data.message);
      if (isWish) {
        queryClient.invalidateQueries("wish");
      } else {
        queryClient.invalidateQueries("houses");
      }
    },
  });

  //별점은 나중에
  return (
    <HotelElementWrapper onClick={() => navigate(`/${house.id}`)}>
      <img
        src={house?.thumbnailUrl !== null ? house?.thumbnailUrl : hotel}
        alt="view"
      />
      {localUserName[0] === "" ? (
        <LikeState
          size={28}
          position={true}
          isTrue={false}
          onClick={moveLogin}
        />
      ) : (
        <LikeState
          size={28}
          position={true}
          isTrue={house?.isLike}
          onClick={(e) => likeClick(e, house.id)}
        />
      )}
      <HotelElementTextWrapper>
        <header className="hotel-header">
          <h1>{house?.adminDistrict}, 한국</h1>
        </header>
        <p>{house?.detailAddress}</p>
        <span className="price">
          ₩ {house?.pricePerDay.toLocaleString("en")} / 박
        </span>
      </HotelElementTextWrapper>
    </HotelElementWrapper>
  );
};

export default HotelElement;
