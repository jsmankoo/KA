import React, {createClass} from 'react';
import MediaQuery from 'react-responsive';

const ContactPanel = createClass({
  render() {
    const {Cell, Email, Address, SocialMedia} = this.props;
    return (
      <div className="ContactPanel">
        <MediaQuery maxDeviceWidth={767}>
          <Mobile {...this.props} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={768}>
          <Tablet {...this.props} />
        </MediaQuery>
      </div>
    );
  }
});

const Mobile = ({Cell, Email, Address, SocialMedia})=>(
  <div className="Mobile">
    <div className="HeadSection">
      <h3>CONTACT</h3>
    </div>
    <div className="Content">
      <div className="Cell">
        <a href={Cell.link}>{Cell.name}</a>
      </div>
      <div className="Email">
        <a href={Email.link}>
          <div className="Icon">
            <i className='btr bt-envelope' />
          </div>
          <div className="Text">
            {Email.name}
          </div>
        </a>
      </div>
      <div className="Address">
        <a href={Address.link}>{Address.name}</a>
      </div>
      <div className="SocialMediaWrapper">
        <div className="SocialMedia">
          <a href={SocialMedia.facebook}><i className='fab fab-facebook-alt' /></a>
          <a href={SocialMedia.twitter}><i className='fab fab-twitter' /></a>
          <a href={SocialMedia.instagram}><i className='fab fab-instagram' /></a>
        </div>
      </div>
    </div>
  </div>
);

const Tablet = ({Cell, Email, Address, SocialMedia})=>(
  <div className="Tablet">
    <div className="HeadSection">
      <h3>CONTACT</h3>
    </div>
    <div className="Content">
      <div className="Cell">
        <a href={Cell.link}>{Cell.name}</a>
      </div>
      <div className="Email">
        <a href={Email.link}>
          <div className="Icon">
            <i className='btr bt-envelope' />
          </div>
          <div className="Text">
            {Email.name}
          </div>
        </a>
      </div>
      <div className="Address">
        <a href={Address.link}>{Address.name}</a>
      </div>
      <div className="SocialMediaWrapper">
        <div className="SocialMedia">
          <a href={SocialMedia.facebook}><i className='fab fab-facebook-alt' /></a>
          <a href={SocialMedia.twitter}><i className='fab fab-twitter' /></a>
          <a href={SocialMedia.instagram}><i className='fab fab-instagram' /></a>
        </div>
      </div>
    </div>
  </div>
);


export default ContactPanel;
