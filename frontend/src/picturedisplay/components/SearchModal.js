import React from 'react'
import FilteredTagDisplay from '../containers/FilteredTagDisplay'

export default ({ showSearchModal, toggleShow }) => {
  return (
    <div>
      <button type="button" className="fa fa-lg fa-search-plus"
        style={{color: 'black'}} />
      <div >
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
    </div>
  )
}
