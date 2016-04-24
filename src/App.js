import React, {createClass} from 'react';
import {Motion, spring} from 'react-motion';

import Nav from './Components/Nav';
import Foot from './Components/Foot';

const App = createClass({
  render() {
    const {children} = this.props;
    return (
      <div className="App">
        <Nav />
        <Motion defaultStyle={{x: 0}} style={{x: spring(1, {stiffness: 120, damping: 40})}}>
          {
            (style)=>(
              <div style={{
                opacity: style.x
              }}>
                {children}
              </div>
            )
          }
        </Motion>
        <Foot
          logo='/media/poster.jpg'
          copyright='copyright'
          developer='developer'/>
      </div>
    );
  }
});

export default App;
