import { Map } from 'immutable'
import {
  TOGGLE_SHOW_MEDIA_SEARCH_PANEL,
  SET_MEDIA_VIEWER_DIALOG_URL,
  CLOSE_MEDIA_VIEWER_DIALOG
} from '../actions/controls'

export const INITIAL_STATE = Map({
  'show-media-search-panel': false,
  'media-viewer-dialog-url': false
})

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case TOGGLE_SHOW_MEDIA_SEARCH_PANEL:
    return state.update(
      'show-media-search-panel', x => !x
    )
  case SET_MEDIA_VIEWER_DIALOG_URL:
    return state.update(
      'media-viewer-dialog-url', x => action.url || false
    )
  case CLOSE_MEDIA_VIEWER_DIALOG:
    return state.update(
      'media-viewer-dialog-url', x => false
    )
  default:
    return state
  }
}
