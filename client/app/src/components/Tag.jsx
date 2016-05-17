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
          this.props.searchCardsByTag(this.props.tagName);
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
    cardsState: state.cardsState
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    searchCards: searchCardsAction,
    // switchDisplay: switchDisplayAction
    addSearchKeyword: addSearchKeywordAction,
    searchCardsByTag: searchCardsByTagAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
