import { Map } from 'immutable'
import {
  TOGGLE_SHOW_SEARCH_MODAL
} from '../actions/controls'

export const INITIAL_STATE = Map({
  'show-search-modal': false
})

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case TOGGLE_SHOW_SEARCH_MODAL:
    return state.update(
      'show-search-modal', x => !x
    )
  default:
    return state
  }
}
