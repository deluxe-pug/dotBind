import React from 'react';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <form className="search"
        onSubimt={e => 
          e.preventDefault();
          if (!input.value.trim()) { return; }
          this.props.searchCards(input.value);
          input.value = '';
        }>
        <input className="search-input" 
          type="text" 
          placeholder="Search &#xF002;" 
          ref={node => {
            input = node;
          }}/>
      </form>
    );
  }
};



export default SearchContainer;
