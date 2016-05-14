import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCardAction } from '../actions/cardActions';

class AddCardContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let input;
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          this.props.addCards(input.value);
          input.value = '';
        }}>
          <input type='url' ref={node => {
            input = node;
          }}/>
          <button type='submit'>
            Add Card
          </button>
        </form>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addCards: addCardAction}, dispatch);
};

export default connect(null, mapDispatchToProps)(AddCardContainer);
