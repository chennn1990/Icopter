import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from 'react-background-video-player';
import AppStyle from './styles';
import { HELICOPTER_TOP, CRASH_TIME, UNITIALIZE_RECORD } from './constants';
import { Helicopter, Message, BombGenerator, Clock } from './components';
import { startGame, initGame } from './actions';
import backgroundVideo from './assets/Clouds_Fly_By.mp4';

type Props = {
  gameStarted: boolean,
  gameOver: boolean,
  helicopterTop: number,
  bestScore: number,
  startGame: () => void,
  initGame: () => void,
};

type State = {
  helicopterStatusClassName: string,
};

class App extends Component<Props, State> {
  static defaultProps = {
    gameStarted: false,
    startGame: undefined,
    helicopterTop: HELICOPTER_TOP,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      helicopterStatusClassName: '',
    };
  }

  componentDidMount = () => {
    this.props.initGame();
    window.addEventListener('keypress', this.startGame);
  };

  componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.gameOver) {
      window.removeEventListener('keypress', this.startGame);
      window.removeEventListener('keypress', this.moveHelicopter);
      window.removeEventListener('keyup', this.moveHelicopter);
      this.switchHelicopterClass('');
      setTimeout(() => {
        this.props.initGame();
      }, CRASH_TIME * 2);
    }
    if (!nextProps.gameStarted) {
      window.addEventListener('keypress', this.startGame);
    }
  };

  onSpacePress = (event: EventTarget, action: () => void): void => {
    if (event.keyCode === 32) action();
  };

  getFirstMessage = () =>
    `Press ${"'Enter'"} to start play${
      this.props.bestScore !== UNITIALIZE_RECORD
        ? `, the best score is ${this.stringifyTime(this.props.bestScore)}`
        : ''
    }`;

  presentMinutes = (time: number) => {
    const minutes = Math.floor(time / 10 / 60);
    return minutes > 0 ? `${minutes}:` : '';
  };

  stringifyTime = (time: number) =>
    `${this.presentMinutes(time)}${Math.floor((time / 10) % 60)}:${time % 10}`;

  switchHelicopterClass = (className: string): void => {
    this.setState({
      helicopterStatusClassName: className,
    });
  };

  moveHelicopter = (e: EventTarget): void => {
    const helicopterClassName = e.type === 'keypress' ? 'jump' : 'fail';
    this.onSpacePress(e, () => this.switchHelicopterClass(helicopterClassName));
  };

  registerToClimbEvent = (): void => {
    window.addEventListener('keypress', this.moveHelicopter);
    window.addEventListener('keyup', this.moveHelicopter);
  };

  startGame = (e: EventTarget): void => {
    if (e.keyCode === 13) {
      this.props.startGame();
      this.switchHelicopterClass('fail');
      this.registerToClimbEvent();
    }
  };

  render() {
    const { gameStarted, gameOver, helicopterTop } = this.props;
    return (
      <AppStyle top={helicopterTop}>
        <div className="icopter-wrapper">
          <div className="icopter-container">
            <Video containerWidth={0} containerHeight={0} src={backgroundVideo} />
            {!gameStarted && <Message msg={this.getFirstMessage()} />}
            {gameStarted && gameOver && <Message msg="Game over" />}
            {gameStarted && !gameOver && <BombGenerator />}
            <Helicopter className={this.state.helicopterStatusClassName} />
            <Clock showTime={this.stringifyTime} />
          </div>
        </div>
      </AppStyle>
    );
  }
}

const mapStateToProps = ({
  appReducer: {
    gameStarted, gameOver, helicopterTop, bestScore,
  },
}) => ({
  gameStarted,
  gameOver,
  helicopterTop,
  bestScore,
});

export default connect(mapStateToProps, { startGame, initGame })(App);
