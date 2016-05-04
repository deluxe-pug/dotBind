import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from '../components/Card';
import { fetchCardsAction } from '../actions/actionTypes';

class AllCardsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('fetchCards? ', this.props);
    this.props.fetchCards(); // async!!!
    // this.render();
  }

  render() {
    console.log('cards: ', this.props.cards);
    return (
      <div>
        {this.props.cards.map((card) => 
          <Card
            key={card.id}
            {...card} />
        )}
      </div>
    )
  };
};

// state passed in is application state
const mapStateToProps = (state) => {
  console.log('state inside mapStateToProps: ', state);
  // whatever is returned will show up as props inside AllCardsContainer
  // will re-render whenever application state changes
  return {
    cards: state.cards
  };
}

// anything returned will end up as props on AllCards container
const mapDispatchToProps = (dispatch) => {
  console.log('is mapDispatchToProps working?', fetchCardsAction);
  // whenever an action is called, result should be passed to all reducers
  return bindActionCreators({fetchCards: fetchCardsAction}, dispatch);
  // inside container: can call this.props.fetchCards
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCardsContainer);