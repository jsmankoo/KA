import React, {createClass} from 'react';
import MediaQuery from 'react-responsive';

const Jumbotron = createClass({
  render() {
    const {src, IMGTablet, brand, poster} = this.props;
    return (
      <div className="Jumbotron">
        <MediaQuery maxDeviceWidth={1024}>
          <Mobile poster={IMGTablet} brand={brand}/>
        </MediaQuery>
        <MediaQuery minDeviceWidth={1025}>
          <Desktop src={src} poster={IMGTablet} brand={brand}/>
        </MediaQuery>
      </div>
    );
  }
});

const Desktop = ({src, poster, brand})=>{
  return (
    <div className="Desktop">
      <video className='BGVideo'
        preload="true"
        loop={true}
        autoPlay={true}
        overlay={true}
        poster={poster}>
          {
            src.map((item, index)=>(
              <source src={item} key={index}/>
            ))
          }
      </video>
      <div className="BGTint">
        <div className="Brand">
          <img src={brand} alt='brand image'/>
        </div>
      </div>
    </div>
  );
}

const Mobile = ({poster,brand})=>{
  return (
    <div className="Mobile">
      <div className="BGPic" style={{
          backgroundImage: `url(${poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <div className="BGTint">
          <div className="Brand">
            <img src={brand} alt='brand image'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;
