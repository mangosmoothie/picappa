import { Map } from 'immutable'
import tags, { INITIAL_STATE } from '../reducers/tags'
import {
  addTag
} from '../actions/tags'
import {
  getTags
} from '../selectors/tags'

export const newTagJson = {id: 1, name: 'new tag json'}
export const newTagJson2 = {id: 2, name: 'new tag json2', selected: true}
export const tagAddedState = tags(INITIAL_STATE, addTag(newTagJson))
export const tagsAddedState = tags(tagAddedState, addTag(newTagJson2))

export const stateWithTags = {tags: tagsAddedState}
