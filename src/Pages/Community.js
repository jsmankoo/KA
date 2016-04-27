import React, {createClass} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

import TitleJumbotron from '../Components/TitleJumbotron';
import Vibe from '../Components/Vibe';

const Community = createClass({
  componentDidMount(){
    const {routeParams, Communities, initCommunity} = this.props;
    initCommunity(routeParams.uid);
  },
  render() {
    const {routeParams, Communities, initCommunity} = this.props;
    if(!Communities.loaded) return <div />;
    const Community = Communities.data.filter(({uid})=>(uid === routeParams.uid));
    if(Community.length === 0) return <div />;
    const {data} = Community[0];
    console.log(data);
    return (
      <div className="Community" style={{position: `relative`, zIndex:1}}>
        <Helmet
          title={data['community.Title'].value}
          meta={[
            {name:'description', content: data['community.Description'].value}
          ]}
        />
        <TitleJumbotron
            title={data['community.Name'].value}
            poster={data['community.Jumbotron'].value.main.url}
          />
        {
          data['community.Categories'].value.map(({Markdown, Name, Pic1, Pic2, Pic3}, index)=>(
            <Vibe
                title={Name.value}
                link={{
                  value: `/properties/${routeParams.uid}`,
                  label: `${data['community.Name'].value} Homes`
                }}
                markdown={Markdown.value}
                Pic1={Pic1.value.main.url}
                Pic2={Pic2 ? Pic2.value.main.url : null}
                Pic3={Pic3 ? Pic3.value.main.url : null}
                key={index}
              />
          ))
        }
      </div>
    );
  }
});

const mapStateToProps = ({Communities})=>{
  return Communities.toJS();
};

const mapDispatchToProps = (dispatch)=>{
  return {
    initCommunity(value){
      return dispatch({
        type: 'COMMUNITIES_CHANGE_COMMUNITY',
        value: value
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Community);
