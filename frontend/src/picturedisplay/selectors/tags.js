import { createSelector } from 'reselect'

const tags = state => state.tags

export const getTags = createSelector(
  [tags],
  t => t
)

const predicate = (state, props) => props.predicate

export const makeGetFilteredTags = () => createSelector(
  [getTags, predicate],
  (tags, predicate) => tags.filter(predicate)
)
