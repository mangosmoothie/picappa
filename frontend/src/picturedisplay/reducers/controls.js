import { Map } from 'immutable'
import {
  TOGGLE_SHOW_MEDIA_SEARCH_PANEL
} from '../actions/controls'

export const INITIAL_STATE = Map({
  'show-media-search-panel': false
})

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case TOGGLE_SHOW_MEDIA_SEARCH_PANEL:
    return state.update(
      'show-media-search-panel', x => !x
    )
  default:
    return state
  }
}
