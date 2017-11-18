import React from 'react'
import IconButton from 'material-ui/IconButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import { white } from '../../colors'
import './PictureDisplay.css'
import MediaViewerDialog from '../../mediadetails/components/MediaViewerDialog'

const Picture = ( {url} ) => {
  const style = {
    backgroundImage: "url('" + url + "')"
  }

  return (
    <a href="#" >
      <div className="picture" style={style} />
    </a>
  )
}

export default ( {pictures} ) => {
  return (
      <div className="grid" >
        {pictures.map( (p) => {
           return (
             <div key={p.get('id')}  className="container" >
               <Picture url={p.get('thumb_url')} />
               <div className="overlay">
                 <IconButton>
                   <ImageEdit color={white} />
                 </IconButton>
                 <MediaViewerDialog url={p.get('url')} />
                 <IconButton>
                   <FileDownload color={white} />
                 </IconButton>
               </div>
             </div>
           )
        })}
      </div>
  )
}
