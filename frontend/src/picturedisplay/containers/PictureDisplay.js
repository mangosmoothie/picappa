import { connect } from 'react-redux'
import PictureDisplay from '../components/PictureDisplay'
import { getPictures } from '../selectors/pictures'
import { fetchPics } from '../actions/pictures'

const mapStateToProps = (state) => {
  return {
    pictures: getPictures(state)
  }
}

const container = connect(
  mapStateToProps
)(PictureDisplay)

export default container
