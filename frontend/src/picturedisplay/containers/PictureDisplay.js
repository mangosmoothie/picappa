import { connect } from 'react-redux'
import PictureDisplay from '../components/PictureDisplay'
import { getPictures } from '../selectors/pictures'
import {
  setMediaViewerDialogUrl,
  setMediaEditorDialogItem,
} from '../actions/controls'

const mapStateToProps = (state) => {
  return {
    pictures: getPictures(state).valueSeq()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMediaViewerDialogUrl: (url) => {
      dispatch(setMediaViewerDialogUrl(url))
    },
    setMediaEditorDialogItem: (item) => {
      dispatch(setMediaEditorDialogItem(item))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureDisplay)
