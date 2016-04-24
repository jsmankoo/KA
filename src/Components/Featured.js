import React, {createClass} from 'react';
import MediaQuery from 'react-responsive';
import {Motion, spring} from 'react-motion';
import {Link} from 'react-router';
import {Map} from 'immutable';

const Featured = createClass({
  getInitialState(){
    return {
      slideIndex: 0
    };
  },
  componentDidMount(){
    const {autoPlay, children, slidesToShow} = this.props;
    if(autoPlay){
      this.autoPlay = setInterval(()=>{
        const {slideIndex} = this.state;
        const length = this.props.children.size;
        // console.log(length);
        this.setState({
          slideIndex: (slideIndex + 1) % (length - slidesToShow + 1)
        });
      }, 5000);
    }
  },
  componentWillUnmount(){
    clearInterval(this.autoPlay);
  },
  render() {
    const options = {
        navigation : false, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        // autoPlay: 3000, //Set AutoPlay to 3 seconds
        itemsCustom : [[0,1],[768,2]]
    };
    const {children, name, slidesToShow, height, id, style} = this.props;
    const {slideIndex} = this.state;
    return (
      <div className="Featured" style={style}>
        <div className="HeadWrapper">
          <div className="HeadSection">
            <MediaQuery maxDeviceWidth={767}>
              <div className="Mobile">
                <Link to='/featured'><h3>{name}</h3></Link>
              </div>
            </MediaQuery>
            <MediaQuery minDeviceWidth={768}>
              <div className="Tablet">
                <h3>{name}</h3>
                <div className="Navigation">
                  {
                    children && children.slice(slidesToShow - 1).map((child, index)=>(
                      <i className={`fa fa-circle ${index === slideIndex ? 'active' : ''}`} key={index}
                        onClick={
                          ()=>(
                            this.setState({
                              slideIndex: index
                            })
                          )
                        }/>
                    ))
                  }
                </div>
                <Link to='/featured'>
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
          <div className="Navigation Mobile">
            {
              children && children.map((child, index)=>(
                <i className={`fa fa-circle ${index === slideIndex ? 'active' : ''}`} key={index}
                  onClick={
                    ()=>(
                      this.setState({
                        slideIndex: index
                      })
                    )
                  }/>
              ))
            }
          </div>
          <div id={id} className="SlideShow" style={{
            width: '100%',
            whiteSpace: 'nowrap'
          }}>
            {
              children && children.map((child, index)=>(
                <Motion key={index} style={{
                  tranform: spring((index - slideIndex)*100, {stiffness: 80, damping: 18})
                }}>
                  {
                    ({tranform})=>(
                      <div className={`Item`} style={{
                        width: `${100}%`,
                        transform: `translate(${tranform}%, 0%)`,
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
        </MediaQuery>
        <MediaQuery minDeviceWidth={768}>
          <div id={id} className="SlideShow" style={{
            whiteSpace: 'nowrap',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {
              children && children.map((child, index)=>(
                <Motion key={index} style={{
                  tranform: spring((index - slideIndex)*100, {stiffness: 80, damping: 18})
                }}>
                  {
                    ({tranform})=>(
                      <div className={`Item`} style={{
                        width: `${100/slidesToShow}%`,
                        transform: `translate(${tranform}%, 0%)`,
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
        </MediaQuery>
      </div>
    );
  }
});

export default Featured;
