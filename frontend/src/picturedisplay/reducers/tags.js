import { Map, List } from 'immutable'
import {
  TOGGLE_TAG,
  ADD_TAG
} from '../actions/tags'

export default function(state = List(), action){
  switch (action.type) {
  case TOGGLE_TAG:
    return state.map( tag => {
      if (tag.get('id') === action.id) {
        return tag.update(action.field, x => !x)
      }
      return tag
    })
  case ADD_TAG:
    const defaults = {selected: false}
    return state.push(
      Map({...action.tag, ...defaults})
    )
  default:
    return state
  }
}
