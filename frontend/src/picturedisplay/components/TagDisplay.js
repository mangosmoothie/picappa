import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap'

const Tag = ( {onTagClick, name} ) => {
  const style = {
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
    borderRadius: 0,
    marginLeft: 5
  };
  return (
    <Button
      bsStyle="success"
      onClick={onTagClick}
      style={style}
      >
      {name}
    </Button>
  )
}

export default ({ tags, onTagClick }) => {
  return (
    <ButtonToolbar>
      {tags.map(function (tag) {
         return (
           <Tag key={tag.get("id")}
             onTagClick={() => onTagClick(tag.get("id"))}
             name={tag.get("name")} />
         )
       })}
    </ButtonToolbar>
  )
}
