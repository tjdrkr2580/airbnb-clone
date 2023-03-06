import React, { useState } from "react";
import styled from "styled-components";
import { flexColumnCenter, PageMargin } from "utils/style/mixins";
import { AiFillHeart } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import test from "../assets/hotel.jpg";
import Carousel from "nuka-carousel/lib/carousel";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import DetailSubmit from "components/DetailSubmit";
import { useQuery } from "react-query";
import { getDetailPatch } from "utils/api/api";
import { useParams } from "react-router-dom";
import SkeletonHotel from "../element/SkeletonHotelElement";
import profile from "../assets/default.png";

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
    -webkit-line-clamp: 3; /* 라인수 */
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
  const { isLoading } = useQuery("houseDetail", () => getDetailPatch(id), {
    onSuccess: ({ data }) => {
      setHouseDetail(data.data);
    },
  });

  return (
    <DetailWrapper>
      {isLoading === true ? (
        <SkeletonHotel />
      ) : (
        <>
          <TitleBox>
            <h1>숙소. 아름다운 휴식터. 멋진 전망.</h1>
            <TitleLayout>
              <p>{houseDetail?.adminDistrict}, 한국</p>
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
              {houseDetail?.houseImages.length === 0 ? (
                <img src={test} alt="img" />
              ) : (
                houseDetail?.houseImages.map((houseImage) => (
                  <img
                    key={houseImage.id}
                    src={houseImage.imageURL}
                    alt="img"
                  />
                ))
              )}
            </CustomCarousel>
          </CuroselCustom>
          <MainComponent>
            <ContentComponent>
              <TitleComponent>
                <h1>
                  {houseDetail?.owner?.nickname} 님이 호스팅하는 숙소의 정보
                </h1>
                <img src={profile} alt="profile" />
              </TitleComponent>
              <LineComponent>
                <h1>설명</h1>
                <p>{houseDetail?.content}</p>
              </LineComponent>
              <LineComponent>
                <h1>숙소 편의시설</h1>
                <ul className="grid">
                  {houseDetail?.tags.map((tag) => (
                    <li key={tag.id}>{tag.name}</li>
                  ))}
                </ul>
              </LineComponent>
            </ContentComponent>
            <DetailSubmit houseDetail={houseDetail} />
          </MainComponent>
        </>
      )}
    </DetailWrapper>
  );
};

export default Detail;
