import React, {createClass} from 'react';
import Helmet from 'react-helmet';
import {Motion, spring} from 'react-motion';
import Waypoint from 'react-waypoint';
import {Map, fromJS} from 'immutable';
import {Link} from 'react-router';

import Jumbotron from '../Components/Jumbotron';
import Title from '../Components/Title';
import Featured from '../Components/Featured';
import Profile from '../Components/Profile';

const Home = createClass({
  getInitialState(){
    return {
      data: Map()
    };
  },
  componentDidMount(){
    Prismic.api('https://khristianavelar.prismic.io/api')
      .then((api)=>api.query(Prismic.Predicates.at('my.home.uid', 'home')))
      .then(({results})=>{
        this.setState({
          data: fromJS(results[0].data)
        });
      });
  },
  render() {
    const {data} = this.state;
    return (
      <div className="Home">
        <Helmet
          title={data.getIn(['home.Title', 'value']) && data.getIn(['home.Title', 'value'])}
          meta={[
            {name:'description', content: data.getIn(['home.Description', 'value']) && data.getIn(['home.Description', 'value'])}
          ]}
        />
        <Jumbotron
          src={['/media/video.mp4', '/media/video.webm']}
          poster='/media/poster.jpg'
          brand='/media/poster.jpg'
          IMGTablet='/media/poster.jpg' />
        <div className="Content">
            <Title
              text={'# Some Title'} />
            <Featured
              name='FEATURED LISTINGS'
              slidesToShow={2}
              height={500}
              id='featured'
              autoPlay={false}>
              {
                data.getIn(['home.Featured','value']) && data.getIn(['home.Featured','value']).map(
                  (property, index)=>(
                    <Link to={`/property/${property.getIn(['Link', 'value', 'document', 'uid'])}`} className="item" key={index}>
                      <div className="Pic" style={{
                        backgroundImage: `url('${property.getIn(['Photo', 'value', 'main', 'url'])}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}>
                      </div>
                      <div className="Address">
                        {property.getIn(['Address', 'value'])}
                      </div>
                      <div className="Info">
                        <div className="Price">
                          ${property.getIn(['Price', 'value'])}
                        </div>
                        <div className="Bed">
                          {property.getIn(['Bed', 'value'])} Bed
                        </div>
                        <div className="Bath">
                          {property.getIn(['Bath', 'value'])} Bath
                        </div>
                      </div>
                    </Link>
                  )
                )
              }
            </Featured>
            <Profile
              name={data.getIn(['home.Name','value']) && data.getIn(['home.Name','value'])}
              DesktopPic={data.getIn(['home.DesktopPic','value','main','url']) && data.getIn(['home.DesktopPic','value','main','url'])}
              MobilePic={data.getIn(['home.MobilePic','value','main','url']) && data.getIn(['home.MobilePic','value','main','url'])}
              email={data.getIn(['home.Email', 'value', 'url']) && data.getIn(['home.Email', 'value', 'url'])}
              facebook={data.getIn(['home.Facebook', 'value', 'url']) && data.getIn(['home.Facebook', 'value', 'url'])}
              twitter={data.getIn(['home.Twitter', 'value', 'url']) && data.getIn(['home.Twitter', 'value', 'url'])}
              instagram={data.getIn(['home.Instagram', 'value', 'url']) && data.getIn(['home.Instagram', 'value', 'url'])}
              paragraph={data.getIn(['home.Markdown','value']) ? data.getIn(['home.Markdown','value']) : ''}
              style={{
                marginTop: 100
              }}/>
            <Featured
              name='EXPLORE NEIGHBORHOODS'
              slidesToShow={1}
              id='Communities'
              style={{
                marginTop: 150,
                marginBottom: 100
              }}
              autoPlay={false}>
              {
                data.getIn(['home.Communities','value']) && data.getIn(['home.Communities','value']).map(
                  (community, index)=>(
                    <div className="item" key={index}>
                      <div className="Pic" style={{
                        backgroundImage: `url('${community.getIn(['Photo', 'value', 'main', 'url'])}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}>
                        <div className="Community">
                          <h2 className="Name">
                            {community.getIn(['Name', 'value'])}
                          </h2>
                          <Link to={`/communities/${community.getIn(['Link', 'value', 'document', 'uid'])}`} className="Explore">
                            <div className="text">
                              EXPLORE
                            </div>
                            <i className='fa fa-binoculars' />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                )
              }
            </Featured>
        </div>
      </div>
    );
  }
});

export default Home;
