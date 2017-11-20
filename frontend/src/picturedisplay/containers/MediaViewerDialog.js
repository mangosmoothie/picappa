import { connect } from 'react-redux'
import MediaViewerDialog from '../components/MediaViewerDialog'
import {
  getMediaViewerDialogUrl
} from '../selectors/controls'
import { closeMediaViewerDialog } from '../actions/controls'

const mapStateToProps = (state) => {
  return {
    url: getMediaViewerDialogUrl(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => {
      dispatch(closeMediaViewerDialog())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaViewerDialog)
