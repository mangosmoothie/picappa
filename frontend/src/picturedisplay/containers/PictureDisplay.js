import { connect } from 'react-redux'
import PictureDisplay from '../components/PictureDisplay'
import { addTag } from '../actions/tags'
import axios from 'axios'

export default connect()(PictureDisplay)
