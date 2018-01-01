import actionTypes from './actionTypes';

export default (record: number) => ({
  type: actionTypes.UPDATE_SCORE,
  payload: {
    record,
  },
});
