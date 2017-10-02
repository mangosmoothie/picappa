import * as cut from './controls'

it('toggle show search modal', () => {
  const action = cut.toggleShowSearchModal();
  expect(action).toEqual({type: cut.TOGGLE_SHOW_SEARCH_MODAL})
})
