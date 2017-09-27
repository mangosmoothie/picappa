import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

const Picture = ( {url} ) => {
  return (
    <a href="#" >
      <img src={url} className="img-fluid" />
    </a>
  )
}

export default ( {pictures} ) => {
  return (
    <Grid>
      <Row>
        {pictures.map( (p) => {
           return (
             <Col sm={4} md={3} >
               <Picture key={p.get('id')} url={p.get('url')} />
             </Col>
           )
        })}
      </Row>
    </Grid>
  )
}
