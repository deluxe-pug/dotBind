import React from 'react';
import TagsContainer from '../containers/TagsContainer';
import AddTagContainer from '../containers/AddTagContainer';

const Sidebar = () => {
  return (
    <div>
      <AddTagContainer />
      <TagsContainer />
    </div>
  );
};

export default Sidebar;