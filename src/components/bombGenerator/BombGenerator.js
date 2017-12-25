import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bomb } from '../index';
import { BombObj, NUM_OF_BOMBS, INITIAL_DELAY_TIME } from '../../constants';
import { generateBombs, updateBombLeft } from '../../actions';

type Props = {
  generateBombs: () => void,
  updateBombLeft: (index: number, left: number) => void,
  bombs?: BombObj[],
};

type State = {};

class BombGenerator extends Component<Props, State> {
  static defaultProps = {
    bombs: [],
  };

  componentDidMount = () => {
    this.createBombsInterval();
  };

  shouldComponentUpdate = (nextProps: Props) => this.props.bombs !== nextProps.bombs;

  componentWillUnmount = () => {
    clearInterval(this.intervalCreatorId);
  };

  createBombsInterval = () => {
    this.delayTime = INITIAL_DELAY_TIME;
    this.props.generateBombs();
    this.intervalCreatorId = setInterval(() => {
      this.delayTime -= 100;
      this.props.generateBombs();
    }, this.delayTime * NUM_OF_BOMBS + 3000);
  };

  intervalCreatorId: number;
  delayTime: number;

  renderBombs = () => {
    const markup = [];
    this.props.bombs.forEach((bomb: BombObj, index: number) => {
      markup.push(<Bomb
        className="bomb"
        key={Math.random()}
        delay={this.delayTime * index}
        top={bomb.y}
        update={(left: number) => {
            this.props.updateBombLeft(index, left);
          }}
      />);
    });
    return markup;
  };

  render() {
    return <div>{this.renderBombs()}</div>;
  }
}

const mapStateToProps = ({ appReducer: { bombs } }) => ({
  bombs,
});

export default connect(mapStateToProps, { generateBombs, updateBombLeft })(BombGenerator);
