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
