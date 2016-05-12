import React from 'react';
import { connect } from 'react-redux';
import { removeTagsAction } from '../actions/tagActions';
import { bindActionCreators } from 'redux';

class CardTag extends React.Component {

  constructor(props) {
    super(props);
    // console.log(props)
  }

  handleDelete() {
    console.log('callediuwefouhweifuhwef', this.props);
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({removeTag: removeTagsAction}, dispatch);
}

CardTag = connect(null, mapDispatchToProps)(CardTag);

export default CardTag;
