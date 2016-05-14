import React from 'react';

class SearchTagContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="search">
        <div className="chip">
          Tag
          <i className="material-icons">close</i>
        </div>
      </form>
    );
  }

};

export default SearchTagContainer;