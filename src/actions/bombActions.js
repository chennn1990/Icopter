import actionTypes from './actionTypes';

export const generateBombs = () => ({
  type: actionTypes.GENERATE_BOMBS,
});

export const updateBombLeft = (index: number, left: number) => ({
  type: actionTypes.UPDATE_BOMB_LEFT,
  payload: {
    index,
    left,
  },
});
