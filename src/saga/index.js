import { takeLatest, put, call } from 'redux-saga/effects';
import * as firebase from 'firebase';
import actionTypes from '../actions/actionTypes';

const getValue = (best: {}) =>
  new Promise((resolve: () => void) => {
    best.on('value', (dataSnapShot) => {
      resolve(dataSnapShot.val());
    });
  });

function* init() {
  const databaseRef = firebase.database().ref();
  const best = databaseRef.child('scores').child('best');
  const res = yield getValue(best);
  yield put({ type: actionTypes.INIT_GAME, payload: { bestScore: res } });
}

function* updateScore({ payload }: {}) {
  const databaseRef = firebase.database().ref();
  databaseRef
    .child('scores')
    .child('best')
    .set(payload.record);
  console.log('OOOOKKKKAAAAYYY');
  yield call(() => init());
}

export default function* sideEffects() {
  yield takeLatest(actionTypes.INIT_RECORD, init);
  yield takeLatest(actionTypes.UPDATE_SCORE, updateScore);
}
