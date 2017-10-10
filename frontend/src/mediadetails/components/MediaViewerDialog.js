import React from 'react'
import IconButton from 'material-ui/IconButton'
import ImageImage from 'material-ui/svg-icons/image/image'
import Dialog from 'material-ui/Dialog'
import { white } from '../../colors'

const styles = {
  container: {
    display: 'flex',
    displayDirection: 'column'
  }
}

export default class MediaViewerDialog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {open: false}
  }

  handleToggle = () => this.setState({open: !this.state.open})

  handleClose = () => this.setState({open: false})

  render() {
    return (
      <div>
        <IconButton onClick={this.handleToggle}>
          <ImageImage color={white} />
        </IconButton>

        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}

        >
          <div style={styles.container}>
            <IconButton onClick={this.handleClose} >
              <NavigationClose />
            </IconButton>

          </div>
        </Dialog>
      </div>
    );
  }
}
export default () => {
  return (
  )
}
