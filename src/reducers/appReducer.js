import { actionTypes } from '../actions';

const INITIAL_STATE = {
  gameStarted: false,
  gameOver: false,
};

export default (state = INITIAL_STATE, action: {}) => {
  switch (action.type) {
    case actionTypes.START_GAME:
      return { ...state, gameStarted: true };
    case actionTypes.GAME_OVER:
      return { ...state, gameOver: true };
    default:
      return state;
  }
};
