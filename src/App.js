import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from 'react-background-video-player';
import AppStyle from './styles';
import { HELICOPTER_TOP } from './constants';
import { Helicopter, Message, BombGenerator } from './components';
import { startGame } from './actions';
import backgroundVideo from './assets/Clouds_Fly_By.mp4';

type Props = {
  gameStarted: boolean,
  gameOver: boolean,
  helicopterTop: number,
  startGame: () => void,
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
    window.onkeypress = (e) => {
      if (e.keyCode === 13) {
        this.props.startGame();
        this.setState({
          helicopterStatusClassName: 'fail',
        });
        this.registerToClimbEvent();
      }
    };
  };

  onSpacePress = (event: EventTarget, action: () => void): void => {
    if (event.keyCode === 32) action();
  };

  switchHelicopterClass = (className: string): void => {
    this.setState({
      helicopterStatusClassName: className,
    });
  };

  registerToClimbEvent = (): void => {
    window.onkeypress = (e) => {
      this.onSpacePress(e, () => this.switchHelicopterClass('jump'));
    };
    window.onkeyup = (e) => {
      this.onSpacePress(e, () => this.switchHelicopterClass('fail'));
    };
  };

  render() {
    const { gameStarted, gameOver } = this.props;
    return (
      <AppStyle top={this.props.helicopterTop}>
        <div className="icopter-wrapper">
          <div className="icopter-container">
            <Video containerWidth={0} containerHeight={0} src={backgroundVideo} />
            {!gameStarted && <Message msg="Press `Enter` to start play" />}
            {gameOver && <Message msg="Game over" />}
            {gameStarted && !gameOver && <BombGenerator />}
            <Helicopter className={this.state.helicopterStatusClassName} />
          </div>
        </div>
      </AppStyle>
    );
  }
}

const mapStateToProps = ({ appReducer: { gameStarted, gameOver, helicopterTop } }) => ({
  gameStarted,
  gameOver,
  helicopterTop,
});

export default connect(mapStateToProps, { startGame })(App);
