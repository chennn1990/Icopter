import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import helicopterImg from '../../assets/helicopter.png';
import {
  HELICOPTER_LEFT,
  HELICOPTER_TOP,
  HELICOPTER_HEIGHT,
  HELICOPTER_WIDTH,
  CRASH_TIME,
} from '../../constants';
import { fall } from '../../styles';
import { updateHelicopterTop } from '../../actions';

const HelicopterStyle = styled.div`
  img {
    width: ${HELICOPTER_WIDTH}px;
    height: ${HELICOPTER_HEIGHT}px;
    position: absolute;
    left: ${HELICOPTER_LEFT}px;
    top: ${props => (!props.gameOver ? HELICOPTER_TOP : props.top)}px;
    transition: ${CRASH_TIME}ms;
  }

  .crash {
    transform: rotate(1980deg);
    animation: ${props => fall(props.top)} ${CRASH_TIME}ms linear forwards;
  }
`;

type Props = {
  gameOver: boolean,
  className?: string,
  updateHelicopterTop?: () => void,
};

type State = {};

class Helicopter extends Component<Props, State> {
  static defaultProps = {
    className: undefined,
    updateHelicopterTop: undefined,
  };

  componentDidMount = () => {
    this.intervalId = setInterval(this.updateTop, 50);
  };

  componentWillReceiveProps = (nextProps: Props) => {
    if (!nextProps.gameOver) {
      this.intervalId = setInterval(this.updateTop, 50);
    }
    if (nextProps.gameOver) {
      clearInterval(this.intervalId);
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };

  updateTop = () => {
    this.top = this.helicopter.offsetTop;
    this.props.updateHelicopterTop(this.helicopter.offsetTop);
  };

  inretvalId: number;
  top: number;

  render() {
    const { className, gameOver } = this.props;
    return (
      <HelicopterStyle top={this.top} gameOver={gameOver}>
        <img
          src={helicopterImg}
          alt=""
          className={gameOver ? 'crash' : className}
          ref={(h) => {
            this.helicopter = h;
          }}
        />
      </HelicopterStyle>
    );
  }
}

const mapStateToProps = ({ appReducer: { gameOver } }) => ({
  gameOver,
});

export default connect(mapStateToProps, { updateHelicopterTop })(Helicopter);
