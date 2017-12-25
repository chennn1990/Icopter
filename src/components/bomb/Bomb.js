import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import BombImg from '../../assets/bomb.png';
import { BOMB_HEIGHT, BOMB_WIDTH } from '../../constants';

const BombRelease = keyframes`
  0% {
    left: ${window.outerWidth}px;
  }

  100% {
    left: -${2 * BOMB_WIDTH}px;
  }
`;

const BombStyle = styled.div`
  img {
    width: ${BOMB_WIDTH}px;
    height: ${BOMB_HEIGHT}px;
    position: absolute;
    left: ${window.outerWidth}px;
    top: ${props => `${props.top}px`};
    animation: ${BombRelease} 3s linear forwards;
    animation-delay: ${props => props.delay}ms;
  }
`;

type Props = {
  top?: number,
  className?: string,
  delay?: number,
  update?: (left: number) => void,
};

type State = {};

export default class Bomb extends Component<Props, State> {
  static defaultProps = {
    top: 0,
    delay: 0,
    className: undefined,
    update: undefined,
  };

  componentDidMount = () => {
    this.intervalId = setInterval(() => {
      this.props.update(this.bomb.offsetLeft);
    }, 25);
  };

  componentWillUnmount = () => clearInterval(this.intervalId);

  intervalId: number;

  render() {
    const { delay, top, className } = this.props;
    return (
      <BombStyle delay={delay} top={top}>
        <img
          ref={(b) => {
            this.bomb = b;
          }}
          className={className}
          src={BombImg}
          alt=""
        />
      </BombStyle>
    );
  }
}
