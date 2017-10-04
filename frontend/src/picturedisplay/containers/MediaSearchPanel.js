import { connect } from 'react-redux'
import MediaSearchPanel from '../components/MediaSearchPanel'
import { getShowMediaSearchPanel } from '../selectors/controls'
import { toggleShowMediaSearchPanel } from '../actions/controls'

const mapStateToProps = state => {
  return {
    showSearchPanel: getShowMediaSearchPanel(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleShow: () => {
      dispatch(toggleShowMediaSearchPanel())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaSearchPanel)
