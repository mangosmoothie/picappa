import { createSelector } from 'reselect'

const showMediaSearchPanel = state => state.controls.get('show-media-search-panel')

export const getShowMediaSearchPanel = createSelector(
  [showMediaSearchPanel],
  show => show
)

const mediaViewerDialogUrl = state => state.controls.get('media-viewer-dialog-url')

export const getMediaViewerDialogUrl = createSelector(
  [mediaViewerDialogUrl],
  url => url
)
