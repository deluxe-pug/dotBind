import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from '../components/Card';
import { fetchCardsAction } from '../actions/cardActions';

class AllCardsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    setTimeout(this.props.fetchCards, 100); // TODO: we need to figure out a solution to dispactch actions asyncly.
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        {this.props.cards.map((card) =>
          <Card
            key={card.id}
            {...card} id={card.id} />
        )}
      </div>
    )
  };
};

// state passed in is application state
const mapStateToProps = (state) => {
  // whatever is returned will show up as props inside AllCardsContainer
  // will re-render whenever application state changes
  return {
    cards: state.cards
  };
}

// anything returned will end up as props on AllCards container
const mapDispatchToProps = (dispatch) => {
  // whenever an action is called, result should be passed to all reducers
  return bindActionCreators({fetchCards: fetchCardsAction}, dispatch);
  // inside container: can call this.props.fetchCards
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCardsContainer);
