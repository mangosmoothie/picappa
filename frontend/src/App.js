import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import MediaItem from './mediaitem/MediaItem';
import Gallery from './picturedisplay/containers/Gallery';
import MainAppBar from './appbar/components/MainAppBar.js'

const Home = () => {
  return (
    <Gallery url="/api/pictures" />
  );
}

const App = () => {
  return (
    <Router>
      <MuiThemeProvider>
        <div>
          <MainAppBar />
          <div className="App" >
            <Route exact path="/picappa" component={Home}/>
            <Route path="/mediaitem" component={MediaItem}/>
            <Route path="*" render={() => <Redirect to="/picappa"/>} />
          </div>
        </div>
      </MuiThemeProvider>
    </Router>

  );
}

export default App;
