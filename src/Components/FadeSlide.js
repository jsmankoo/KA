import React, {createClass} from 'react';
import {Motion, spring, presets} from 'react-motion';

const FadeSlide = createClass({
  getInitialState(){
    return {
      slideIndex: 0
    };
  },
  componentDidMount(){
    const {autoPlay, children} = this.props;
    //hookup setInterval to this.autoplay to turn it off
    this.autoPlay = setInterval(()=>{
      const {slideIndex} = this.state;
      this.setState({
        slideIndex: (slideIndex + 1) % children.size
      });

    }, 5000);
  },
  componentWillUnmount(){
    const {autoPlay, children} = this.props;
    //turn off autoplay
    clearInterval(this.autoPlay);
  },
  render() {
    const {children, style, id} = this.props;
    const {slideIndex} = this.state;
    return (
      <div className="FadeSlide" id={id} style={{...style,
        position: 'relative'
      }}>
        {
          children && children.map((child, index)=>(
            <Motion key={index} style={{
              opacity: index === slideIndex ? spring(1, {stiffness: 50, damping: 20}) : spring(0, {stiffness: 50, damping: 20})
            }}>
              {
                ({opacity})=>(
                  <div className="Item" style={{
                    opacity: opacity,
                    position: 'absolute',
                    width: '100%'
                  }}>
                    {child}
                  </div>
                )
              }
            </Motion>
          ))
        }
      </div>
    );
  }
});

export default FadeSlide;
