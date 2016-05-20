import React from 'react';
import TagsContainer from '../containers/TagsContainer';
import AddTagContainer from '../containers/AddTagContainer';

require('../styles/sidebar.css');

const Sidebar = () => {
  return (
      <div className="tag-container">
        <TagsContainer />
      </div>
  );
};

export default Sidebar;
