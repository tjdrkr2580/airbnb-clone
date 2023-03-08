import React from 'react';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { flexColumnCenter } from 'utils/style/mixins';

const HeartBox = styled.div`
    ${flexColumnCenter}
    position: ${(props) => props.position && 'absolute'};
    top: ${(props) => props.position && '1.5rem'};
    right: ${(props) => props.position && '1.5rem'};
    z-index: ${(props) => props.position && '10'};
`;

function LikeState({ size, position, isTrue, onClick }) {
    return (
        <HeartBox position={position} onClick={onClick}>
            {isTrue ? <AiFillHeart size={size} /> : <AiOutlineHeart size={size} />}
        </HeartBox>
    );
}

export default LikeState;
