import * as cut from './controls'

it('toggle show media search panel', () => {
  const action = cut.toggleShowMediaSearchPanel();
  expect(action).toEqual({type: cut.TOGGLE_SHOW_MEDIA_SEARCH_PANEL})
})
