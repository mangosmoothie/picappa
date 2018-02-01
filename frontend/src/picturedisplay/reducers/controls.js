import { Map } from 'immutable'
import {
  TOGGLE_SHOW_MEDIA_SEARCH_PANEL,
  SET_MEDIA_VIEWER_DIALOG_URL,
  CLOSE_MEDIA_VIEWER_DIALOG,
  SET_MEDIA_EDITOR_DIALOG_ITEM,
  CLOSE_MEDIA_EDITOR_DIALOG
} from '../actions/controls'

export const INITIAL_STATE = Map({
  'show-media-search-panel': false,
  'media-viewer-dialog-url': false,
  'media-editor-dialog-item': false
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
  case SET_MEDIA_EDITOR_DIALOG_ITEM:
    return state.update(
      'media-editor-dialog-item', x => action.item || false
    )
  case CLOSE_MEDIA_EDITOR_DIALOG:
    return state.update(
      'media-editor-dialog-item', x => false
    )
  default:
    return state
  }
}
