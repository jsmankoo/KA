import React from 'react';
import {fromJS} from 'immutable';
import {Motion, spring, presets} from 'react-motion';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';

import OwlCarousel from '../Components/OwlCarousel';
import Title from '../Components/Title';
import PropertyInfo from '../Components/PropertyInfo';
import Contact from '../Components/ContactMini';

const Property = React.createClass({
  getInitialState(){
    return {
      data: fromJS({}),
      Profile: fromJS({}),
      ProfileLoaded: false,
      loaded: false
    };
  },
  componentDidMount(){
    const {routeParams} = this.props;
    Prismic.api('https://khristianavelar.prismic.io/api')
      .then((api)=>api.query(Prismic.Predicates.at('my.property.uid', routeParams.uid)))
      .then(({results})=>{
        console.log(results[0].data);
        this.setState({
          data: fromJS(results[0].data),
          loaded: true
        });
      });
    Prismic.api('https://khristianavelar.prismic.io/api')
      .then((api)=>api.query(Prismic.Predicates.at('my.home.uid', 'home')))
      .then(({results})=>{
        console.log(results[0].data);
        this.setState({...this.state,
          Profile: fromJS(results[0].data),
          ProfileLoaded: true
        });
      });
  },
  render(){
    const {routeParams} = this.props;
    const {data, loaded, Profile, ProfileLoaded} = this.state;
    if(!loaded) return <div />;
    return (
      <div className='Property'>
        <Helmet
          title={data.getIn(['property.Title', 'value'])}
          meta={[
            {name:'description', content: data.getIn(['property.Description', 'value'])}
          ]}
        />
        <MediaQuery maxDeviceWidth={767}>
          <div className="Mobile">
            <OwlCarousel id='jumbotron' options={{
              dots: true,
              autoPlay: false,
              singleItem: true
            }}>
              {
                data.getIn(['property.Photos', 'value']).toJS().map(({Photo, caption}, index)=>(
                  <div className="Photo" key={index}>
                    <div className="Pic" style={{
                      backgroundImage: `url('${Photo.value.main.url}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}>
                      <div className="Caption">
                        {caption.value}
                      </div>
                    </div>
                  </div>
                ))
              }
            </OwlCarousel>
          </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={768}>
          <div className="Tablet">
            <OwlCarousel id='jumbotron' options={{
              dots: true,
              autoPlay: false,
              singleItem: true
            }}>
              {
                data.getIn(['property.Photos', 'value']).toJS().map(({Photo, caption}, index)=>(
                  <div className="Photo" key={index}>
                    <div className="Pic" style={{
                      backgroundImage: `url('${Photo.value.main.url}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}>
                      <div className="Caption">
                        {caption.value}
                      </div>
                    </div>
                  </div>
                ))
              }
            </OwlCarousel>
          </div>
        </MediaQuery>
        <Title
          text={`<a target="_blank" href="${data.getIn(['property.Map', 'value', 'url'])}"><i class="btr bt-map-pin"></i></a>\n # ${data.getIn(['property.Address', 'value'])}\n ##### ${data.getIn(['property.City', 'value'])}`} />
        <PropertyInfo
            Paragraph={data.getIn(['property.Markdown', 'value'])}
            KeyValue={data.getIn(['property.KeyValue', 'value']).toJS()}
          />
        {
          !ProfileLoaded ? <div /> :
          <Contact
            pic={Profile.getIn(['home.MobilePic', 'value', 'main', 'url'])}
            name={Profile.getIn(['home.Name', 'value'])}
            cell={Profile.getIn(['home.Cell', 'value'])}
            email={Profile.getIn(['home.Email', 'value'])}
            />
        }
      </div>
    );
  }
});

export default Property;
