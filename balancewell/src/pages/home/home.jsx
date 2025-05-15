import React from 'react'
import Introduction from './introduction/introduction.jsx'
import Information from './information/information.jsx';
import Tool from './tool/tool.jsx';
// import PositivityBooth from './positivityBooth/positivityBooth.jsx'; 

const Home = () => {
  return (
    <div>
      <Introduction />
      <Information />
      <Tool />
      {/* <PositivityBooth/>  */}
    </div>
  );
};

export default Home;
