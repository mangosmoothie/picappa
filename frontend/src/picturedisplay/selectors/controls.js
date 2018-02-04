import { createSelector } from 'reselect'

const showMediaSearchPanel = state =>
      state.getIn(['controls', 'show-media-search-panel'])

export const getShowMediaSearchPanel = createSelector(
  [showMediaSearchPanel],
  show => show
)

const mediaViewerDialogUrl = state =>
      state.getIn(['controls', 'media-viewer-dialog-url'])

export const getMediaViewerDialogUrl = createSelector(
  [mediaViewerDialogUrl],
  url => url
)

const mediaEditorDialogItem = state =>
      state.getIn(['controls', 'media-editor-dialog-item'])

export const getMediaEditorDialogItem = createSelector(
  [mediaEditorDialogItem],
  item => item
)
