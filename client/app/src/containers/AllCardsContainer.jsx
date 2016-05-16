import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from '../components/Card';
import { fetchCardsAction, fetchInboxAction } from '../actions/cardActions';

class AllCardsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    setTimeout(() => {
      const intervalId = setInterval(() => {
        if (!this.props.search.input) {
          this.props.fetchCards();
        }
      }, 2000);
      localStorage.setItem('intervalId', intervalId);
    }, 100); // TODO: we need to figure out a solution to dispatch actions asyncly.
  }

  render() {
    return (
      <div>
        <div>
          <a onClick={this.props.fetchCards.bind(this)} className="waves-effect waves-light btn">My CARDS</a>
          <a onClick={this.props.fetchInbox.bind(this)} className="waves-effect waves-light btn">My CARDS</a>
        </div>
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
    cards: state.cards,
    search: state.search
  };
}

const mapDispatchToProps = (dispatch) => {
  // whenever an action is called, result should be passed to all reducers
  return bindActionCreators({fetchCards: fetchCardsAction, fetchInbox: fetchInboxAction}, dispatch);
  // inside container: can call this.props.fetchCards
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCardsContainer);
