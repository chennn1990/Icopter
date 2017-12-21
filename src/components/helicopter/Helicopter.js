import React from 'react';
import styled from 'styled-components';
import helicopterImg from '../../assets/helicopter.png';
import { HELICOPTER_LEFT } from '../../constants';

const HelicopterStyle = styled.div`
  img {
    width: 150px;
    height: 80px;
    position: absolute;
    left: ${HELICOPTER_LEFT}px;
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
