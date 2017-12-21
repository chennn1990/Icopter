import React, { Component } from 'react';
import styled from 'styled-components';
import BombImg from '../../assets/bomb.png';
import { BOMB_HEIGHT, BOMB_WIDTH } from '../../constants';

const BombStyle = styled.div`
  img {
    width: ${BOMB_WIDTH}px;
    height: ${BOMB_HEIGHT}px;
    position: absolute;
    right: ${props => `${props.x}px`};
    top: ${props => `${props.y}px`};
  }
`;

type Props = {
  x?: number,
  y?: number,
};

type State = {};

export default class Bomb extends Component<Props, State> {
  static defaultProps = {
    x: 0,
    y: 0,
  };

  componentWillReceiveProps = (nextProps: Props) => {
    const { x, y } = this.props;
    return x !== nextProps.x || y !== nextProps.y;
  };

  render() {
    return (
      <BombStyle x={this.props.x} y={this.props.y}>
        <img src={BombImg} alt="" />
      </BombStyle>
    );
  }
}
