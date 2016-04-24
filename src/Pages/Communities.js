import React, {createClass} from 'react';
import {fromJS, Map} from 'immutable';
import {Motion, spring, presets} from 'react-motion';

const Communities = createClass({
  getInitialState(){
    return {
      data: Map()
    };
  },
  componentDidMount(){
    const {children, community} = this.props;
    this.setState({
      data: fromJS({
        Community: community ? community : 'Select ...',
        open: false,
        Communities: ['Soma', 'Somaa', 'Somaaa']
      })
    });
  },
  toggleCommunities(){
    const {data} = this.state;
    this.setState({
      data: data.updateIn(['open'], (open)=>(!open))
    });
  },
  setCommunity(community){
    return ()=>{
      const {data} = this.state;
      this.setState({
        data: data.updateIn(['open'], (open)=>(!open))
                .updateIn(['Community'], (Comm)=>(community))
      });
    };
  },
  render() {
    const {children, community} = this.props;
    const {data} = this.state;
    return (
      <div className="Communities">
        <div className="ExploreWrapper">
          <div className="Explore">
            <div className="Text">
              EXPLORE...
            </div>
            {
              data.getIn(['Community']) &&
              <div className="Select">
                <div className="Value" onClick={this.toggleCommunities}>
                  <div className="Text">
                    {data.getIn(['Community'])}
                  </div>
                  <i className={`btr bt-angle-${data.getIn(['open']) ? 'up' : 'down'}`} />
                </div>
                <Motion style={{
                  height: data.getIn(['open']) ? spring(120, presets.gentle) : spring(0, presets.gentle),
                  fade: data.getIn(['open']) ? spring(1, presets.gentle) : spring(0, presets.gentle)
                }}>
                  {
                    ({height, fade})=>(
                      <div className="List" style={{
                        height: height,
                        opacity: fade
                      }}>
                        {
                          data.getIn(['Communities']).map((Community, index)=>(
                            <div className="Value" key={index} onClick={this.toggleCommunities}>
                              <div className="Text">
                                {Community}
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </Motion>
              </div>
            }
          </div>
        </div>
        {children}
      </div>
    );
  }
});

export default Communities;
