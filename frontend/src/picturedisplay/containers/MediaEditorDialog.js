import { connect } from 'react-redux'
import MediaEditorDialog from '../components/MediaEditorDialog'
import {
  getMediaEditorDialogItem
} from '../selectors/controls'
import {
  getMediaStatuses,
  getMediaTypes
} from '../selectors/mediaitems'
import { closeMediaEditorDialog } from '../actions/controls'

const mapStateToProps = state => {
  return {
    item: getMediaEditorDialogItem(state),
    mediaTypes: getMediaTypes(state),
    mediaStatuses: getMediaStatuses(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => {
      dispatch(closeMediaEditorDialog())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaEditorDialog)
