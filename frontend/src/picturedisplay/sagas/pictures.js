import { put, takeEvery, call, all, select } from 'redux-saga/effects'
import axios from 'axios'
import { addPic } from '../actions/pictures'
import { getPics } from '../../api'
import {
  getStartAt,
  getLimit
} from '../selectors/controls'
import { makeGetFilteredTags } from '../selectors/tags'

function getSelectedTags(state){
  return Object.keys(state.tags)
    .filter( t => t.selected )
    .map( t => t.id )
}

function* fetchPics() {
  try{
    const startAt = yield select(getStartAt)
    const limit = yield select(getLimit)
    const getFilteredTags = makeGetFilteredTags()
    const tags = yield select(getFilteredTags, {predicate: x => x.selected})
    const pics = yield call(getPics, startAt, limit, tags)
    yield all(pics.map(p => put(addPic(p))))
  } catch (e) {
    console.error(e)
    yield put({type: 'REQUEST_PICS_FAILED', message: e.message})
  }
}

export default [
  takeEvery('REQUEST_PICS', fetchPics)
]

