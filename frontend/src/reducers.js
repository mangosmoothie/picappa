import { combineReducers } from 'redux'
import tags from './picturedisplay/reducers/tags'
import pictures from './picturedisplay/reducers/pictures'

export default combineReducers({
  tags,
  pictures
})
