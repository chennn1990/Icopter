import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from 'react-background-video-player';
import styled from 'styled-components';
import { SCREEN_HEIGHT, HELICOPTER_TOP } from './constants';
import { Helicopter, Message, BombCreator } from './components';
import { startGame, endGame } from './actions';
import backgroundVideo from './assets/Clouds_Fly_By.mp4';

const AppStyle = styled.div`
  display: table;
  position: absolute;
  height: 100%;
  width: 100%;

  .icopter-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .icopter-container {
    margin-left: auto;
    margin-right: auto;
    border-top: 30px solid #1b1818d6;
    border-bottom: 30px solid #1b1818d6;
    height: ${SCREEN_HEIGHT}px;
    position: relative;
  }
`;

type Props = {
  gameStarted: boolean,
  gameOver: boolean,
  startGame: () => void,
  endGame: () => void,
};

type State = {
  helicopterTop: number,
};

class App extends Component<Props, State> {
  static defaultProps = {
    gameStarted: false,
    startGame: undefined,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      helicopterTop: HELICOPTER_TOP,
    };
  }

  componentDidMount = () => {
    window.onkeypress = (e) => {
      if (e.keyCode === 13) this.props.startGame();
    };
  };

  componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.gameStarted) {
      this.helicopterFall();
      this.registerToClimbEvent();
    }
  };

  onEscape = (event: EventTarget, action: () => void) => {
    if (event.keyCode === 32) action();
  };

  helicopterFall = () => {
    this.helicopterIntervalId = setInterval(() => this.moveHelicopter(2, false), 3);
  };

  calculateHelicopterTop = (pixels: number, climb: boolean) => {
    const { helicopterTop } = this.state;
    let top = climb ? helicopterTop - pixels : helicopterTop + pixels;
    if (top <= 0) {
      this.stopHelicopter();
      this.props.endGame();
      top = 0;
    }
    if (top >= SCREEN_HEIGHT - HELICOPTER_TOP) {
      this.stopHelicopter();
      this.props.endGame();
      top = SCREEN_HEIGHT - HELICOPTER_TOP;
    }
    return top;
  };

  moveHelicopter = (pixels: number, climb: boolean) => {
    this.setState({
      helicopterTop: this.calculateHelicopterTop(pixels, climb),
    });
  };

  helicopterIntervalId: number;
  bombIntervals: [];

  registerToClimbEvent = () => {
    let interval;
    window.onkeypress = (e) => {
      this.onEscape(e, () => {
        this.stopHelicopter();
        this.moveHelicopter(30, true);
        interval = setInterval(() => this.moveHelicopter(3, true), 1);
      });
    };
    window.onkeyup = (e) => {
      this.onEscape(e, () => {
        clearInterval(interval);
        this.helicopterFall();
      });
    };
  };

  stopHelicopter = () => {
    clearInterval(this.helicopterIntervalId);
  };

  render() {
    const { gameStarted, gameOver } = this.props;
    return (
      <AppStyle>
        <div className="icopter-wrapper">
          <div className="icopter-container">
            <Video containerWidth={0} containerHeight={0} src={backgroundVideo} />
            {!gameStarted && <Message msg="Press `Enter` to start play" />}
            {gameOver && <Message msg="Game over" />}
            {gameStarted && !gameOver && <BombCreator />}
            <Helicopter top={this.state.helicopterTop} />
          </div>
        </div>
      </AppStyle>
    );
  }
}

const mapStateToProps = ({ appReducer: { gameStarted, gameOver } }) => ({
  gameStarted,
  gameOver,
});

export default connect(mapStateToProps, { startGame, endGame })(App);
