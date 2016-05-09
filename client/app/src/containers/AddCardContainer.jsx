import React from 'react';
import { connect } from 'react-redux';
import { addCardAction } from '../actions/cardActions';

let AddCardContainer = ({dispatch}) => {
  let input;
  return (
    <div id="modal1" class="modal">


        <div class="modal-content">


        <div class="modal-footer">
          <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>


      <form onSubmit={e => {
        e.preventDefault();
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
    </div>
  )
};

AddCardContainer = connect()(AddCardContainer);

export default AddCardContainer;
