import React from 'react';
import AddCardContainer from '../containers/AddCardContainer';
import AddTagContainer from '../containers/AddTagContainer';
import AllCardsContainer from '../containers/AllCardsContainer';
import TagsContainer from '../containers/TagsContainer';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

require("./../styles/style.css");

const App = () => (
  <div className="row">

    <div>
      <TopBar />
    </div>

    <div className="col s2 sidebar">
      <Sidebar />
    </div>

    <div className="col s10 content">
      <AllCardsContainer />
    </div>
  </div>
);

export default App;

      // <div className="container">
      //   <a href="#"
      //      data-activates="slide-out"
      //      className="button-collapse top-nav full hide-on-large-only">
      //     <i className="material-icons">menu</i>
      //   </a>
      // </div>
      //
      // <header>
      //   <div id="slide-out" className="side-nav fixed">
      //     <Sidebar />
      //   </div>
      // </header>
      // <main>
      //   <NavBar />
      //   <AddCardContainer />
      //   <AllCardsContainer />
      //
      // </main>
