import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalVariants } from "utils/animation/variants";
import {
  boxBorderRadius,
  flexColumnCenter,
  flexRowCenter,
} from "utils/style/mixins";
import {
  IoMdClose,
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { isHotelAddState } from "store/atoms";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import Button from "element/Button";

const ModalWrapper = styled.div`
  z-index: 999;
  position: fixed;
  ${flexRowCenter};
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(10, 10, 10, 0.35);
  h1 {
    font-size: 1.6rem;
  }
  padding: 0 3rem;
`;

const ModalLayout = styled(motion.section)`
  position: relative;
  width: 56rem;
  height: 81rem;
  ${boxBorderRadius}
  ${flexColumnCenter}
    background-color: white;
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
  padding-top: 2rem;
  gap: 1.2rem;
  h2 {
    font-size: 2.2rem;
    margin-bottom: 0.8rem;
    width: fit-content;
    align-self: flex-start;
  }
`;

const TitleBox = styled.section`
  position: absolute;
  top: 0;
  width: 100%;
  height: 6.4rem;
  border-bottom: 0.2rem solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  h1 {
    font-size: 1.6rem;
    padding-right: 1rem;
  }
`;

const HotelAddForm = styled.form`
  width: 100%;
  ${flexColumnCenter}
  span {
    width: 100%;
    text-align: left;
    line-height: 3rem;
    font-size: 1.5rem;
    margin-top: 1rem;
  }
`;

const AreaCheckContainer = styled.div`
  ${flexColumnCenter}
  width: 95%;
`;

const AreaCheckBoxContainer = styled(Slider)`
  width: 95%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    color: #747474;
  }
`;

const AreaCheckBox = styled.div`
  line-height: 4rem;
  text-align: center;
  div {
    margin: 0.5rem;
    border: 0.075rem solid ${(props) => props.theme.selectColor2};
    ${boxBorderRadius}
  }
`;

const InputContainer = styled.div`
  width: 100%;
  input {
    width: 100%;
    height: 4rem;
    font-size: 1.55rem;
    letter-spacing: 0.1rem;
    padding: 0 1.2rem;
    border: 0.075rem solid ${(props) => props.theme.selectColor2};
    ${boxBorderRadius}
    &:focus {
      outline: none;
    }
  }
`;

const PeopleCountContainer = styled.div`
  ${flexRowCenter};
  width: 100%;
  justify-content: space-between;
  padding: 0 10rem;
  span {
    margin-top: 0;
    line-height: 4rem;
  }
  div {
    ${flexRowCenter};
    label {
      ${flexRowCenter};
      opacity: 0.3;
    }
  }
`;

const CountText = styled.span`
  padding: 0 3rem;
`;

const HouseImgContainer = styled.div`
  ${flexRowCenter};
  width: 100%;
  justify-content: space-between;
  div {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;
const ThumbnailInput = styled.input`
  width: 70%;
  padding-left: 1rem;
`;

const HouseFacilityContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  div {
    width: 10rem;
    line-height: 3rem;
    text-align: center;
    border: 0.075rem solid ${(props) => props.theme.selectColor2};
    ${boxBorderRadius}
    margin-bottom: 1rem;
  }
`;

const HoustIntroTextarea = styled.textarea`
  width: 100%;
  height: 8rem;
  resize: none;
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  padding: 1.2rem;
  ${boxBorderRadius}
  &:focus {
    outline: none;
  }
`;

const HotelAddModal = () => {
  const setIsHotelAdd = useSetRecoilState(isHotelAddState);
  const modalRef = useRef(null);
  const [count, setCount] = useState(0);
  // 나중에 db에서 list로 받아옴
  const houseFacility = [
    "편의1",
    "편의2",
    "편의3",
    "편의4",
    "편의5",
    "편의6",
    "편의7",
    "편의8",
  ];

  // 지역선택 carousel setting
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <ModalWrapper
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          setIsHotelAdd(false);
        }
      }}
    >
      <ModalLayout variants={modalVariants} initial="start" animate="animate">
        <TitleBox>
          <IoMdClose size={20} onClick={() => setIsHotelAdd(false)} />
          <h1 className="title">숙소 등록</h1>
          <section />
        </TitleBox>

        <HotelAddForm>
          <span>지역선택</span>
          <AreaCheckContainer>
            <AreaCheckBoxContainer {...settings}>
              <AreaCheckBox>
                <div>서울특별시</div>
              </AreaCheckBox>
              <AreaCheckBox>
                <div>부산광역시</div>
              </AreaCheckBox>
              <AreaCheckBox>
                <div>강원도</div>
              </AreaCheckBox>
              <AreaCheckBox>
                <div>충청북도</div>
              </AreaCheckBox>
              <AreaCheckBox>
                <div>충청남도</div>
              </AreaCheckBox>
              <AreaCheckBox>
                <div>전라북도</div>
              </AreaCheckBox>
              <AreaCheckBox>
                <div>전라남도</div>
              </AreaCheckBox>
              <AreaCheckBox>
                <div>경상북도</div>
              </AreaCheckBox>
              <AreaCheckBox>
                <div>경상남도</div>
              </AreaCheckBox>
              <AreaCheckBox>
                <div>제주도</div>
              </AreaCheckBox>
              <AreaCheckBox>
                <div>인천광역시</div>
              </AreaCheckBox>
              <AreaCheckBox>
                <div>경기도</div>
              </AreaCheckBox>
            </AreaCheckBoxContainer>
          </AreaCheckContainer>

          <span>상세 주소</span>
          <InputContainer>
            <input type="text" />
          </InputContainer>

          <span>1박 당 가격</span>
          <InputContainer>
            <input type="text" />
          </InputContainer>

          <span>최대 인원 선택</span>
          <PeopleCountContainer>
            <span>인원수</span>
            <div>
              <label onClick={() => setCount(count - 1)}>
                <IoIosArrowDropleftCircle size={20} />
              </label>
              <CountText>{count}</CountText>
              <label onClick={() => setCount(count + 1)}>
                <IoIosArrowDroprightCircle size={20} />
              </label>
            </div>
          </PeopleCountContainer>

          <span>이미지 업로드</span>
          <HouseImgContainer>
            <ThumbnailInput type="file" multiple></ThumbnailInput>
          </HouseImgContainer>

          <span>숙소 편의시설</span>
          <HouseFacilityContainer>
            {houseFacility.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </HouseFacilityContainer>

          <span>숙소 설명</span>
          <HoustIntroTextarea></HoustIntroTextarea>
          <Button type={true} isBackground={true}>
            숙소 등록
          </Button>
        </HotelAddForm>
      </ModalLayout>
    </ModalWrapper>
  );
};

export default HotelAddModal;
