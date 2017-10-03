import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import MediaItem from './mediaitem/MediaItem';
import Gallery from './picturedisplay/containers/Gallery';

const Home = () => {
  return (
    <Gallery url="/api/pictures" />
  );
}

const App = () => {
  return (
    <Router>
      <MuiThemeProvider>
        <div className="topNavContainer">
          <nav className="p-2 topNav">
            <div className="d-flex">
              <NavLink to="/gallery" className="p-1 top-nav-button"
                activeStyle={{ color: '#ffff00'}}>Home</NavLink>
              <NavLink to='/gallery' className="p-1 top-nav-button">Gallery</NavLink>
              <NavLink to="/mediaitem" activeClassName="active" className="ml-auto">
                <div className="fa fa-2x fa-child" style={{color: 'black'}} />
              </NavLink>
            </div>
          </nav>
          <div className="p-1 topNavAccent" />
        </div>
        <div className="App" >
          <div className="flex-column">
            <div className="flex-row">
              <Route exact path="/" render={() => <Redirect to="/gallery"/>} />
            </div>
            <div className="flex-row">
              <Route exact path="/gallery" component={Home}/>
            </div>
            <div className="flex-row">
              <Route path="/mediaitem" component={MediaItem}/>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    </Router>

  );
}

export default App;
