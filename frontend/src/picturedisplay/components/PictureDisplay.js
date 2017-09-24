import React from 'react';
import FilteredTagDisplay from '../containers/FilteredTagDisplay'

const PictureDisplay = () => {
  return (
      <div>
        <FilteredTagDisplay
          field="selected"
          predicate={ (x) => !x.get("selected") }
          title="All Tags"
        />
        <FilteredTagDisplay
          field="selected"
          predicate={ (x) => x.get("selected") }
          title="Selected Tags"
        />
      </div>
  )
}

export default PictureDisplay
