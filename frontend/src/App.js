import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
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
      <div className="App" >
        <div className="flex-column">
          <div className="flex-row">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/mediaitem">Media Item</Link></li>
            </ul>

          </div>
          <div className="flex-row">
            <Route exact path="/" component={Home}/>
          </div>
          <div className="flex-row">
            <Route path="/mediaitem" component={MediaItem}/>
          </div>
        </div>
      </div>
    </Router>

  );
}

export default App;
