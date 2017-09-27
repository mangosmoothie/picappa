import { combineReducers } from 'redux'
import tags from './picturedisplay/reducers/tags'
import pictures, {startAt, limit} from './picturedisplay/reducers/pictures'

export default combineReducers({
  tags,
  pictures,
  startAt,
  limit
})
