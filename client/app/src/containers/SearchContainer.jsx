import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchCardsAction } from '../actions/cardActions';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let input;
    return (
      <form className="search"
        onSubmit={e => { 
          e.preventDefault();
          if (!input.value.trim()) { return; }
          var keywords = input.value.split(' ').filter(word => word.length !== 0);
          this.props.searchCards(keywords);
          input.value = '';
        }}>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({searchCards: searchCardsAction}, dispatch);
};

export default connect(null, mapDispatchToProps)(SearchContainer);
