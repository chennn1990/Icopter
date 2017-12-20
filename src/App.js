import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Border, Helicopter } from './components';
import { startGame } from './actions';

const AppStyle = styled.div`
  .helicopter-wrapper {
    height: 600px;
    position: relative;
  }
`;

type Props = {
  gameStarted: boolean,
  startGame: () => void,
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
      helicopterTop: 50,
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

  intervalId: number;

  helicopterFall = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        helicopterTop: this.state.helicopterTop + 2,
      });
    }, 3);
  };

  onEscape = (event: EventTarget, action: () => void) => {
    if (event.keyCode === 32) action();
  };

  registerToClimbEvent = () => {
    let interval;
    window.onkeypress = (e) => {
      this.onEscape(e, () => {
        this.stop();
        this.setState({
          helicopterTop: this.state.helicopterTop - 40,
        });
        interval = setInterval(
          this.setState({
            helicopterTop: this.state.helicopterTop - 6,
          }),
          2,
        );
      });
    };
    window.onkeyup = (e) => {
      this.onEscape(e, () => {
        clearInterval(interval);
        this.helicopterFall();
      });
    };
  };

  stop = () => clearInterval(this.intervalId);

  render() {
    return (
      <AppStyle>
        <div className="icopter-container">
          <Border />
          <div className="helicopter-wrapper">
            <Helicopter top={this.state.helicopterTop} />
          </div>
          <Border bottom />
        </div>
      </AppStyle>
    );
  }
}

const mapStateToProps = ({ appReducer: { gameStarted } }) => ({
  gameStarted,
});

export default connect(mapStateToProps, { startGame })(App);
