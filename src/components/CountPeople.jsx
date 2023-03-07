import React from 'react';
import styled from 'styled-components';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';

const CountText = styled.div`
    width: 100px;
    font-size: 1.2rem;
`;

function CountPeople({ count, setCount }) {
    return (
        <div>
            <label onClick={() => setCount(count - 1)}>
                <IoIosArrowDropleftCircle size={20} />
            </label>
            <CountText>{count}</CountText>
            <label onClick={() => setCount(count + 1)}>
                <IoIosArrowDroprightCircle size={20} />
            </label>
        </div>
    );
}

export default CountPeople;
