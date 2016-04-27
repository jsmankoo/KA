import React from 'react';

const TitleJumbotron = ({poster,title})=>(
  <div className='TitleJumbotron' style={{
    backgroundImage: `url('${poster}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
    <h1>{title}</h1>
  </div>
);

export default TitleJumbotron;
