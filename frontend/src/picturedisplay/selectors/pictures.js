import { createSelector } from 'reselect'

const getPics = state => state.get('pictures')

export const getPictures = createSelector(
  [getPics],
  (pics) => pics
)
