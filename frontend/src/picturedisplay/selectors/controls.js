import { createSelector } from 'reselect'

const showMediaSearchPanel = state => state.controls.showMediaSearchPanel

export const getShowMediaSearchPanel = createSelector(
  [showMediaSearchPanel],
  show => show
)

const mediaViewerDialogUrl = state =>
      state.controls.mediaViewerDialogUrl

export const getMediaViewerDialogUrl = createSelector(
  [mediaViewerDialogUrl],
  url => url
)

const mediaEditorDialogItem = state =>
      state.controls.mediaEditorDialogItem

export const getMediaEditorDialogItem = createSelector(
  [mediaEditorDialogItem],
  item => item
)

const startAt = state => state.controls.startAt

export const getStartAt = createSelector(
  [startAt],
  d => d
)

const limit = state => state.controls.limit

export const getLimit = createSelector(
  [limit],
  d => d
)
