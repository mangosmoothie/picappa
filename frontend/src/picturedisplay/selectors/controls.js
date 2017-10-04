import { createSelector } from 'reselect'

const showMediaSearchPanel = state => state.controls.get('show-media-search-panel')

export const getShowMediaSearchPanel = createSelector(
  [showMediaSearchPanel],
  show => show
)
