import React, {createClass} from 'react';
import Waypoint from 'react-waypoint';
import {Motion, spring, presets} from 'react-motion';
import marked from 'marked';

const Title = createClass({
  getInitialState(){
    return {
      TitleEnter: false
    };
  },
  render() {
    const {text, style} = this.props;
    const {TitleEnter} = this.state;
    return (
      <div className="Title" style={style}>
        <Motion style={{
          y: TitleEnter ? spring(0, {stiffness: 100, damping: 20}) : spring(50, {stiffness: 100, damping: 20}),
          fade: TitleEnter ? spring(1, {stiffness: 100, damping: 20}) : spring(0, {stiffness: 100, damping: 20})
        }}>
          {
            ({y, fade})=>(
              <div>
                <Waypoint
                    onEnter={()=>(this.setState({...this.state, TitleEnter: true}))}
                    onLeave={()=>(this.setState({...this.state, TitleEnter: false}))}
                  />
                <div className="Markdown"
                  style={{
                    transform: `translate(-50%, -${50-y}%)`,
                    opacity: fade
                  }}
                  dangerouslySetInnerHTML={{__html: marked(text)}}/>
              </div>
            )
          }
        </Motion>
      </div>
    );
  }
});

export default Title;
