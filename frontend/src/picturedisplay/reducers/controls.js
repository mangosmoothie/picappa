import {
  TOGGLE_SHOW_MEDIA_SEARCH_PANEL,
  SET_MEDIA_VIEWER_DIALOG_URL,
  CLOSE_MEDIA_VIEWER_DIALOG,
  SET_MEDIA_EDITOR_DIALOG_ITEM,
  CLOSE_MEDIA_EDITOR_DIALOG,
  UPDATE_STARTAT,
  UPDATE_LIMIT
} from '../actions/controls'

export const INITIAL_STATE_STARTAT = 0
export const INITIAL_STATE_LIMIT = 25

export const INITIAL_STATE = {
  showMediaSearchPanel: false,
  mediaViewerDialogUrl: false,
  mediaEditorDialogItem: false,
  startAt: INITIAL_STATE_STARTAT,
  limit: INITIAL_STATE_LIMIT
}

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case TOGGLE_SHOW_MEDIA_SEARCH_PANEL:
    return {...state,
            showMediaSearchPanel: !state.showMediaSearchPanel
           }
  case SET_MEDIA_VIEWER_DIALOG_URL:
    return {...state,
            mediaViewerDialogUrl: action.url || false
           }
  case CLOSE_MEDIA_VIEWER_DIALOG:
    return {...state,
            mediaViewerDialogUrl: false
           }
  case SET_MEDIA_EDITOR_DIALOG_ITEM:
    return {...state,
            mediaEditorDialogItem: action.item || false
           }
  case CLOSE_MEDIA_EDITOR_DIALOG:
    return {...state,
            mediaEditorDialogItem: false
           }
  case UPDATE_STARTAT:
    return {...state,
            startAt: action.startAt
           }
  case UPDATE_LIMIT:
    return {...state,
            limit: action.limit
           }
  default:
    return state
  }
}
