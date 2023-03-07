import React from 'react';
import styled from 'styled-components';
import { boxBorderRadius, flexColumnCenter } from 'utils/style/mixins';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const AreaCheckContainer = styled.div`
    ${flexColumnCenter}
    width: 95%;
`;
export const AreaCheckBoxContainer = styled(Slider)`
    width: 95%;
    position: relative;
    .slick-prev::before,
    .slick-next::before {
        color: #747474;
    }
`;

export const AreaCheckBox = styled.div`
    line-height: 4rem;
    text-align: center;
    cursor: pointer;
    div {
        margin: 0.5rem;
        border: 0.075rem solid ${(props) => props.theme.selectColor2};
        ${boxBorderRadius}
        font-size: 1.2rem;
    }
`;
const AreaBox = styled.div`
    background-color: ${(props) => props.isAreaClick && props.theme.selectColor2};
    color: ${(props) => props.isAreaClick && 'white'}; ;
`;

function SelectArea({ area, setArea }) {
    const areaSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
    };
    const houseArea = ['서울특별시', '부산광역시', '대구광역시', '광주광역시', '인천광역시', '대전광역시', '울산광역시', '제주특별시', '경기도', '강원도', '충청남도', '충정북도', '전라남도', '전라북도', '경상남도', '경상북도'];

    return (
        <AreaCheckContainer>
            <AreaCheckBoxContainer {...areaSettings}>
                {houseArea.map((item, i) => (
                    <AreaCheckBox key={i} onClick={() => setArea(item)}>
                        <AreaBox isAreaClick={area === item}>{item}</AreaBox>
                    </AreaCheckBox>
                ))}
            </AreaCheckBoxContainer>
        </AreaCheckContainer>
    );
}

export default SelectArea;
