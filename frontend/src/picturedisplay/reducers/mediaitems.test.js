import { Map, List } from 'immutable'
import mediaitems, { INITIAL_STATE } from './mediaitems'
import {
  addMediaTypeOption,
  addMediaStatusOption
} from '../actions/mediaitems'
import {
  newTypeOption1,
  newTypeOption2,
  newStatusOption1,
  newStatusOption2
} from '../mocks/mediaitems'

it('initial state', () => expect(INITIAL_STATE).toEqual(Map({
  'media-types': Map(),
  'media-statuses': Map()
})))

it('no action', () => expect(mediaitems(INITIAL_STATE, {type: null}))
   .toEqual(INITIAL_STATE))

it('add type option action', () => {
  const newState = mediaitems(INITIAL_STATE, addMediaTypeOption(newTypeOption1))
  expect(newState.get('media-types').size).toEqual(1)
  expect(newState.getIn(['media-types', newTypeOption1.media_type_cd])
         .get('media_type_cd')).toEqual(newTypeOption1.media_type_cd)

  const newState2 = mediaitems(newState, addMediaTypeOption(newTypeOption2))
  expect(newState2.get('media-types').size).toEqual(2)
  expect(newState2.getIn(['media-types', newTypeOption2.media_type_cd])
         .get('media_type_cd')).toEqual(newTypeOption2.media_type_cd)
})

it('add status option action', () => {
  const newState = mediaitems(INITIAL_STATE, addMediaStatusOption(newStatusOption1))
  expect(newState.get('media-statuses').size).toEqual(1)
  expect(newState.getIn(['media-statuses', newStatusOption1.status_cd])
         .get('status_cd')).toEqual(newStatusOption1.status_cd)

  const newState2 = mediaitems(newState, addMediaStatusOption(newStatusOption2))
  expect(newState2.get('media-statuses').size).toEqual(2)
  expect(newState2.getIn(['media-statuses', newStatusOption2.status_cd])
         .get('status_cd')).toEqual(newStatusOption2.status_cd)
})

it('add dupe type option action', () => {
  const newState = mediaitems(INITIAL_STATE, addMediaTypeOption(newTypeOption1))
  expect(newState.get('media-types').size).toEqual(1)
  const newState2 = mediaitems(INITIAL_STATE, addMediaTypeOption(newTypeOption1))
  expect(newState2.get('media-types').size).toEqual(1)
})

it('add dupe status option', () => {
  const newState = mediaitems(INITIAL_STATE, addMediaStatusOption(newStatusOption1))
  expect(newState.get('media-statuses').size).toEqual(1)
  const newState2 = mediaitems(INITIAL_STATE, addMediaStatusOption(newStatusOption1))
  expect(newState2.get('media-statuses').size).toEqual(1)
})
