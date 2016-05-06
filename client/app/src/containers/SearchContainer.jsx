import React from 'react';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="search">
        <input type="search" placeholder="Search &#xF002;" />
      </div>
    );
  }
};

export default SearchContainer;
