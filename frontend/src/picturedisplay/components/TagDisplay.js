import React from 'react'
import List from 'material-ui/List'
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip'

const Tag = ( {onTagClick, name} ) => {
  const style = {
    margin: 4
  }
  return (
    <Chip style={style} onClick={onTagClick}>
      {name}
    </Chip>
  )
}

export default ({ tags, onTagClick, title }) => {
  const style = {
    list: {
      align: 'center',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  }
  return (
    <List style={style.list}>
      <Subheader>{title}</Subheader>
      {Object.values(tags).map(function (tag) {
         return (
           <Tag key={tag.id}
             onTagClick={() => onTagClick(tag.id)}
             name={tag.name} />
         )
       })}
    </List>
  )
}
