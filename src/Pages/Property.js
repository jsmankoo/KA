import React from 'react';
import {fromJS} from 'immutable';
import {Motion, spring, presets} from 'react-motion';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';

import Title from '../Components/Title';
import PropertyInfo from '../Components/PropertyInfo';
import Contact from '../Components/ContactMini';

const Property = React.createClass({
  getInitialState(){
    return {
      data: fromJS({}),
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
  },
  render(){
    const {routeParams} = this.props;
    const {data, loaded} = this.state;
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
            <SlideShow height={440}>
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
            </SlideShow>
          </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={768}>
          <div className="Tablet">
            <SlideShow height={730}>
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
            </SlideShow>
          </div>
        </MediaQuery>
        <Title
          text={`<a target="_blank" href="${data.getIn(['property.Map', 'value', 'url'])}"><i class="btr bt-map-pin"></i></a>\n # ${data.getIn(['property.Address', 'value'])}\n ##### ${data.getIn(['property.City', 'value'])}`} />
        <PropertyInfo
            Paragraph={data.getIn(['property.Markdown', 'value'])}
            KeyValue={data.getIn(['property.KeyValue', 'value']).toJS()}
          />
        <Contact
            
          />
      </div>
    );
  }
});

const SlideShow = React.createClass({
  getInitialState(){
    return {
      slideIndex: 0
    };
  },
  componentDidMount(){
    this.autoPlay = setInterval(()=>{
      const {children} = this.props;
      const {slideIndex} = this.state;
      this.setState({
        slideIndex: (slideIndex + 1) % children.length
      })
    },5000);
  },
  componentWillUnmount(){
    clearInterval(this.autoPlay);
  },
  setSlide(index){
    return ()=>{
      this.setState({
        slideIndex: index
      })
    };
  },
  PrevSlide(){
    const {children, height} = this.props;
    const {slideIndex} = this.state;
    return ()=>{
      this.setState({
        slideIndex: (slideIndex - 1) % children.length < 0 ? 0 : (slideIndex - 1) % children.length
      })
    };
  },
  NextSlide(){
    const {children, height} = this.props;
    const {slideIndex} = this.state;
    return ()=>{
      this.setState({
        slideIndex: (slideIndex + 1) % children.length
      })
    };
  },
  render(){
    const {children, height} = this.props;
    const {slideIndex} = this.state;
    return (
      <div className='SlideShow' style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: height
      }}>
        <div className="PrevSlide">
          <i className='btr bt-angle-left' onClick={this.PrevSlide()}/>
        </div>
        <div className="NextSlide">
          <i className='btr bt-angle-right' onClick={this.NextSlide()}/>
        </div>
        <div className="Navigation">
          {
            children.map((child, index)=>(
              <i key={index} className={`fa fa-circle ${slideIndex === index ? 'active' : ''}`} onClick={this.setSlide(index)}/>
            ))
          }
        </div>
        <div className="Slides" style={{
          whiteSpace: 'nowrap',
          height: height
        }}>
          {
            children.map((child, index)=>(
              <Motion key={index} style={{
                transform: spring((index-slideIndex)*100, presets.gentle)
              }}>
                {
                  ({transform})=>(
                    <div className="Slide" style={{
                      transform: `translate(${transform}%, 0%)`,
                      width: '100%',
                      height: height,
                      position: 'absolute'
                    }}>
                      {child}
                    </div>
                  )
                }
              </Motion>
            ))
          }
        </div>
      </div>
    );
  }
});

export default Property;
