import React from 'react';
import FilteredTagDisplay from '../containers/FilteredTagDisplay'
import PictureDisplay from '../containers/PictureDisplay'

const Gallery = () => {
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
        <PictureDisplay />
      </div>
  )
}

export default Gallery
