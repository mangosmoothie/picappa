import { all } from 'redux-saga/effects'
import tags from './picturedisplay/sagas/tags'

export default function* sagas() {
  yield all([
    ...tags
  ])
}
