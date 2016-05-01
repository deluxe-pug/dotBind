import React from 'react';
import { connect } from 'react-redux';
import { addCardAction } from '../actions/addCardAction';

let AddCardContainer = ({ dispatch }) => {
  let input;
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        console.log('input: ', input.value);
        if (!input.value.trim()) {
          return;
        }
        dispatch(addCardAction(input.value));
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
  )
};

AddCardContainer = connect()(AddCardContainer);

export default AddCardContainer;