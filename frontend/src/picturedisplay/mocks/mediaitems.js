import mediaitems, { INITIAL_STATE } from '../reducers/mediaitems'
import {
  addMediaStatusOption,
  addMediaTypeOption
} from '../actions/mediaitems'

export const newTypeOption1 = {media_type_cd: 100, name: 'picture'}
export const newTypeOption2 = {media_type_cd: 200, name: 'thumbnail'}
export const newStatusOption1 = {status_cd: 100, name: 'new'}
export const newStatusOption2 = {status_cd: 150, name: 'new_bulk'}

export const selectionsAddedState =
  [newTypeOption1, newTypeOption2, newStatusOption1, newStatusOption2]
  .reduce((acc, n) => {
    if (n.hasOwnProperty('status_cd')){
      return mediaitems(acc, addMediaStatusOption(n))
    } else {
      return mediaitems(acc, addMediaTypeOption(n))
    }
  }, INITIAL_STATE)

export const stateWithSelections = {mediaitems: selectionsAddedState}
