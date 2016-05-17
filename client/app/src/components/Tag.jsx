import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
<<<<<<< b245698adb9c3377796c0a60b61aaa116f75f954
import { searchCardsAction } from '../actions/cardActions';
=======
// import { filterCardsAction } from '../actions/cardActions';
import { searchCardsAction, searchCardsByTagAction } from '../actions/cardActions';
>>>>>>> Connect searchCardsByTag to tags
// import { switchDisplayAction } from '../actions/searchActions';
import { addSearchKeywordAction } from '../actions/searchActions';

class Tag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <a className="collection-item" onClick={() => {

          let searchString = '';
          if (this.props.search) {
            searchString = searchString.concat(this.props.search.input, ' ', this.props.tagName)
          } else {
            searchString = searchString.concat(this.props.tagName)
          }
          console.log('searchString in tag', searchString);
          this.props.searchCardsByTag(searchString);
          this.props.addSearchKeyword(false, this.props.tagName);
        }}>
          {this.props.tagName}
          <span className="badge">{this.props.card_count}</span>
        </a>
    );
  }
};

const mapStateToProps = (state) => {
  return {
<<<<<<< 70221e9c359fa1a2103ceb169b5eea09934ad885
    cardsState: state.cardsState
=======
    search: state.search
>>>>>>> Fix tag connection to search
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    // searchCards: searchCardsAction,
    // switchDisplay: switchDisplayAction
    addSearchKeyword: addSearchKeywordAction,
    searchCardsByTag: searchCardsByTagAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
