import * as cut from './controls'

it('toggle show media search panel', () => {
  const action = cut.toggleShowMediaSearchPanel();
  expect(action).toEqual({type: cut.TOGGLE_SHOW_MEDIA_SEARCH_PANEL})
})

it('close media viewer dialog', () => {
  const action = cut.closeMediaViewerDialog();
  expect(action).toEqual({type: cut.CLOSE_MEDIA_VIEWER_DIALOG})
})

it('set media viewer dialog url', () => {
  const url = 'something'
  const action = cut.setMediaViewerDialogUrl(url);
  expect(action).toEqual({type: cut.SET_MEDIA_VIEWER_DIALOG_URL,
                          url: url})
})
