import { Map, List } from 'immutable'
import tags, { INITIAL_STATE } from './tags'
import {
  addTag,
  toggleTagField
} from '../actions/tags'
import {
  newTagJson,
  newTagJson2,
  tagAddedState
} from '../mocks/tags'

it('initial state', () => expect(INITIAL_STATE).toEqual(Map()))

it('no action', () => expect(tags(INITIAL_STATE, {type: null})).toEqual(INITIAL_STATE))

it('add tag action', () => {
  expect(tagAddedState.size).toEqual(1)
  expect(tagAddedState.first().get('id')).toEqual(newTagJson.id)
  expect(tagAddedState.first().get('name')).toEqual(newTagJson.name)

  const newState = tags(tagAddedState, addTag(newTagJson2))
  expect(newState.size).toEqual(2)
  expect(newState.first().get('id')).toEqual(newTagJson.id)
  expect(newState.first().get('name')).toEqual(newTagJson.name)

  expect(newState.last().get('id')).toEqual(newTagJson2.id)
  expect(newState.last().get('name')).toEqual(newTagJson2.name)
  expect(newState.last().get('selected')).toEqual(newTagJson2.selected)
})

it('add dupe tag action', () => {
  expect(tagAddedState.size).toEqual(1)

  const newState = tags(tagAddedState, addTag(newTagJson))
  expect(newState.size).toEqual(1)
})

it('toggle tag action', () => {
  expect(tagAddedState.first().get('selected')).toEqual(false)
  expect(tagAddedState.first().get('id')).toEqual(1)

  const newState = tags(tagAddedState, toggleTagField(1, 'selected'))
  expect(newState.first().get('selected')).toEqual(true)
  expect(newState.first().get('id')).toEqual(1)

  const newState2 = tags(newState, toggleTagField(1, 'selected'))
  expect(newState2.first().get('selected')).toEqual(false)
  expect(newState2.first().get('id')).toEqual(1)
})
