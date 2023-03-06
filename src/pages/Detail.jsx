import React, { useState } from "react";
import styled from "styled-components";
import { flexColumnCenter, PageMargin } from "utils/style/mixins";
import { AiFillHeart } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import Test from "../assets/hotel.jpg";
import Carousel from "nuka-carousel/lib/carousel";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import DetailSubmit from "components/DetailSubmit";
import { useQuery } from "react-query";
import { detailPatch } from "utils/api/api";
import { useParams } from "react-router-dom";

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
  justify-content: space-between;
  gap: 1.25rem;
`;

const ContentComponent = styled.section`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 108rem;
`;

const LineComponent = styled.section`
  padding: 2rem 0;
  border-bottom: 0.25rem solid ${(props) => props.theme.borderColor};

  p {
    font-size: 1.5rem;
    color: ${(props) => props.theme.selectColor2};
    line-height: 1.75;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    li {
      font-size: 1.65rem;
    }
  }

  h1 {
    margin-bottom: 3rem;

    font-size: 2.2rem;
  }
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

const Detail = () => {
  const [houseDetail, setHouseDetail] = useState(null);
  const { id } = useParams();
  const { isLoading } = useQuery("houseDetail", () => detailPatch(id), {
    onSuccess: ({ data }) => {
      console.log(data);
    },
  });

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
          <LineComponent>
            <h1>설명</h1>
            <p>
              서울 도심에서 한옥의 아름다움과 독특함을 경험하실 수 있는 이화한옥
              별관 '사직루'는 사직공원에서 오분 거리에 위치하며 외부는 한옥으로
              지어졌지만 내부는 현대식 부엌, 화장실, 침대를 두어 계시는 동안
              편안하게 생활 하실 수 있도록 준비했습니다. 유독 방마다 채광이 좋아
              따뜻하고 아늑한 한옥의 정서를 느끼실 수 있습니다. 최대 4인까지
              가능하여 소규모 모임을 가지시기에도 좋은 숙소 입니다.
            </p>
          </LineComponent>
          <LineComponent>
            <h1>숙소 편의시설</h1>
            <ul className="grid">
              <li>주방</li>
              <li>무선 인터넷</li>
              <li>헤어 드라이어</li>
              <li>필수품목</li>
            </ul>
          </LineComponent>
        </ContentComponent>
        <DetailSubmit />
      </MainComponent>
    </DetailWrapper>
  );
};

export default Detail;
