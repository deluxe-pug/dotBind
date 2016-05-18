import React from 'react';

let input;

class AddTagForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col s4">
        <input className="tag-input" type="text" placeholder="Add tag" ref={ node => {input = node}} />
      </div>
    );
  }
};

export default AddTagForm;