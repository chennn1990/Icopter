import React, { Component } from 'react';
import _ from 'lodash';
import { Bomb } from '../index';
import { SCREEN_HEIGHT, BOMB_HEIGHT } from '../../constants';

type BombObj = {
  x: number,
  y: number,
};

type Props = {};

type State = {
  bombs: BombObj,
};

export default class BombCreator extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      bombs: [],
    };
  }

  componentDidMount = () => {
    this.createBombs();
    this.changeBombsLocation();
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalCreatorId);
    clearInterval(this.intervalMovingId);
  };

  intervalCreatorId: number;
  intervalMovingId: number;

  /* eslint-disable */
  createBombs = () => {
    const timeToGenerate = 3000; // later it will be determained dynamicly
    this.intervalCreatorId = setInterval(() => {
      const yOffset = BOMB_HEIGHT + Math.random() * (SCREEN_HEIGHT - 2 * BOMB_HEIGHT);
      this.setState({
        bombs: [...this.state.bombs, { x: 0, y: yOffset }],
      });
    }, timeToGenerate);
  };
  /* eslint-enable */

  changeBombsLocation = () => {
    this.intervalMovingId = setInterval(() => {
      this.setState({
        bombs: this.moveBombs(),
      });
      const noneRelevantBombIndex = _.findIndex(
        this.state.bombs,
        bomb => bomb.x >= window.innerWidth,
      );
      if (noneRelevantBombIndex !== -1) {
        this.setState({
          bombs: [
            ...this.state.bombs.slice(0, noneRelevantBombIndex),
            ...this.state.bombs.slice(noneRelevantBombIndex + 1),
          ],
        });
      }
    }, 50);
  };

  moveBombs = () => {
    const { bombs } = this.state;
    for (let i = 0; i < bombs.length; i += 1) {
      bombs[i].x += 10;
    }
    return bombs;
  };

  renderBombs = () => {
    const markup = [];
    const { bombs } = this.state;
    for (let i = 0; i < bombs.length; i += 1) {
      markup.push(<Bomb key={i} x={bombs[i].x} y={bombs[i].y} />);
    }
    return markup;
  };

  render() {
    return <div>{this.renderBombs()}</div>;
  }
}
