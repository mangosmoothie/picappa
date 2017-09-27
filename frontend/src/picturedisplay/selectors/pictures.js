import { createSelector } from 'reselect'

const getPics = state => state.pictures

export const getPictures = createSelector(
  [getPics],
  (pics) => pics
)
