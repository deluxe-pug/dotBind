import React from 'react';
import { bindActionCreators } from 'redux'
import { searchCardAction } from '../actions/cardActions';

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

const mapDispatchToProps = () => {
  return bindActionCreators({searchCards: searchCardAction}, dispatch);
};

export default connect(null, mapDispatchToProps)(SearchContainer);
