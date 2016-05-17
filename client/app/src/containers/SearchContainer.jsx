import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchCardsAction, fetchCardsAction } from '../actions/cardActions';
import { switchDisplayAction, setEmptyInputAction } from '../actions/searchActions';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.search.input) {
      $('.search-input').val(this.props.search.input);
    }
  }

  render() {
    let input;
    return (
      <form className="search"
        onSubmit={e => { 
          e.preventDefault();
          if (!input.value.trim()) {
            this.props.fetchCards();
            this.props.setEmptyInput();

          } else {
            this.props.searchCards(input.value.trim());
            this.props.switchDisplay(false, input.value.trim());
            console.log('SEARCH CONTAINER: ', input.value.trim());
          }
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


const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    searchCards: searchCardsAction,
    switchDisplay: switchDisplayAction,
    fetchCards: fetchCardsAction,
    setEmptyInput: setEmptyInputAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);