import React from 'react';
import { connect } from 'react-redux';
import { addTagAction } from '../actions/tagActions';

let AddTagContainer = () => {
  return (
    <div>
      <form>
        <input type='text' />
        <button type='submit'>Add Tag!</button>
      </form>
    </div>
  );
};

export default AddTagContainer;