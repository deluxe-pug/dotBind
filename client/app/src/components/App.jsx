import React from 'react';
import AddCardContainer from '../containers/AddCardContainer';
import AddTagContainer from '../containers/AddTagContainer';
import AllCardsContainer from '../containers/AllCardsContainer';
import TagsContainer from '../containers/TagsContainer';
import Sidebar from './Sidebar';

const App = () => (
  <div>
  
    <header>
      <div className="container">
        <a href="#" 
           data-activates="slide-out" 
           className="button-collapse top-nav full hide-on-large-only">
          <i className="material-icons">menu</i>
        </a>
      </div>
      <div id="slide-out" className="side-nav fixed">
        <Sidebar />
      </div>
    </header>

    <main>
      <AllCardsContainer />
      <AddCardContainer />
      <TagsContainer />
      <AddTagContainer />
    </main>

  </div>
); 

export default App;