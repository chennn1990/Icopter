import { actionTypes } from '../actions';
import {
  SCREEN_HEIGHT,
  HELICOPTER_TOP,
  HELICOPTER_WIDTH,
  BOMB_HEIGHT,
  NUM_OF_BOMBS,
  HELICOPTER_LEFT,
  BOMB_WIDTH,
  BombObj,
  HELICOPTER_HEIGHT,
} from '../constants';

const INITIAL_STATE = {
  gameStarted: false,
  gameOver: false,
  helicopterTop: HELICOPTER_TOP,
  bombs: [],
};

const updateHelicopter = (state: {}, top: number): {} => {
  const gameOver = state.gameOver || top >= SCREEN_HEIGHT - HELICOPTER_TOP || top <= 0;
  return {
    ...state,
    gameOver,
    helicopterTop: top,
  };
};

const generateBombs = (state: {}): {} => {
  const bombs = [];
  for (let i = 0; i < NUM_OF_BOMBS; i++) {
    const yOffset = BOMB_HEIGHT + Math.random() * (SCREEN_HEIGHT - 2 * BOMB_HEIGHT);
    bombs.push({ x: window.outerWidth, y: yOffset });
  }
  return { ...state, bombs };
};

const isCollision = (bomb: BombObj, bombLeft: number, helicopterTop: number): boolean => {
  const HELICOPTER_RIGHT = HELICOPTER_LEFT + HELICOPTER_WIDTH;
  const HELICOPTER_BOTTOM = helicopterTop + HELICOPTER_HEIGHT;
  const BOMB_BOTTOM = bomb.y + BOMB_HEIGHT;
  const BOMB_RIGHT = bombLeft + BOMB_WIDTH;
  let res;
  res =
    HELICOPTER_LEFT <= bombLeft &&
    HELICOPTER_RIGHT >= bombLeft &&
    helicopterTop <= bomb.y &&
    HELICOPTER_BOTTOM >= bomb.y;
  if (!res) {
    res =
      HELICOPTER_LEFT <= bombLeft &&
      HELICOPTER_RIGHT >= bombLeft &&
      helicopterTop >= bomb.y &&
      helicopterTop <= BOMB_BOTTOM;
  }
  if (!res) {
    res =
      bombLeft <= HELICOPTER_LEFT &&
      BOMB_RIGHT >= HELICOPTER_LEFT &&
      bomb.y <= helicopterTop &&
      BOMB_BOTTOM >= helicopterTop;
  }
  if (!res) {
    res =
      bombLeft <= HELICOPTER_LEFT &&
      BOMB_RIGHT >= HELICOPTER_LEFT &&
      bomb.y <= HELICOPTER_BOTTOM &&
      BOMB_BOTTOM >= HELICOPTER_BOTTOM;
  }
  return res;
};

export default (state = INITIAL_STATE, action: {}): {} => {
  switch (action.type) {
    case actionTypes.INIT_GAME:
      return INITIAL_STATE;
    case actionTypes.START_GAME:
      return { ...state, gameStarted: true };
    case actionTypes.UPDATE_HELICOPTER_TOP:
      return updateHelicopter(state, action.payload.top);
    case actionTypes.GENERATE_BOMBS:
      return generateBombs(state);
    case actionTypes.UPDATE_BOMB_LEFT:
      const { index, left } = action.payload;
      return isCollision(state.bombs[index], left, state.helicopterTop)
        ? { ...state, gameOver: true }
        : state;
    default:
      return state;
  }
};
