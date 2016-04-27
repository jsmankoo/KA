import React from 'react';
import {Link} from 'react-router';
import Waypoint from 'react-waypoint';
import {Motion, spring, presets} from 'react-motion';

const ContactMini = React.createClass({
  getInitialState(){
    return {
      waypoint: false
    };
  },
  toggleWaypoint(){
    const {waypoint} = this.state;
    this.setState({
      waypoint: !waypoint
    });
  },
  render(){
    const {pic, name, cell, email} = this.props;
    const {waypoint} = this.state;
    return (
      <div className='ContactMini'>
        <div className="Wrapper">
          <Motion style={{
            y: waypoint ? spring(0, {stiffness: 100, damping: 20}) : spring(50, {stiffness: 100, damping: 20}),
            fade: waypoint ? spring(1, {stiffness: 100, damping: 20}) : spring(0, {stiffness: 100, damping: 20})
          }}>
            {
              ({y, fade}, index)=>(
                <div className="Row" style={{
                  transform: `translate(-50%, -${50-y}%)`,
                  opacity: fade
                }}>
                  <Link to='/contact' className="Pic">
                    <img src={pic} />
                  </Link>
                  <Waypoint
                    onEnter={this.toggleWaypoint}
                    onLeave={this.toggleWaypoint}/>
                  <div className="Details">
                    <Link to='/contact' className='Name'>
                      <h5>{name}</h5>
                    </Link>
                    <a href={`tel:${cell}`} className='Cell'>
                      <h4>{cell}</h4>
                    </a>
                    <a href={`mailto:${email}`} className='Email'>
                      <i className='btr bt-envelope'></i>
                      <h5>{email}</h5>
                    </a>
                  </div>
                </div>
              )
            }
          </Motion>
        </div>
      </div>
    );
  }
});

export default ContactMini;
