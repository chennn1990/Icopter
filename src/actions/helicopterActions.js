import actionTypes from './actionTypes';

export default (top: number) => ({
  type: actionTypes.UPDATE_HELICOPTER_TOP,
  payload: {
    top,
  },
});
