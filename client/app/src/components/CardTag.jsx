import React from 'react';
import { connect } from 'react-redux';
import { removeTagFromCardAction } from '../actions/cardActions';
import { bindActionCreators } from 'redux';

class CardTag extends React.Component {

  constructor(props) {
    super(props);
  }

  handleDelete() {
    this.props.removeTag(this.props);
  }

  render() {
    return (
      <div className="modal-tag">
        <span className="tag-name"> {this.props.name} </span>
        <span className="tag-delete" onClick={this.handleDelete.bind(this)}>X</span>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({removeTag: removeTagFromCardAction}, dispatch);
};

CardTag = connect(mapStateToProps, mapDispatchToProps)(CardTag);

export default CardTag;
