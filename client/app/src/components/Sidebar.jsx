import React from 'react';
import TagsContainer from '../containers/TagsContainer';
import AddTagContainer from '../containers/AddTagContainer';

const Sidebar = () => {
  return (
    <div>
      {console.log('sidebar!!!!!')}
      I am a sidebar, am i being rendered???
      <TagsContainer />
      <AddTagContainer />
    </div>
  );
};

export default Sidebar;