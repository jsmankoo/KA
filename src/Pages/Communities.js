import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {Motion, spring, presets} from 'react-motion';
import {fromJS} from 'immutable';
import Helmet from 'react-helmet';

const Communities = React.createClass({
  componentDidMount(){
    const {initCommunities} = this.props;
    Prismic.api('https://khristianavelar.prismic.io/api')
      .then((api)=>api.query(Prismic.Predicates.at('document.type', 'community')))
      .then(({results})=>{
        initCommunities(fromJS(results));
      });
  },
  render(){
    const {children, Communities, Community, toggleSelect, changeCommunity} = this.props;
    if(!Communities.loaded) return <div />;
    return (
      <div className='Communities'>
        <Helmet
          title='Communities'
          meta={[
            {name:'description', content: 'Communities description'}
          ]}
        />
        <div className='ExploreWrapper'>
          <div className='Explore'>
            <div className='ExploreText'>
              EXPLORE...
            </div>
            <div className='Select' onClick={toggleSelect}>
              <h5>{Community.name}</h5>
              <i className='btr bt-angle-down' />
            </div>
            <Motion style={{
              height: Community.open ? spring( (30*Communities.data.length), presets.gentle) : spring(0, presets.gentle),
              fade: Community.open ? spring(1, presets.gentle) : spring(1, presets.gentle)
            }}>
              {
                ({fade, height})=>(
                  <div className='SelectCommunity' style={{
                    opacity: fade,
                    height: height
                  }}>
                    {
                      Communities.data.map(({data, uid}, index)=>(
                        <Link
                            onClick={()=>{
                              toggleSelect(),
                              changeCommunity(data['community.Name'].value)
                            }}
                            to={`/Communities/${uid}`}
                            className='Community'
                            key={index}
                          >
                            <h5>{data['community.Name'].value}</h5>
                        </Link>
                      ))
                    }
                  </div>
                )
              }
            </Motion>
          </div>
        </div>
        <div className='CommunityWrapper'>
          {children}
        </div>
      </div>
    );
  }
});

const mapStateToProps = ({Communities})=>{
  // Communities returns {
  //   Communities:{
  //     data: [],
  //     loaded: false
  //   },
  //   Community:{
  //     'open':false,
  //     'name':'Select...'
  //   }
  // }
  return Communities.toJS();
};

const mapDispatchToProps = (dispatch)=>{
  return {
    initCommunities(data){
      return dispatch({
        type: 'COMMUNITIES_INIT',
        value: data
      });
    },
    toggleSelect(){
      return dispatch({
        type: 'COMMUNITIES_TOGGLE_SELECT'
      });
    },
    changeCommunity(name){
      return dispatch({
        type: 'COMMUNITIES_CHANGE_COMMUNITY',
        value: name
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Communities);
