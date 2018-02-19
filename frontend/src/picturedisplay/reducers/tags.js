import {
  TOGGLE_TAG,
  ADD_TAG
} from '../actions/tags'

export const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action){
  let id
  switch (action.type) {
  case TOGGLE_TAG:
    id = action.id
    let newVal = !state[id][action.field]
    return {...state, [id]: {...state[id], [action.field]: newVal}}
  case ADD_TAG:
    id = action.tag.id
    const defaults = {selected: false}
    return {...state, [id]: {...defaults, ...action.tag}}
  default:
    return state
  }
}
