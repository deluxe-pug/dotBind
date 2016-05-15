import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchCardsAction } from '../actions/cardActions';
import { switchSearchBarAction } from '../actions/searchActions';

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
          this.props.searchCards(input.value.trim());
          this.props.switchSearchBar('button-view');
          console.log(this.props);

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
  return bindActionCreators({
    searchCards: searchCardsAction,
    switchSearchBar: switchSearchBarAction,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(SearchContainer);