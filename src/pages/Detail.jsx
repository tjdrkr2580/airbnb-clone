import React from "react";
import styled from "styled-components";
import { flexColumnCenter, PageMargin } from "utils/style/mixins";
import { AiFillHeart } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import Test from "../assets/hotel.jpg";
import Carousel from "nuka-carousel/lib/carousel";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

const DetailWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0 3rem;
  ${PageMargin}
`;

const TitleBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h1 {
    font-size: 3rem;
  }
`;

const TitleLayout = styled.div`
  p {
    font-size: 1.5rem;
    color: ${(props) => props.theme.selectColor1};
  }
  display: flex;
  justify-content: space-between;
`;

const LikeLayout = styled.section`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  span {
    font-size: 1.25rem;
  }
`;

const RightLayout = styled.section`
  display: flex;
  gap: 1.5rem;
`;

const CuroselCustom = styled.section`
  .paging-item {
    width: 2rem;
  }
  button {
    cursor: pointer;
    ${flexColumnCenter}
    padding: 0.6rem;
    background-color: transparent;
  }
`;

const CustomCarousel = styled(Carousel)`
  margin-top: 2rem;
  border-radius: 0.6rem;
  height: 20rem;
  img {
    width: 100%;
    height: 60rem;
    object-fit: cover;
    object-position: center;
  }
`;

const MainComponent = styled.main`
  margin-top: 3rem;
  position: relative;
  display: flex;
  gap: 2rem;
`;

const ContentComponent = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 60rem;
`;

const TitleComponent = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 0.25rem solid ${(props) => props.theme.borderColor};
  h1 {
    font-size: 2.2rem;
  }
  img {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }
`;

const SubmitComponent = styled.section`
  position: sticky;
  width: 50%;
  height: 40rem;
  background-color: yellow;
`;

const Detail = () => {
  return (
    <DetailWrapper>
      <TitleBox>
        <h1>펜트하우스. 도심 속 전망. 도심 가운데.</h1>
        <TitleLayout>
          <p>부평동 인천, 한국</p>
          <RightLayout>
            <LikeLayout>
              <FiCopy size={18} />
              <span>공유하기</span>
            </LikeLayout>
            <LikeLayout>
              <AiFillHeart size={18} />
              <span>저장</span>
            </LikeLayout>
          </RightLayout>
        </TitleLayout>
      </TitleBox>
      <CuroselCustom>
        <CustomCarousel
          dragging={true}
          animation="zoom"
          autoplay={true}
          renderCenterLeftControls={({ previousSlide }) => (
            <button onClick={previousSlide}>
              <AiFillLeftCircle size={30} color={"#F7EFE5"} />
            </button>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <button onClick={nextSlide}>
              <AiFillRightCircle size={30} color={"#F7EFE5"} />
            </button>
          )}
        >
          <img src={Test} alt="img" />
          <img src={Test} alt="img" />
          <img src={Test} alt="img" />
          <img src={Test} alt="img" />
          <img src={Test} alt="img" />
        </CustomCarousel>
      </CuroselCustom>
      <MainComponent>
        <ContentComponent>
          <TitleComponent>
            <h1>정다정 님이 호스팅하는 숙소의 정보</h1>
            <img src={Test} alt="test" />
          </TitleComponent>
        </ContentComponent>
        <SubmitComponent></SubmitComponent>
      </MainComponent>
    </DetailWrapper>
  );
};

export default Detail;
