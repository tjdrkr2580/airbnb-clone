import React from 'react';
import styled from 'styled-components';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';
import { flexRowCenter } from 'utils/style/mixins';

const PeopleCountContainer = styled.div`
    ${flexRowCenter};
    width: 100%;
    justify-content: space-between;
    padding: 0 10rem;
    margin-bottom: ${(props) => props.margin && props.margin + 'rem'};
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
const CountText = styled.div`
    width: 100px;
    font-size: 1.2rem;
`;

function CountPeople({ count, setCount, margin }) {
    return (
        <PeopleCountContainer margin={margin}>
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
    );
}

export default CountPeople;
