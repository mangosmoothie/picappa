import { put, takeEvery, call, all } from 'redux-saga/effects'
import axios from 'axios'
import { addTag } from '../actions/tags'
import { getTags } from '../../api'


function* fetchTags() {
  try{
    const tags = yield call(getTags)
    yield all(tags.map(t => put(addTag(t))))
  } catch (e) {
    console.error(e)
    yield put({type: 'REQUEST_TAGS_FAILED', message: e.message})
  }
}

export default [
  takeEvery('REQUEST_TAGS', fetchTags)
]

