import React from 'react';
import AddCardContainer from '../containers/AddCardContainer';
import AddTagContainer from '../containers/AddTagContainer';
import AllCardsContainer from '../containers/AllCardsContainer';
import TagsContainer from '../containers/TagsContainer';

const App = () => (
  <div>
    <AllCardsContainer />
    <AddCardContainer />
    <TagsContainer />
    <AddTagContainer />
  </div>
); 

export default App;