import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterCardsAction } from '../actions/cardActions';


class Tag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a className="btn tag" onClick={() => this.props.filterCards(this.props.name)}>
        {this.props.name}
      </a>
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
