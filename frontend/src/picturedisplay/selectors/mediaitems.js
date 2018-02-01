import { createSelector } from 'reselect'

const mediaTypes = state => state.mediaitems.get('media-types')

export const getMediaTypes = createSelector(
  [mediaTypes],
  t => t
)

const mediaStatuses = state => state.mediaitems.get('media-statuses')

export const getMediaStatuses = createSelector(
  [mediaStatuses],
  s => s
)
