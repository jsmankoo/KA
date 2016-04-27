import React, {createClass} from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

const Properties = createClass({
  getInitialState(){
    return {
      Filter: 'All',
      Properties: []
    };
  },
  componentDidMount(){
    const {Filter} = this.props;
    if(Filter){
      this.setState({
        Filter: Filter
      });
    }
    Prismic.api('https://khristianavelar.prismic.io/api')
      .then((api)=>api.query(Prismic.Predicates.at('document.type', 'property')))
      .then(({results})=>{
        console.log(results);
        this.setState({...this.state,
          Properties: results
        });
      });
  },
  render() {
    const {Filter, Properties} = this.state;
    const {routeParams} = this.props;
    return (
      <div className="Properties">
        <Helmet
          title={'Properties'}
          meta={[
            {name:'description', content: 'Properties'}
          ]}
        />
        <div className="FiltersWrapper">
          <div className="Filters">
            <div className="Row">
              <div className="Col All">
                <div className="Select" onClick={()=>(this.setState({Filter:'All'}))}>
                  <i className={Filter === 'All' ? 'fa fa-circle' : 'btr bt-circle'}/>
                  <div className="text">
                    All
                  </div>
                </div>
              </div>
              <div className="Col Featured">
                <div className="Border" />
                <div className="Select" onClick={()=>(this.setState({Filter:'Featured'}))}>
                  <i className={Filter === 'Featured' ? 'fa fa-circle' : 'btr bt-circle'}/>
                  <div className="text">
                    Featured
                  </div>
                </div>
              </div>
              <div className="Col Sold">
                <div className="Border" />
                <div className="Select" onClick={()=>(this.setState({Filter:'Sold'}))}>
                <i className={Filter === 'Sold' ? 'fa fa-circle' : 'btr bt-circle'}/>
                <div className="text">
                  Sold
                </div>
                </div>
              </div>
              <div className="Col Search">
                <div className="Border" />
                <div className="Select">
                  <i className='btr bt-search' />
                  <div className="text">
                    Search MLS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="PropertiesWrapper">
          {
            Properties.filter(({tags})=>{
                if(routeParams.uid === 'All') return true;
                return tags.indexOf(routeParams.uid) >= 0;
              })
              .filter(({tags})=>{
                if(Filter === 'All') return true;
                return tags.indexOf(Filter) >= 0;
              })
              .map(({data, uid}, index, array)=>(
                <Link to={`/property/${uid}`} className={`Property ${ array.length % 2 === 1 && array.length-1 === index ? 'last': ''}`} key={index}>
                  <div className="Pic" style={{
                      backgroundImage: `url('${data['property.FeaturedPhoto'].value.main.url}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}>
                      <div className="Status">
                        {data['property.Status'].value}
                      </div>
                  </div>
                  <div className="Address">
                    {data['property.Address'].value}
                  </div>
                  <div className="Info">
                    <div className="Price">
                      ${data['property.Price'].value}
                    </div>
                    <div className="Bed">
                      {data['property.Bed'].value} Bed
                    </div>
                    <div className="Bath">
                      {data['property.Bath'].value} Bath
                    </div>
                  </div>
                </Link>
              )
            )
          }
        </div>
      </div>
    );
  }
});

export default Properties;
