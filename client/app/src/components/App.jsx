import React from 'react';
import AddCard from '../components/AddCard';
import AllCards from '../components/AllCards';
import UserProfile from '../components/UserProfile';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('cards: ', this.props.state.cards);
    return(
      <div>
        <AddCard />
      </div>
    );   
  }
}



export default App;