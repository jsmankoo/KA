import React from 'react';

const ContactMini = React.createClass({
  render(){
    return (
      <div className='ContactMini'>
        <div className="Wrapper">
          <div className="Row">
            <div className="Pic">
              <img src="" />
            </div>
            <div className="Details">
              <h5>K A</h5>
              <h4>123 456 7890</h4>
              <i className='btr ba-envelope'> EMAIL</i>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default ContactMini;
