import React, {createClass} from 'react';
import MediaQuery from 'react-responsive';
import {Motion, spring, presets} from 'react-motion';
import {Link} from 'react-router';
import {fromJS, Map} from 'immutable';

const Nav = createClass({
  getInitialState(){
    return {
      data: fromJS({
        Menu: {
          open: false,
          Categories: {
            Home: false,
            Properties: false,
            About: false
          }
        },
        Search: {
          open: false,
          value: ''
        }
      })
    };
  },
  toggleMenu(){
    const {data} = this.state;
    // console.log(data.getIn(['Menu', 'open']));
    this.setState({
      data: data.updateIn(['Menu', 'open'], (open)=>(!open))
    });
  },
  toggleCategory(Category){
    return ()=>{
      const {data} = this.state;
      this.setState({
        data: data.updateIn(['Menu', 'Categories', Category], (category)=>(!category))
      });
    };
  },
  toggleSearch(){
    const {data} = this.state;
    this.setState({
      data: data.updateIn(['Search', 'open'], (open)=>(!open))
    });
  },
  onChangeSearch(event){
    const {data} = this.state;
    this.setState({
      data: data.updateIn(['Search', 'value'], (value)=>(event.target.value))
    });
  },
  render() {
    const {data} = this.state;
    return (
      <div className="Nav">
        <MediaQuery maxDeviceWidth={767}>
          <Mobile
            Menu={{
              state: data.getIn(['Menu']).toJS(),
              toggleMenu: this.toggleMenu,
              toggleCategory: this.toggleCategory
            }}
            Search={{
              state: data.getIn(['Search']).toJS(),
              toggleSearch: this.toggleSearch,
              onChangeSearch: this.onChangeSearch
            }} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={768}>
          <Tablet
            Menu={{
              state: data.getIn(['Menu']).toJS(),
              toggleMenu: this.toggleMenu
            }}
            Search={{
              state: data.getIn(['Search']).toJS(),
              onChangeSearch: this.onChangeSearch
            }} />
        </MediaQuery>
      </div>
    );
  }
});

const Mobile = ({Menu, Search})=>{
  return (
    <div className="Mobile">
      <div className="Search Col">
        <i className={Search.state.open ? 'btr bt-times' : 'btr bt-search'} onClick={Search.toggleSearch} />
      </div>
      <div className="Brand Col">
        <Link to='/'>KHRISTIAN AVELAR</Link>
      </div>
      <div className="MenuIcon Col">
        <i className={Menu.state.open ? 'btr bt-times' : 'btr bt-bars'} onClick={Menu.toggleMenu} />
      </div>
      <Motion style={{
        height: Search.state.open ? spring(60, presets.gentle) : spring(0, presets.gentle),
        opacity: Search.state.open ? spring(1, presets.gentle) : spring(0, presets.gentle)
      }}>
        {
          ({height, opacity})=>(
            <div className="Input"style={{
              height: height,
              opacity: opacity
            }}>
              <div className="InputWrapper">
                <input
                  type='text'
                  placeholder='Enter City or Zip Code'
                  value={Search.state.value}
                  onChange={Search.onChangeSearch} />
              </div>
            </div>
          )
        }
      </Motion>
      <Motion style={{
        transform: Menu.state.open ? spring(0, presets.gentle) : spring(150, presets.gentle),
        opacity: Menu.state.open ? spring(1, presets.gentle) : spring(0, presets.gentle)
      }}>
        {
          ({transform, opacity})=>(
            <div className="Menu" style={{
              transform: `translate(0%, -${transform}%)`,
              opacity: opacity
            }}>
              <div className="MenuWrapper">
                <div className="Category">
                  <div className="CategoryName">
                    <Link to='/' onClick={Menu.toggleMenu} >Home</Link>
                  </div>
                </div>
                <div className="Category">
                  <div className="Border" />
                  <div className="CategoryName" onClick={Menu.toggleCategory('Properties')}>
                    <div className="Text">Properties</div>
                    <i className={`btr bt-angle-${Menu.state.Categories.Properties ? 'up' : 'down' }`} />
                  </div>
                  <Motion style={{
                    height: Menu.state.Categories.Properties ? spring(100, presets.gentle) : spring(0, presets.gentle)
                  }}>
                    {
                      ({height})=>(
                        <div className="SubMenu" style={{
                          height: height
                        }}>
                          <div className="LinkWrapper">
                            <Link to='/featured'>Featured</Link>
                          </div>
                          <div className="LinkWrapper">
                            <Link to='/sold' >Sold</Link>
                          </div>
                        </div>
                      )
                    }
                  </Motion>
                </div>
                <div className="Category">
                  <div className="Border" />
                  <div className="CategoryName">
                    <Link to='/contact' onClick={Menu.toggleMenu} >Contact</Link>
                  </div>
                </div>
                <div className="Category">
                  <div className="Border" />
                  <div className="CategoryName">
                    <Link to='/about' onClick={Menu.toggleMenu} >About</Link>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </Motion>
    </div>
  );
}

const Tablet = ({Menu, Search})=>{
  return (
    <div className="Tablet">
      <div className="Row">
        <div className="Search Col">
          <input
            type='text'
            placeholder='Enter City or Zip Code'
            value={Search.state.value}
            onChange={Search.onChangeSearch} />
          <i className='btr bt-search' />
        </div>
        <div className="Brand Col">
          <Link to='/'>KHRISTIAN AVELAR</Link>
        </div>
        <div className="MenuIcon Col">
          <i className='btr bt-bars' onClick={Menu.toggleMenu} />
        </div>
      </div>
      <Motion style={{
        transform: Menu.state.open ? spring(0, presets.gentle) : spring(300, presets.gentle),
        opacity: Menu.state.open ? spring(1, presets.gentle) : spring(0, presets.gentle)
      }}>
        {
          ({transform, opacity})=>(
            <div className="Menu" style={{
              transform: `translate(${transform}px, 0px)`,
              opacity: opacity
            }}>
              <div className="Close">
                <i className='btr bt-times' onClick={Menu.toggleMenu} />
              </div>
              <div className="Category">
                <div className="CategoryName">
                  <Link to='/' onClick={Menu.toggleMenu} >Home</Link>
                </div>
              </div>
              <div className="Category">
                <div className="Border" />
                <div className="CategoryName">
                  <Link to='/properties' onClick={Menu.toggleMenu} >Properties</Link>
                </div>
              </div>
              <div className="Category">
                <div className="Border" />
                <div className="CategoryName">
                  <Link to='/contact' onClick={Menu.toggleMenu} >Contact</Link>
                </div>
              </div>
              <div className="Category">
                <div className="Border" />
                <div className="CategoryName">
                  <Link to='/about' onClick={Menu.toggleMenu} >About</Link>
                </div>
              </div>
            </div>
          )
        }
      </Motion>
    </div>
  );
}

export default Nav;
