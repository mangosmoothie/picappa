import { createSelector } from 'reselect'

export const getTags = state => state.tags

const predicate = (state, props) => props.predicate

export const makeGetFilteredTags = () => createSelector(
  [getTags, predicate],
  (tags, predicate) => tags.filter(predicate)
)
