import styled, { keyframes } from 'styled-components';
import { SCREEN_HEIGHT, HELICOPTER_HEIGHT } from './constants';

const FULL_SCREEN = SCREEN_HEIGHT - HELICOPTER_HEIGHT;
const FULL_SCREEN_JUMP_TIME = 1;
const FULL_SCREEN_FALL_TIME = 1.5;

const calculateTime = (screenSize: number, fullScreenTime: number): number =>
  fullScreenTime * screenSize / FULL_SCREEN;

export const fall = (top: number) => {
  const helicopterFall = keyframes`
    0% {
      top: ${top}px;
    }

    100% {
      top: ${FULL_SCREEN}px;
    }
  `;
  return helicopterFall;
};

const jump = (top: number) => {
  const helicopterJump = keyframes`
    0% {
      top: ${top}px;
    }

    100% {
      top: 0px;
    }
  `;
  return helicopterJump;
};

export default styled.div`
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

  .fail {
    animation: ${props => fall(props.top)}
      ${props => calculateTime(FULL_SCREEN - props.top, FULL_SCREEN_FALL_TIME)}s linear forwards;
  }

  .jump {
    animation: ${props => jump(props.top)}
      ${props => calculateTime(props.top, FULL_SCREEN_JUMP_TIME)}s linear forwards;
  }
`;
