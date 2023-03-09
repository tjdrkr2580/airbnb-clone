import React, { useState } from 'react';
import styled from 'styled-components';
import { boxBorderRadius, flexColumnCenter, PageMargin } from 'utils/style/mixins';
import { FiCopy } from 'react-icons/fi';
import test from '../assets/hotel.jpg';
import Carousel from 'nuka-carousel/lib/carousel';
import { AiFillLeftCircle, AiFillRightCircle, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import DetailSubmit from 'components/DetailSubmit';
import { useQuery, useQueryClient } from 'react-query';
import { getDetailPatch, postWish } from 'utils/api/api';
import { useParams } from 'react-router-dom';
import SkeletonHotel from '../element/SkeletonHotelElement';
import profile from '../assets/default.png';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userNamePersistState, isLoginModalState, isTotalTagsModal, totalTagsHouseId } from 'store/atoms';
import { getCookie } from 'utils/cookie/cookie';
import { useMutation } from 'react-query';
import LikeState from 'components/LikeState';
import Button from 'element/Button';

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
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
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
        max-width: 1200px;

        height: 60rem;
        object-fit: cover;
        object-position: center;
    }
`;

const MainComponent = styled.main`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 3rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 1.25rem;
    @media (max-width: 1160px) {
        flex-direction: column;
        align-items: center;
        margin-bottom: 5rem;
    }
`;

const ContentComponent = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 10rem;
    @media (max-width: 1160px) {
        width: 100%;
        margin-bottom: 5rem;
    }
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
        margin: 2rem 0 4rem 0;
        font-size: 2.2rem;
    }

    button {
        margin-top: 4rem;
        margin-bottom: 2rem;
        width: 300px;
        border: 0.01rem solid ${(props) => props.theme.selectColor1};
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

const Tag = styled.section`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const Detail = () => {
    const [houseDetail, setHouseDetail] = useState(null);
    const localUserName = useRecoilState(userNamePersistState);
    const setIsLoginModal = useSetRecoilState(isLoginModalState);
    const setIsTotalTagsModal = useSetRecoilState(isTotalTagsModal);
    const setTotalTagsHouseId = useSetRecoilState(totalTagsHouseId);
    const [islikeState, setIsLikeState] = useState();
    const { id } = useParams();

    const { isLoading } = useQuery('houseDetail', () => getDetailPatch(localUserName[0].id !== undefined ? { houseId: id, userId: localUserName[0].id } : { id }), {
        onSuccess: ({ data }) => {
            setHouseDetail(data.data);
            setIsLikeState(data.data.isLike);
        },
    });

    const moveLogin = () => {
        alert('로그인 후 가능합니다. 로그인 해주세요.');
        setIsLoginModal(true);
    };

    const likeClick = (id) => {
        setIsLikeState(!islikeState);
        likeMutation.mutate(id);
    };

    const queryClient = useQueryClient();
    const likeMutation = useMutation((id) => postWish(id, getCookie('token')), {
        onSuccess: (res) => {
            alert(res.data.message);
            queryClient.invalidateQueries('houseDetail');
        },
    });

    const totalTagsClick = () => {
        setTotalTagsHouseId(houseDetail.id);
        setIsTotalTagsModal(true);
    };
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
                                    {localUserName[0] === '' ? <LikeState size={18} isTrue={false} onClick={moveLogin} /> : <LikeState size={18} isTrue={houseDetail?.isLike} onClick={() => likeClick(houseDetail.id)} />}
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
                                    <AiFillLeftCircle size={30} color={'#F7EFE5'} />
                                </button>
                            )}
                            renderCenterRightControls={({ nextSlide }) => (
                                <button onClick={nextSlide}>
                                    <AiFillRightCircle size={30} color={'#F7EFE5'} />
                                </button>
                            )}
                        >
                            {houseDetail?.houseImages.length === 0 ? <img src={test} alt="img" /> : houseDetail?.houseImages.map((houseImage) => <img key={houseImage.id} src={houseImage.imageURL} alt="img" />)}
                        </CustomCarousel>
                    </CuroselCustom>
                    <MainComponent>
                        <ContentComponent>
                            <TitleComponent>
                                <h1>{houseDetail?.owner?.nickname} 님이 호스팅하는 숙소의 정보</h1>
                                <img src={profile} alt="profile" />
                            </TitleComponent>
                            <LineComponent>
                                <h1>설명</h1>
                                <p>{houseDetail?.content}</p>
                            </LineComponent>
                            <LineComponent>
                                <h1>숙소 편의시설</h1>
                                <ul className="grid">
                                    {houseDetail?.tags.map(
                                        (tag, index) =>
                                            index < 10 && (
                                                <Tag key={tag.id}>
                                                    <img src={tag.imageURL} alt="tag" />
                                                    <li key={tag.id}>{tag.name}</li>
                                                </Tag>
                                            )
                                    )}
                                </ul>
                                <Button onClick={totalTagsClick}>편의시설 {houseDetail?.tags.length} 모두보기</Button>
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
