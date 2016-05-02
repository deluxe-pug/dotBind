import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Card from '../components/Card';

const AllCardsContainer = ({cards}) => (
  <ul>
    {cards.map((card) => 
      <Card
        key={card.id}
        {...card} />
    )}
  </ul>
);

// state passed in is application state
const mapStateToProps = (state) => {
  console.log('state inside mapStateToProps: ', state);
  // whatever is returned will show up as props inside AllCardsContainer
  // will re-render whenever application state changes
  return {
    cards: state.cards
  };
}

// // anything returned will end up as props on AllCards container
// const mapDispatchToProps = (dispatch) => {
//   // whenever an action is called, result should be passed to all reducers
//   return bindActionCreators({displayCard: displayCardAction}, dispatch);
//   // inside container: can call this.props.thisplayCard
// }

export default connect(mapStateToProps)(AllCardsContainer);
// export default connect(mapStateToProps, mapDispatchToProps)(AllCards);