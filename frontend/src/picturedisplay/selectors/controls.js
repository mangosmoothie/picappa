import { createSelector } from 'reselect'

const showSearchModal = state => state.controls.get('show-search-modal')

export const getShowSearchModal = createSelector(
  [showSearchModal],
  show => show
)
