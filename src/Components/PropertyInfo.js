import React, {createClass} from 'react';
import marked from 'marked';
import {Link} from 'react-router';

const PropertyInfo = createClass({
  render(){
    const {Paragraph, KeyValue} = this.props;
    return (
      <div className='PropertyInfo'>
        <div className="Wrapper">
          <div className="Info">
            <div className="Price">
              <h6>Price</h6>
              <h3>$750,000</h3>
            </div>
            <div className="Bed">
              <h6>Bedrooms</h6>
              <h3>3</h3>
            </div>
            <div className="Bath">
              <h6>Bathrooms</h6>
              <h3>2</h3>
            </div>
            <div className="Area">
              <h6>Approx. Sq.Ft.</h6>
              <h3>1,456</h3>
            </div>
            <div className="Status">
              <h6>Status</h6>
              <h3>Just Listed</h3>
            </div>
          </div>
          <div className="Paragraph" dangerouslySetInnerHTML={{__html: marked(Paragraph)}}/>
          <div className="KeyValues">
            {
              KeyValue.map(({Key, Value, Link:link}, index)=>{
                if(link){
                  if(link.type === 'Link.web'){
                    return (
                      <div className="KV" key={index}>
                        <p>
                          <strong>{Key.value}:</strong>
                          <a target='_blank' href={link.value.url}>{Value.value}</a>
                        </p>
                      </div>
                    );
                  }else if(link.type === 'Link.document'){
                    switch (link.value.document.type) {
                      case 'about':
                        return (
                          <div className="KV" key={index}>
                            <p>
                              <strong>{Key.value}:</strong>
                              <Link to='/about'>{Value.value}</Link>
                            </p>
                          </div>
                        );
                      case 'home':
                        return (
                          <div className="KV" key={index}>
                            <p>
                              <strong>{Key.value}:</strong>
                              <Link to='/'>{Value.value}</Link>
                            </p>
                          </div>
                        );
                      case 'contact':
                        return (
                          <div className="KV" key={index}>
                            <p>
                              <strong>{Key.value}:</strong>
                              <Link to='/contact'>{Value.value}</Link>
                            </p>
                          </div>
                        );
                      case 'community':
                        return (
                          <div className="KV" key={index}>
                            <p>
                              <strong>{Key.value}:</strong>
                              <Link to={`/communities/${link.value.document.uid}`}>{Value.value}</Link>
                            </p>
                          </div>
                        );
                      case 'about':
                        return (
                          <div className="KV" key={index}>
                            <p>
                              <strong>{Key.value}:</strong>
                              <Link to={`/properties/${link.value.document.uid}`}>{Value.value}</Link>
                            </p>
                          </div>
                        );
                      default:
                        return (
                          <div className="KV" key={index}>
                            <p><strong>{Key.value}:</strong> {Value.value}</p>
                          </div>
                        );
                    }
                  }
                }
                return (
                  <div className="KV" key={index}>
                    <p><strong>{Key.value}:</strong> {Value.value}</p>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
});

export default PropertyInfo;
