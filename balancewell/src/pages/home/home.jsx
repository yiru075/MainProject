import React from 'react'
import Introduction from './introduction/introduction.jsx'
import Information from './information/information.jsx';
import Tool from './tool/tool.jsx';

const Home = () => {
  return (
    <div>
      <Introduction />
      <Information />
      <Tool />
    </div>
  );
};

export default Home;
