import React from 'react';
import FilteredTagDisplay from '../containers/FilteredTagDisplay'

const PictureDisplay = () => {
  return (
      <div>
        <FilteredTagDisplay
          field="selected"
          predicate={ (x) => !x.selected }
        />
      </div>
  )
}

export default PictureDisplay
