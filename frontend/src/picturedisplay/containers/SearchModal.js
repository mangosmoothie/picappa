import { connect } from 'react-redux'
import SearchModal from '../components/SearchModal'
import { getShowSearchModal } from '../selectors/controls'
import { toggleShowSearchModal } from '../actions/controls'

const mapStateToProps = state => {
  return {
    showSearchModal: getShowSearchModal(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleShow: () => {
      dispatch(toggleShowSearchModal())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchModal)
