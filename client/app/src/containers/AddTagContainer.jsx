import React from 'react';
import { connect } from 'react-redux';
import { addTag } from '../actions/tagActions';

let AddTagContainer = ({dispatch}) => {
  let input;
  return (
    <div>
      <form onSubmit={ (e) => {
        e.preventDefault();

        if ( !input.value.trim() ) {
          return;
        }
        dispatch( addTag(input.value) );
        input.value ='';
      }}>
        <input type='text' ref={ node => {
          input = node;
        }}/>
        <button type='submit'>Add Tag!</button>
      </form>
    </div>
  );
};

AddTagContainer = connect()(AddTagContainer);

export default AddTagContainer;
