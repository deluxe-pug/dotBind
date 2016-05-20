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
      this.props.fetchCards();
      const intervalId = setInterval(() => {
        if (!this.props.search.input && !localStorage.getItem('modalIsOpen')) {
          if ( this.props.cardsState === 'myCards') {
              this.props.fetchCards();
          } else if ( this.props.cardsState === 'inbox' ) {
            this.props.fetchInbox();
          }
        }
      }, 600000);
      localStorage.setItem('intervalId', intervalId);
    }, 100); // TODO: we need to figure out a solution to dispatch actions asyncly.
  }

  render() {
    return this.props.cards.length ?
    (
      <div>
        {this.props.cards.map((card) =>
          <Card
            key={card.id}
            {...card} id={card.id} />
        )}
      </div>
    ) :
    (
      <div>
        <div className="no-content-box">
          {this.props.cardsState === 'myCards' ? (<h3>Saved items will appear here</h3>)
           : (<h3>Shared items will appear here</h3>)}

           {this.props.cardsState === 'myCards' ? (<p>Save content from your favorite websites to start using dotBind</p>)
            : (<p>Cards that have been shared with you will appear here. You can also share cards with other users!</p>)}
        </div>
        <div className="no-content-footer">
          <p><a href="https://chrome.google.com/webstore/detail/save-to-dotbind/hgagliimejgbhlgadoibbmlinaidfmgo?hl=en-US&gl=US&authuser=1" target="_blank" className="cta">Dont have a dotBind button?</a></p>
        </div>
      </div>
    )
  };
};

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    search: state.search,
    cardsState: state.cardsState,
  };
}

const mapDispatchToProps = (dispatch) => {
  // whenever an action is called, result should be passed to all reducers
  return bindActionCreators({fetchCards: fetchCardsAction, fetchInbox: fetchInboxAction}, dispatch);
  // inside container: can call this.props.fetchCards
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCardsContainer);
