import React, { Component } from 'react';
import styled from 'styled-components';
import helicopterImg from '../../assets/helicopter.png';

const HelicopterStyle = styled.div`
  img {
    width: 150px;
    height: 115px;
    position: absolute;
    left: 250px;
    top: ${props => (props.start ? props.top : '40%')};
  }
`;

type Props = {
  start?: boolean,
};

type State = {};

export default class Helicopter extends Component<Props, State> {
  static defaultProps = {
    start: false,
  };

  componentDidMount = () => {};

  render() {
    return (
      <HelicopterStyle start={this.props.start}>
        <img src={helicopterImg} alt="" />
      </HelicopterStyle>
    );
  }
}
