import React from 'react';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import { white, primary, secondary } from '../../colors'
import FilteredTagDisplay from '../../picturedisplay/containers/FilteredTagDisplay'

export default class MediaSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <IconButton onClick={this.handleToggle} >
          <ActionSearch color={white} />
        </IconButton>
        <Drawer
          docked={false}
          width={400}
          openSecondary={true}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <IconButton onClick={this.handleClose} >
            <NavigationClose />
          </IconButton>
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
        </Drawer>
      </div>
    );
  }
}
