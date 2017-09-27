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
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/mediaitem">Media Item</Link></li>
        </ul>

        <hr/>

        <Route exact path="/" component={Home}/>
        <Route path="/mediaitem" component={MediaItem}/>
      </div>
    </Router>

  );
}

export default App;
