import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { modalVariants } from 'utils/animation/variants';
import { boxBorderRadius, flexColumnCenter, flexRowCenter } from 'utils/style/mixins';
import { IoMdClose } from 'react-icons/io';
import { isHotelAddState } from 'store/atoms';
import { useState } from 'react';
import Button from 'element/Button';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { postHouses } from 'utils/api/api';
import { getCookie } from 'utils/cookie/cookie';
import SelectArea from './SelectArea';
import { AreaCheckContainer, AreaCheckBoxContainer, AreaCheckBox } from './SelectArea';
import CountPeople from './CountPeople';

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
        line-height: 3rem;
    }
    div {
        ${flexRowCenter};
        label {
            ${flexRowCenter};
            opacity: 0.3;
        }
    }
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
    font-size: 1.2rem;
`;

const HouseFacilityContainer = styled(AreaCheckContainer)``;
const HouseFacilityBoxContainer = styled(AreaCheckBoxContainer)``;
const FacilityCheckBox = styled(AreaCheckBox)`
    div {
        line-height: 3rem;
    }
`;

const FacilityBox = styled.div`
    background-color: ${(props) => props.isTagClick && props.theme.selectColor2};
    color: ${(props) => props.isTagClick && 'white'}; ;
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
    margin-bottom: 2rem;
`;

const HotelAddModal = () => {
    const setIsHotelAdd = useSetRecoilState(isHotelAddState);
    const modalRef = useRef(null);
    const [count, setCount] = useState(0);
    const [area, setArea] = useState('');
    const [tag, setTag] = useState([]);
    const [currentTag, setCurrentTag] = useState([]);
    const { register, reset, formState: errors, handleSubmit } = useForm();

    // 추후 관리자페이지에서 원하는 태그 등록
    const houseFacility = ['편의1', '편의2', '편의3', '편의4', '편의5', '편의6', '편의7', '편의8', '편의9', '편의10', '편의11', '편의12'];

    const facilitySettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        rows: 2,
    };

    // 이미지
    const result = new FormData();
    const [thumbnail, setThumbnail] = useState('');
    const [otherImg, setOtherImg] = useState([]);

    const uploadImg = (e) => {
        setThumbnail(e.target.files[0]);

        for (let i = 1; i < e.target.files.length; i++) {
            setOtherImg(e.target.files[i]);
        }
    };

    // 태그 클릭시
    const faciltyClick = (i) => {
        // db 보낼 태그
        setTag([...tag, i]);

        tag.forEach((item) => {
            if (item === i) {
                const newTag = tag.filter((item) => item !== i);
                setTag(newTag);
            }
        });
    };

    const submitMutation = useMutation((data) => postHouses(data, getCookie('token')), {
        onSuccess: () => {
            console.log('등록 완료!');
            setIsHotelAdd(false);
        },
    });

    const onSubmit = async (data) => {
        result.append('adminDistrict', String(area));
        result.append('detailAddress ', String(data.address));
        result.append('content ', String(data.content));
        result.append('maxPeople ', parseInt(count));
        result.append('pricePerDay ', parseInt(data.price));
        result.append('tagIds ', tag);
        result.append('thumbnailImage ', thumbnail);
        result.append('houseImages ', otherImg);

        await submitMutation.mutateAsync(result);
    };
