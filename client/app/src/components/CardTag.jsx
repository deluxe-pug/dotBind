import React from 'react';

class CardTag extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    console.log('called!')
  }

  render() {
    return (
      <div className="modal-tag">
        <span className="tag-name"> {this.props.name} </span>
        <span className="tag-delete">X</span>
      </div>
    );
  }
};

export default CardTag;
