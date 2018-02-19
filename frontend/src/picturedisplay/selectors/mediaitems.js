import { createSelector } from 'reselect'

const mediaTypes = state => state.mediaitems.mediaTypes

export const getMediaTypes = createSelector(
  [mediaTypes],
  t => t
)

const mediaStatuses = state => state.mediaitems.mediaStatuses

export const getMediaStatuses = createSelector(
  [mediaStatuses],
  s => s
)
