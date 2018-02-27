import { all } from 'redux-saga/effects'
import tags from './picturedisplay/sagas/tags'
import pictures from './picturedisplay/sagas/pictures'
import mediaitems from './picturedisplay/sagas/mediaitems'

export default function* sagas() {
  yield all([
    ...tags,
    ...pictures,
    ...mediaitems
  ])
}
