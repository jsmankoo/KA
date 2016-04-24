import React, {createClass} from 'react';
import MediaQuery from 'react-responsive';

const Foot = createClass({
  render() {
    const {logo, copyright, developer} = this.props;
    return (
      <div className="FootWrapper">
        <div className="Foot">
          <div className="Logo">
            <img src={logo} />
          </div>
          <div className="Copyright">
            {copyright}
          </div>
          <div className="Developer">
            {developer}
          </div>
        </div>
      </div>
    );
  }
});

export default Foot;
