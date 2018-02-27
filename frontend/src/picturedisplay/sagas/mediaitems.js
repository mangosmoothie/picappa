import { put, takeEvery, call, all } from 'redux-saga/effects'
import axios from 'axios'
import { addMediaStatusOption, addMediaTypeOption } from '../actions/mediaitems'
import { getMediaSelections } from '../../api'


function* fetchMediaSelections() {
  try{
    const {statuses, media_types} = yield call(getMediaSelections)
    yield all(statuses.map(s => put(addMediaStatusOption(s))))
    yield all(media_types.map(t => put(addMediaTypeOption(t))))
  } catch (e) {
    console.error(e)
    yield put({type: 'REQUEST_MEDIA_SELECTIONS_FAILED', message: e.message})
  }
}

export default [
  takeEvery('REQUEST_MEDIA_SELECTIONS', fetchMediaSelections)
]
