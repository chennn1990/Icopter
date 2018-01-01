import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { CRASH_TIME } from '../../constants';
import { updateScore } from '../../actions';

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
    font-size: 80px;
  }

  .stop-timer > div {
    left: -50%;
  }
`;

type Props = {
  gameStarted: boolean,
  gameOver: boolean,
  updateScore: () => void,
  showTime: (time: number) => string,
  bestScore: number,
};

type State = {
  counter: number,
};

class Clock extends Component<Props, State> {
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
      const { counter } = this.state;
      const { bestScore } = this.props;
      clearInterval(this.intervalId);
      if (counter > bestScore) this.props.updateScore(counter);
    }
    if (!nextProps.gameStarted) {
      this.setState({
        counter: 0,
      });
    }
  };

  componentWillUnmount = () => clearInterval(this.intervalId);

  intervalId: number;

  render() {
    const { gameStarted, gameOver } = this.props;
    return (
      <ClockStyle>
        <div className={`${gameStarted && gameOver ? 'stop-timer' : ''} clock`}>
          <div>
            {gameStarted && gameOver && 'Your time is: '}
            {this.props.showTime(this.state.counter)}
          </div>
        </div>
      </ClockStyle>
    );
  }
}

const mapStateToProps = ({ appReducer: { gameStarted, gameOver, bestScore } }) => ({
  gameStarted,
  gameOver,
  bestScore,
});

export default connect(mapStateToProps, { updateScore })(Clock);
