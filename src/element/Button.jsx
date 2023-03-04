import React from 'react';
import styled from 'styled-components';
import { boxBorderRadius } from '../utils/style/mixins';

const CustomBtn = styled.button`
    width: ${(props) => (props.isType ? '85%' : '150px')};
    color: ${(props) => (props.isColor ? 'white' : 'black')};
    background: ${(props) => props.isBackground && props.theme.mainColor};
    border: ${(props) => (props.isBorder ? `1px solid ${props.theme.borderColor}` : 'none')};
    ${boxBorderRadius};
`;

const Button = ({ children, ...props }) => {
    return (
        <CustomBtn isType={props.type} isBackground={props.isBackground} isBorder={props.isBorder} isColor={props.isColor} onClick={props.onClick}>
            {children}
        </CustomBtn>
    );
};

export default Button;

Button.defaultProps = {
    onClick: () => {},
};
