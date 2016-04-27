import React, {createClass} from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App';
// Pages
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Properties from './Pages/Properties';
import Property from './Pages/Property';
import Communities from './Pages/Communities';
import Community from './Pages/Community';

const Routes = createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/properties/:uid" component={Properties} />
          <Route path="/property/:uid" component={Property} />
          <Route path="/communities" component={Communities}>
            <Route path="/communities/:uid" component={Community} />
          </Route>
        </Route>
      </Router>
    );
  }
});

export default Routes;
