import React, {createClass} from 'react';
import MediaQuery from 'react-responsive';
import {Map, fromJS} from 'immutable';
import Helmet from 'react-helmet';

import Title from '../Components/Title';
import ContactPanel from '../Components/ContactPanel';

const Contact = createClass({
  getInitialState(){
    return {
      data: Map()
    };
  },
  componentDidMount(){
    Prismic.api('https://khristianavelar.prismic.io/api')
      .then((api)=>api.query(Prismic.Predicates.at('my.contact.uid', 'contact')))
      .then(({results})=>{
        this.setState({
          data: fromJS(results[0].data)
        });
      });
  },
  render() {
    const {data} = this.state;
    console.log(data.toJS());
    return (
      <div className="Contact">
        <Helmet
          title={data.getIn(['contact.Title', 'value']) ? data.getIn(['contact.Title', 'value']) : ''}
          meta={[
            {
              name:'description',
              content: data.getIn(['contact.Description', 'value']) ? data.getIn(['contact.Description', 'value']) : ''
            }
          ]}/>
        <Title text={data.getIn(['contact.Heading', 'value']) ? data.getIn(['contact.Heading', 'value']) : ''}/>
        {
          data.getIn(['contact.Heading', 'value']) &&
          <ContactPanel
            Cell={{
              name: data.getIn(['contact.Mobile', 'value']),
              link: data.getIn(['contact.MobileLink', 'value', 'url'])
            }}
            Email={{
              name: data.getIn(['contact.Email', 'value']),
              link: data.getIn(['contact.EmailLink', 'value', 'url'])
            }}
            Address={{
              name: data.getIn(['contact.Address', 'value']),
              link: data.getIn(['contact.AddressLink', 'value', 'url'])
            }}
            SocialMedia={{
              facebook: data.getIn(['contact.Facebook', 'value', 'url']),
              twitter: data.getIn(['contact.Twitter', 'value', 'url']),
              instagram: data.getIn(['contact.Instagram', 'value', 'url'])
            }}/>
        }
        <div className="Office">
          <div className="HeadSection">
            <h3>OFFICE LOCATION</h3>
          </div>
          <div className="Content">
            <div className="Poster" style={{
              backgroundImage: `url('${data.getIn(['contact.Photo', 'value', 'main', 'url'])}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="Realty">
              <img src="img/brokerage-logo.jpg" />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Contact;
