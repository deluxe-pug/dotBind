import React from 'react';
import { connect } from 'react-redux';
import { removeTagFromCardAction } from '../actions/cardActions';
import { bindActionCreators } from 'redux';

class CardTag extends React.Component {

  constructor(props) {
    super(props);
  }

  handleDelete() {
    console.log(' tag props ==> ', this.props)
    if ( this.props.cardsState !== 'inbox' ) {
      this.props.removeTag(this.props);
    }
  }

  render() {
    return (

      <div className="chip">
        {this.props.name}
        <a onClick={this.handleDelete.bind(this)}>
          <i className="material-icons">close</i>
        </a>
      </div>
            
    );
  }
};

// <div className="modal-tag">
//   <span className="tag-name"> {this.props.name} </span>
//   <span className="tag-delete" onClick={this.handleDelete.bind(this)}>x</span>
// </div>

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    cardsState: state.cardsState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({removeTag: removeTagFromCardAction}, dispatch);
};

CardTag = connect(mapStateToProps, mapDispatchToProps)(CardTag);

export default CardTag;
