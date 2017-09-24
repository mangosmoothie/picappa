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
      bsStyle="info"
      onClick={onTagClick}
      style={style} >
      {name}
    </Button>
  )
}

export default ({ tags, onTagClick, title }) => {
  const legendbottom = {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "#e5e5e5",
    fontSize: "1rem"
  }
  const fieldsetmargin = {
    marginBottom: 10
  }
  return (
    <fieldset style={fieldsetmargin}>
      <legend style={legendbottom}>{title}</legend>
      {tags.map(function (tag) {
         return (
           <Tag key={tag.get("id")}
             onTagClick={() => onTagClick(tag.get("id"))}
             name={tag.get("name")} />
         )
       })}
    </fieldset>
  )
}
