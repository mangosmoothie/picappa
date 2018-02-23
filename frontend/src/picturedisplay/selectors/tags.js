import { createSelector } from 'reselect'

const tags = state => state.tags

export const getTags = createSelector(
  [tags],
  t => t
)

const predicate = (state, props) => props.predicate

export const makeGetFilteredTags = () => createSelector(
  [getTags, predicate],
  (obj, predicate) => Object.keys(obj)
    .filter( key => predicate(obj[key]) )
    .reduce( (res, key) => (res.push(obj[key]), res), [])
)
