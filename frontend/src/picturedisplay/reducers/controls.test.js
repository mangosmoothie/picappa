import { Map } from 'immutable'
import controls, * as cut from './controls'
import {
  toggleShowMediaSearchPanel
} from '../actions/controls'

it('initial state', () => {
  const showSearchPanel = cut.INITIAL_STATE.get('show-media-search-panel')
  expect(showSearchPanel).toEqual(false)
})

it('toggle show search modal', () => {
  const initialState = Map({ 'show-media-search-panel': false})
  const testStateTrue = controls(initialState, toggleShowMediaSearchPanel())
  const testStateFalse = controls(testStateTrue, toggleShowMediaSearchPanel())

  expect(testStateTrue.get('show-media-search-panel')).toEqual(true)
  expect(testStateFalse.get('show-media-search-panel')).toEqual(false)
})
