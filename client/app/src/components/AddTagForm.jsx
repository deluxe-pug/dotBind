import React from 'react';

let input;

let AddTagForm = () => (
  <div className="col s4">
    <input className="tag-input" type="text" placeholder="Add tag" ref={ node => {input = node}} />
  </div>
);

export default AddTagForm;