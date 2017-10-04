import { combineReducers } from 'redux'
import tags from './picturedisplay/reducers/tags'
import pictures, {startAt, limit} from './picturedisplay/reducers/pictures'
import controls from './picturedisplay/reducers/controls'

export default combineReducers({
  tags,
  pictures,
  startAt,
  limit,
  controls
})
