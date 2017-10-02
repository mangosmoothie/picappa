import React from 'react'
import FilteredTagDisplay from '../containers/FilteredTagDisplay'
import { Modal } from 'react-bootstrap'

export default ({ showSearchModal, toggleShow }) => {
  return (
    <div className="fa fa-lg fa-search-plus"
      style={{color: 'black'}}
      onClick={toggleShow}>
      <Modal show={showSearchModal} onHide={toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>My Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>something</p>
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
        </Modal.Body>
      </Modal>
    </div>
  )
}
