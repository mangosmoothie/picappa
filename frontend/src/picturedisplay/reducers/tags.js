import { Map } from 'immutable'
import {
  TOGGLE_TAG,
  ADD_TAG
} from '../actions/tags'

export const INITIAL_STATE = Map()

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case TOGGLE_TAG:
    return state.updateIn(
      [action.id, action.field],
      x => !x
    )
  case ADD_TAG:
    const defaults = {selected: false}
    return state.set(
      action.tag.id,
      Map({...defaults, ...action.tag})
    )
  default:
    return state
  }
}
