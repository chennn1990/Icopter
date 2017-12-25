import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import helicopterImg from '../../assets/helicopter.png';
import {
  HELICOPTER_LEFT,
  HELICOPTER_TOP,
  HELICOPTER_HEIGHT,
  HELICOPTER_WIDTH,
} from '../../constants';
import { updateHelicopterTop } from '../../actions';

const HelicopterStyle = styled.div`
  img {
    width: ${HELICOPTER_WIDTH}px;
    height: ${HELICOPTER_HEIGHT}px;
    position: absolute;
    left: ${HELICOPTER_LEFT}px;
    top: ${HELICOPTER_TOP}px;
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
    this.intervalId = setInterval(() => {
      this.props.updateHelicopterTop(this.helicopter.offsetTop);
    }, 50);
  };

  componentWillReceiveProps = (nextProps: Props) =>
    nextProps.gameOver && clearInterval(this.intervalId);

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };

  inretvalId: number;

  render() {
    return (
      <HelicopterStyle>
        <img
          src={helicopterImg}
          alt=""
          className={this.props.className}
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
