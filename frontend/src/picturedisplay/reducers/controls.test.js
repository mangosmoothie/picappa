import { Map } from 'immutable'
import controls, * as cut from './controls'
import {
  toggleShowMediaSearchPanel,
  setMediaViewerDialogUrl,
  closeMediaViewerDialog,
  setMediaEditorDialogItem,
  closeMediaEditorDialog
} from '../actions/controls'

it('initial state', () => {
  const showSearchPanel = cut.INITIAL_STATE.get('show-media-search-panel')
  expect(showSearchPanel).toEqual(false)

  const mediaViewerDialogUrl = cut.INITIAL_STATE.get('media-viewer-dialog-url')
  expect(mediaViewerDialogUrl).toEqual(false)
})

it('toggle show search modal', () => {
  const initialState = Map({ 'show-media-search-panel': false})
  const testStateTrue = controls(initialState, toggleShowMediaSearchPanel())
  const testStateFalse = controls(testStateTrue, toggleShowMediaSearchPanel())

  expect(testStateTrue.get('show-media-search-panel')).toEqual(true)
  expect(testStateFalse.get('show-media-search-panel')).toEqual(false)
})

it('toggle media viewer dialog', () => {
  const initialState = Map({ 'media-viewer-dialog-url': false})
  const testStateSome = controls(initialState, setMediaViewerDialogUrl('Some'))
  const testStateFalse = controls(testStateSome, setMediaViewerDialogUrl(false))
  const testStateClose = controls(testStateSome, closeMediaViewerDialog())

  expect(testStateSome.get('media-viewer-dialog-url')).toEqual('Some')
  expect(testStateFalse.get('media-viewer-dialog-url')).toEqual(false)
  expect(testStateClose.get('media-viewer-dialog-url')).toEqual(false)
})

it('toggle media editor dialog', () => {
  const initialState = Map({ 'media-editor-dialog-item': false})
  const anItem = {name: 'aname'}
  const testStateSome = controls(initialState, setMediaEditorDialogItem(anItem))
  const testStateFalse = controls(testStateSome, setMediaEditorDialogItem(false))
  const testStateClose = controls(testStateSome, closeMediaEditorDialog())

  expect(testStateSome.get('media-editor-dialog-item')).toEqual(anItem)
  expect(testStateFalse.get('media-editor-dialog-item')).toEqual(false)
  expect(testStateClose.get('media-editor-dialog-item')).toEqual(false)
})
