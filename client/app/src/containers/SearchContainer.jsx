import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchCardsAction } from '../actions/cardActions';
import { switchDisplayAction } from '../actions/searchActions';

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
          this.props.switchDisplay(false, input.value.trim());
          console.log('SEARCH CONTAINER: ', input.value.trim());
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
    switchDisplay: switchDisplayAction,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(SearchContainer);