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

const mapStateToProps = (state) => {
  return {
    cards: state.cards
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchCards: fetchCardsAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCardsContainer);
