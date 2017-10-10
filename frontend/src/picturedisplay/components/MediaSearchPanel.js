import React from 'react';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import { white, primary, secondary } from '../../colors'
import FilteredTagDisplay from '../../picturedisplay/containers/FilteredTagDisplay'

export default class MediaSearchPanel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {open: false}
  }

  handleToggle = () => this.setState({open: !this.state.open})

  handleClose = () => this.setState({open: false})

  style = {
    drawer: {
      display: 'flex',
      flexDirection: 'column'
    },
    drawerContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    paper: {
      height: 300,
      width: 'calc(100% - 40px)',
      display: 'flex',
      flexDirection: 'column',
    }
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.handleToggle}>
          <ActionSearch color={white} />
        </IconButton>
        <Drawer
          style={this.style.drawer}
          docked={false}
          width={400}
          openSecondary={true}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <IconButton onClick={this.handleClose} >
            <NavigationClose />
          </IconButton>
          <div style={this.style.drawerContent}>
            <Paper style={this.style.paper} zDepth={2}>
              <FilteredTagDisplay
                field="selected"
                predicate={ (x) => !x.get("selected") }
                title="All Tags"
              />
              <Divider />
              <FilteredTagDisplay
                field="selected"
                predicate={ (x) => x.get("selected") }
                title="Selected Tags"
              />
            </Paper>
          </div>
        </Drawer>
      </div>
    );
  }
}
