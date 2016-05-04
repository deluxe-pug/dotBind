import React from 'react';
import SearchContainer from '../containers/SearchContainer';

const NavBar = () => {
  return (
    <div className="nav-bar-fixed">
      <div className="nav-wrapper">
        <SearchContainer />
      </div>
    </div>
  );
};

export default NavBar;
