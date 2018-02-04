import { createSelector } from 'reselect'

const mediaTypes = state => state.getIn(['mediaitems', 'media-types'])

export const getMediaTypes = createSelector(
  [mediaTypes],
  t => t
)

const mediaStatuses = state => state.getIn(['mediaitems', 'media-statuses'])

export const getMediaStatuses = createSelector(
  [mediaStatuses],
  s => s
)
