import React, {createClass} from 'react';
import MediaQuery from 'react-responsive';
import {Motion, spring} from 'react-motion';
import {Link} from 'react-router';
import {Map} from 'immutable';

import OwlCarousel from './OwlCarousel';

const Featured = createClass({
  render() {
    const options = {
        navigation : false, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        // autoPlay: 3000, //Set AutoPlay to 3 seconds
        itemsCustom : [[0,1],[768,2]]
    };
    const {children, name, slidesToShow, height, id, style, link} = this.props;
    return (
      <div className="Featured" style={style}>
        <div className="HeadWrapper">
          <div className="HeadSection">
            <MediaQuery maxDeviceWidth={767}>
              <div className="Mobile">
                <Link to={link}><h3>{name}</h3></Link>
              </div>
            </MediaQuery>
            <MediaQuery minDeviceWidth={768}>
              <div className="Tablet">
                <h3>{name}</h3>
                <Link to={link}>
                  <div className="all">
                    <div className="text">
                      ALL
                    </div>
                    <i className='fa fa-th' />
                  </div>
                </Link>
              </div>
            </MediaQuery>
          </div>
        </div>
        <MediaQuery maxDeviceWidth={767}>
          <OwlCarousel id={id} className='SlideShow' options={{
            autoPlay:false,
            navigation: false,
            singleItem: true
          }}>
            {
              children && children.map((child, index)=>(
                <div className={`item`} key={index}>
                  {child}
                </div>
              ))
            }
          </OwlCarousel>
        </MediaQuery>
        <MediaQuery minDeviceWidth={768}>
          <OwlCarousel id={id} className='SlideShow' options={{
            autoPlay:false,
            navigation: false,
            items: slidesToShow
          }}>
            {
              children && children.map((child, index)=>(
                <div className={`item`} key={index}>
                  {child}
                </div>
              ))
            }
          </OwlCarousel>
        </MediaQuery>
      </div>
    );
  }
});

export default Featured;
