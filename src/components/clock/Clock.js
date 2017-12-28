import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { CRASH_TIME } from '../../constants';

const stopTimer = keyframes`
    0% {
      top: 15px;
      left: 20px;
    }

    100% {
      top: 30%;
      left: 50%;
    }
  `;

const ClockStyle = styled.div`
  .clock {
    position: absolute;
    top: 15px;
    left: 20px;
    text-shadow: 2px 2px #000;
    color: #d19f11;
    font-size: 35px;
    font-weight: bold;
    font-family: fantasy;
  }

  .clock > div {
    position: relative;
  }

  .stop-timer {
    animation: ${stopTimer} ${CRASH_TIME}ms linear forwards;
    font-size: 115px;
  }

  .stop-timer > div {
    left: -50%;
  }
`;

type Props = {
  gameStarted: boolean,
  gameOver: boolean,
};

type State = {
  counter: number,
};

class Clock extends Component<Props, State> {
  static defaultProps = {
    gameStarted: false,
    gameOver: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.gameStarted && !nextProps.gameOver) {
      this.intervalId = setInterval(() => {
        this.setState({
          counter: this.state.counter + 1,
        });
      }, 100);
    }
    if (nextProps.gameOver) {
      clearInterval(this.intervalId);
    }
    if (!nextProps.gameStarted) {
      this.setState({
        counter: 0,
      });
    }
  };

  componentWillUnmount = () => clearInterval(this.intervalId);

  intervalId: number;

  presentMinutes = () => {
    const minutes = Math.floor(this.state.counter / 10 / 60);
    return minutes > 0 ? `${minutes}:` : '';
  };

  render() {
    const { gameStarted, gameOver } = this.props;
    const { counter } = this.state;
    return (
      <ClockStyle>
        <div className={`${gameStarted && gameOver ? 'stop-timer' : ''} clock`}>
          <div>
            {gameStarted && gameOver && 'Your time is: '}
            {this.presentMinutes()}
            {Math.floor((counter / 10) % 60)}:{counter % 10}{' '}
          </div>
        </div>
      </ClockStyle>
    );
  }
}

const mapStateToProps = ({ appReducer: { gameStarted, gameOver } }) => ({
  gameStarted,
  gameOver,
});

export default connect(mapStateToProps)(Clock);
