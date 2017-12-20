import React from 'react';
import styled from 'styled-components';
import helicopterImg from '../../assets/helicopter.png';

const HelicopterStyle = styled.div`
  img {
    width: 150px;
    height: 115px;
    position: absolute;
    left: 225px;
    top: ${props => `${props.top}px`};
  }
`;

type Props = {
  top?: number,
};

const Helicopter = ({ ...props }: Props) => (
  <HelicopterStyle top={props.top}>
    <img src={helicopterImg} alt="" />
  </HelicopterStyle>
);

Helicopter.defaultProps = {
  top: 0,
};

export default Helicopter;
