export const TOGGLE_SHOW_MEDIA_SEARCH_PANEL = 'TOGGLE_SHOW_MEDIA_SEARCH_PANEL'

export function toggleShowMediaSearchPanel(){
  return {
    type: TOGGLE_SHOW_MEDIA_SEARCH_PANEL
  }
}

export const CLOSE_MEDIA_VIEWER_DIALOG = 'CLOSE_MEDIA_VIEWER_DIALOG'

export function closeMediaViewerDialog(){
  return {
    type: CLOSE_MEDIA_VIEWER_DIALOG
  }
}

export const SET_MEDIA_VIEWER_DIALOG_URL = 'SET_MEDIA_VIEWER_DIALOG_URL'

export function setMediaViewerDialogUrl(url){
  return {
    type: SET_MEDIA_VIEWER_DIALOG_URL,
    url: url
  }
}

export const SET_MEDIA_EDITOR_DIALOG_ITEM = 'SET_MEDIA_EDITOR_DIALOG_ITEM'

export function setMediaEditorDialogItem(item){
  return {
    type: SET_MEDIA_EDITOR_DIALOG_ITEM,
    item: item
  }
}

export const CLOSE_MEDIA_EDITOR_DIALOG = 'CLOSE_MEDIA_EDITOR_DIALOG'

export function closeMediaEditorDialog(){
  return {
    type: CLOSE_MEDIA_EDITOR_DIALOG
  }
}

export const UPDATE_STARTAT = 'UPDATE_STARTAT'

export function updateStartAt(startAt){
  return {
    type: UPDATE_STARTAT,
    startAt: startAt
  }
}

export const UPDATE_LIMIT = 'UPDATE_LIMIT'

export function updateLimit(limit){
  return {
    type: UPDATE_LIMIT,
    limit: limit
  }
}
