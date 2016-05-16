import React from 'react';

class SearchTag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('chip is called');
    return (
      <div className="chip">
        {this.props.name}
        <i className="material-icons">close</i>
      </div>
    ); 
  }
};

export default SearchTag;