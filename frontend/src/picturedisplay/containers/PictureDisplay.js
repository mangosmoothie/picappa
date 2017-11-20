import { connect } from 'react-redux'
import PictureDisplay from '../components/PictureDisplay'
import { getPictures } from '../selectors/pictures'
import { fetchPics } from '../actions/pictures'
import { getMediaViewerDialogUrl } from '../selectors/controls'
import { setMediaViewerDialogUrl } from '../actions/controls'

const mapStateToProps = (state) => {
  return {
    pictures: getPictures(state).valueSeq()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMediaViewerDialogUrl: (url) => {
      dispatch(setMediaViewerDialogUrl(url))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureDisplay)
