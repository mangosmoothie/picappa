import pictures, { INITIAL_STATE } from '../reducers/pictures'
import { addPic } from '../actions/pictures'

export const newPicJson = {id: 1, tags: []}
export const newPicJson2 = {id: 2, tags: [1, 2]}
export const newPicJson3 = {id: 3, tags: [1]}

export const picAddedState = pictures(INITIAL_STATE, addPic(newPicJson))
const picAddedState2 = pictures(picAddedState, addPic(newPicJson2))
export const picsAddedState = pictures(picAddedState2, addPic(newPicJson3))
