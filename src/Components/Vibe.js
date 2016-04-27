import React from 'react';
import {Link} from 'react-router';
import marked from 'marked';
import MediaQuery from 'react-responsive';

const Vibe = ({title,link,markdown,Pic1,Pic2,Pic3})=>{
  const picArray = [Pic1, Pic2, Pic3].filter((pic)=>pic);
  console.log(picArray);
  return (
    <div className='Vibe'>
      <div className="HeadWrapper">
        <div className="HeadSection">
          <h3>{title}</h3>
          <Link to={link.value}>
            <div className='all'>
              <h5>{link.label}</h5>
              <i className='btr bt-search' />
            </div>
          </Link>
        </div>
      </div>
      <div className='Content'>
        <div className='Markdown' dangerouslySetInnerHTML={{__html: marked(markdown)}} />
      </div>
      <MediaQuery maxDeviceWidth={767}>
        <div className='Mobile'>
          <div className='Pics'>
            {
              picArray.map((pic, index, arr)=>(
                <div className='PicWrapper' key={index}
                    style={{
                      width: `${100}%`
                    }}
                  >
                    <div className='Pic'
                        style={{
                          backgroundImage: `url('${pic}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                </div>
              ))
            }
          </div>
        </div>
      </MediaQuery>
      <MediaQuery minDeviceWidth={768}>
        <div className='Tablet'>
          <div className='Pics'>
            {
              picArray.map((pic, index, arr)=>(
                <div className='PicWrapper' key={index}
                    style={{
                      width: `${100/arr.length}%`
                    }}
                  >
                    <div className='Pic'
                        style={{
                          backgroundImage: `url('${pic}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                </div>
              ))
            }
          </div>
        </div>
      </MediaQuery>
    </div>
  );
};

export default Vibe;
