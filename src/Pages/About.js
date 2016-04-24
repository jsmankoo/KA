import React, {createClass} from 'react';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import marked from 'marked';
import {Map, fromJS} from 'immutable';

import Title from '../Components/Title';
import FadeSlide from '../Components/FadeSlide';

const About = createClass({
  getInitialState(){
    return {
      data: Map()
    };
  },
  componentDidMount(){
    Prismic.api('https://khristianavelar.prismic.io/api')
      .then((api)=>api.query(Prismic.Predicates.at('my.about.uid', 'about')))
      .then(({results})=>{
        this.setState({
          data: fromJS(results[0].data)
        });
      });
  },
  render() {
    const {data} = this.state;
    console.log(data.toJS());
    console.log(data.getIn(['about.SlideShow1', 'value']) &&
      data.getIn(['about.SlideShow1', 'value'])
        .concat(data.getIn(['about.SlideShow2', 'value']))
        .concat(data.getIn(['about.SlideShow3', 'value'])));
    const item = ['/img/1.jpeg', '/img/2.jpeg', '/img/3.jpeg', '/img/4.jpeg'];
    const h1 = '# "Another short testimonial would go in this space here"';
    const markdownText = 'As collected deficient objection by it discovery sincerity curiosity. Quiet decay who round three world whole has mrs man. Built the china there tried jokes which gay why. Assure in adieus wicket it is. But spoke round point and one joy. Offending her moonlight men sweetness see unwilling. Often of it tears whole oh balls share an. ';
    return (
      <div className="About">
        <Helmet
          title={data.getIn(['about.Title', 'value']) && data.getIn(['about.Title', 'value'])}
          meta={[
            {name:'description', content:data.getIn(['about.Description', 'value']) && data.getIn(['about.Description', 'value'])}
          ]}/>
        <MediaQuery maxDeviceWidth={767}>
          <div className="Mobile">
            <Title
              text={data.getIn(['about.Heading', 'value']) ? data.getIn(['about.Heading', 'value']) : ''} />
            <div className="SlideShows">
            {
              data.getIn(['about.SlideShow1', 'value']) &&
              <FadeSlide id='slide' speed={5000}>
                {
                    data.getIn(['about.SlideShow1', 'value'])
                      .concat(data.getIn(['about.SlideShow2', 'value']))
                      .concat(data.getIn(['about.SlideShow3', 'value'])).map((slide, index)=>(
                        <div className="Item" key={index}>
                          <img src={slide.getIn(['Photo', 'value', 'main','url'])} />
                        </div>
                      ))
                }
              </FadeSlide>
            }
            </div>
            <div className="Content">
              <div className="Paragraph">
                <div className="Markdown"
                  dangerouslySetInnerHTML={{
                    __html: marked(data.getIn(['about.Paragraphs', 'value']) ? data.getIn(['about.Paragraphs', 'value']) : '')}
                  } />
              </div>
              <div className="Testimonials">
                <div className="HeadSection">
                  <h3>TESTIMONAILS</h3>
                </div>
                <div className="Markdown"
                  dangerouslySetInnerHTML={{
                    __html: marked(data.getIn(['about.Testimonials', 'value']) ? data.getIn(['about.Testimonials', 'value']) : '')}
                  } />
              </div>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1024} minDeviceWidth={768}>
          <div className="Tablet">
            <Title
              text={data.getIn(['about.Heading', 'value']) ? data.getIn(['about.Heading', 'value']) : ''} />
            <div className="SlideShows">
              {
                data.getIn(['about.SlideShow1', 'value']) &&
                <FadeSlide id='slide1' speed={5000}>
                  {
                    data.getIn(['about.SlideShow1', 'value'])
                      .concat(data.getIn(['about.SlideShow2', 'value']))
                      .map((slide, index)=>(
                        <div className="Item" key={index}>
                          <img src={slide.getIn(['Photo', 'value', 'main','url'])} />
                        </div>
                      ))
                  }
                </FadeSlide>
              }
              {
                data.getIn(['about.SlideShow2', 'value']) &&
                <FadeSlide id='slide2' speed={5000}>
                  {
                    data.getIn(['about.SlideShow2', 'value'])
                      .concat(data.getIn(['about.SlideShow3', 'value']))
                      .map((slide, index)=>(
                        <div className="Item" key={index}>
                          <img src={slide.getIn(['Photo', 'value', 'main','url'])} />
                        </div>
                      ))
                  }
                </FadeSlide>
              }
            </div>
            <div className="Content">
              <div className="Paragraph">
                <div className="Markdown"
                  dangerouslySetInnerHTML={{
                    __html: marked(data.getIn(['about.Paragraphs', 'value']) ? data.getIn(['about.Paragraphs', 'value']) : '')}
                  } />
              </div>
              <div className="Testimonials">
                <div className="HeadSection">
                  <h3>TESTIMONAILS</h3>
                </div>
                <div className="Markdown"
                  dangerouslySetInnerHTML={{
                    __html: marked(data.getIn(['about.Testimonials', 'value']) ? data.getIn(['about.Testimonials', 'value']) : '')}
                  } />
              </div>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={1025}>
          <div className="Desktop">
            <Title
              text={data.getIn(['about.Heading', 'value']) ? data.getIn(['about.Heading', 'value']) : ''} />
            <div className="SlideShows">
              {
                data.getIn(['about.SlideShow1', 'value']) &&
                <FadeSlide id='slide1' speed={5000}>
                  {
                    data.getIn(['about.SlideShow1', 'value']).map((slide, index)=>(
                        <div className="Item" key={index}>
                          <img src={slide.getIn(['Photo', 'value', 'main','url'])} />
                        </div>
                      ))
                  }
                </FadeSlide>
              }
              {
                data.getIn(['about.SlideShow2', 'value']) &&
                <FadeSlide id='slide2' speed={5000}>
                  {
                    data.getIn(['about.SlideShow2', 'value']).map((slide, index)=>(
                        <div className="Item" key={index}>
                          <img src={slide.getIn(['Photo', 'value', 'main','url'])} />
                        </div>
                      ))
                  }
                </FadeSlide>
              }
              {
                data.getIn(['about.SlideShow3', 'value']) &&
                <FadeSlide id='slide3' speed={5000}>
                  {
                    data.getIn(['about.SlideShow3', 'value']).map((slide, index)=>(
                        <div className="Item" key={index}>
                          <img src={slide.getIn(['Photo', 'value', 'main','url'])} />
                        </div>
                      ))
                  }
                </FadeSlide>
              }
            </div>
            <div className="Content">
              <div className="Paragraph">
                <div className="Markdown"
                  dangerouslySetInnerHTML={{
                    __html: marked(data.getIn(['about.Paragraphs', 'value']) ? data.getIn(['about.Paragraphs', 'value']) : '')}
                  } />
              </div>
              <div className="Testimonials">
                <div className="HeadSection">
                  <h3>TESTIMONAILS</h3>
                </div>
                <div className="Markdown"
                  dangerouslySetInnerHTML={{
                    __html: marked(data.getIn(['about.Testimonials', 'value']) ? data.getIn(['about.Testimonials', 'value']) : '')}
                  } />
              </div>
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }
});

export default About;
