import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterCardsAction } from '../actions/cardActions';


class Tag extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.tagName, ' <---> ', props.card_count);
  }

  render() {
    return (
      <div className="collection">
        <a className="collection-item" onClick={() => this.props.filterCards(this.props.tagName)}>
          {this.props.tagName}
          <span className="badge tag-count">x {this.props.card_count}</span>
        </a>
      </div>
    );
  }
};

// const mapStateToProps = (state) => {
//   return {
//     cards: state.cards
//   };
// }

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({filterCards: filterCardsAction}, dispatch);
};

export default connect(null, mapDispatchToProps)(Tag);

// <div className="tag">
//     <span>#{props.name}</span>
// </div>
