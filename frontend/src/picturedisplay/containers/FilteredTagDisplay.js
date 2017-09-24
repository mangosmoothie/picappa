import { connect } from 'react-redux'
import TagDisplay from '../components/TagDisplay'
import { makeGetFilteredTags } from '../selectors/tags'
import { toggleTagField } from '../actions/tags'

const makeMapStateToProps = () => {
  const getFilteredTags = makeGetFilteredTags()
  const mapStateToProps = (state, props) => {
    return {
      tags: getFilteredTags(state, props)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onTagClick: (id) => dispatch(toggleTagField(id, props.field))
  }
}

const FilteredTagDisplay = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(TagDisplay)

export default FilteredTagDisplay
