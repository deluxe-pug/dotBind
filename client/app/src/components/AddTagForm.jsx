import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTagToCardAction } from '../actions/cardActions';

let input;

class AddTagForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="add-tag-form"
        onSubmit={ (e) => {
          e.preventDefault();
          if ( !input.value.trim() ) {
            return;
          }
          this.props.addTagToCard(input.value.toLowerCase(), this.props.user_id, this.props.id);
          input.value = '';
      }}>
        <input className="tag-input" type="text" placeholder="Add tag" ref={ node => {input = node}} />
      </form>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addTagToCard: addTagToCardAction,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(AddTagForm);