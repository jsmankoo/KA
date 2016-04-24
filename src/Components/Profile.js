import React, {createClass} from 'react';
import Waypoint from 'react-waypoint';
import MediaQuery from 'react-responsive';
import {Link} from 'react-router';
import {Motion, spring, presets} from 'react-motion';
import marked from 'marked';

const Profile = createClass({
  getInitialState(){
    return {
      TitleEnter: false
    };
  },
  render() {
    const {name, DesktopPic, MobilePic, paragraph, email, facebook, twitter, instagram, style} = this.props;
    const {TitleEnter} = this.state;
    return (
      <div className="Profile" style={style}>
        <MediaQuery maxDeviceWidth={767}>
          <div className="Mobile">
            <div className="HeadWrapper">
              <div className="HeadSection">
                <Link to='/contact'><h3>{name}</h3></Link>
              </div>
            </div>
            <div className="SocialMediaWrapper">
              <div className="SocialMedia">
                <a href={email} target='_blank'><i className='btr bt-envelope' /></a>
                <a href={facebook} target='_blank'><i className='fab fab-facebook-alt' /></a>
                <a href={twitter} target='_blank'><i className='fab fab-twitter' /></a>
                <a href={instagram} target='_blank'><i className='fab fab-instagram' /></a>
              </div>
            </div>
            <div className="Dude">
              <div className="Pic">
                <Motion style={{
                  y: TitleEnter ? spring(0, {stiffness: 100, damping: 40}) : spring(50, presets.gentle),
                  fade: TitleEnter ? spring(1, {stiffness: 100, damping: 40}) : spring(0, presets.gentle)
                }}>
                  {
                    ({y, fade})=>(
                      <img src={MobilePic} style={{
                        transform: `translate(0px, ${y}px)`,
                        opacity: fade
                      }}/>
                    )
                  }
                </Motion>
              </div>
              <Motion style={{
                y: TitleEnter ? spring(0, {stiffness: 100, damping: 40}) : spring(50, presets.gentle),
                fade: TitleEnter ? spring(1, {stiffness: 100, damping: 40}) : spring(0, presets.gentle)
              }}>
                {
                  ({y, fade})=>(
                    <div className="Paragraph" style={{
                      marginTop: y,
                      opacity: fade
                    }}>
                      <Waypoint
                          onEnter={()=>(this.setState({...this.state, TitleEnter: true}))}
                          onLeave={()=>(this.setState({...this.state, TitleEnter: false}))}
                        />
                      <div dangerouslySetInnerHTML={{__html: marked(paragraph) }}>
                      </div>
                    </div>
                  )
                }
              </Motion>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={768}>
          <div className="Tablet">
            <div className="HeadWrapper">
              <div className="HeadSection">
                <Link to='/contact'><h3>{name}</h3></Link>
                <div className="SocialMedia">
                  <a href={email} target='_blank'><i className='btr bt-envelope' /></a>
                  <a href={facebook} target='_blank'><i className='fab fab-facebook-alt' /></a>
                  <a href={twitter} target='_blank'><i className='fab fab-twitter' /></a>
                  <a href={instagram} target='_blank'><i className='fab fab-instagram' /></a>
                </div>
              </div>
            </div>
            <Waypoint
                onEnter={()=>(this.setState({...this.state, TitleEnter: true}))}
                onLeave={()=>(this.setState({...this.state, TitleEnter: false}))}
              />
            <div className="Dude">
              <div className="Pic">
                <Motion style={{
                  y: TitleEnter ? spring(0, {stiffness: 100, damping: 40}) : spring(50, presets.gentle),
                  fade: TitleEnter ? spring(1, {stiffness: 100, damping: 40}) : spring(0, presets.gentle)
                }}>
                  {
                    ({y, fade})=>(
                      <img src={DesktopPic} style={{
                        transform: `translate(0px, ${y}px)`,
                        opacity: fade
                      }}/>
                    )
                  }
                </Motion>
              </div>
              <Motion style={{
                y: TitleEnter ? spring(0, {stiffness: 100, damping: 40}) : spring(50, presets.gentle),
                fade: TitleEnter ? spring(1, {stiffness: 100, damping: 40}) : spring(0, presets.gentle)
              }}>
                {
                  ({y, fade})=>(
                    <div className="Paragraph" style={{
                      marginTop: y,
                      opacity: fade
                    }}>
                      <div dangerouslySetInnerHTML={{__html: marked(paragraph) }}>
                      </div>
                    </div>
                  )
                }
              </Motion>
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }
});

export default Profile;
