import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchCardsAction } from '../actions/cardActions';
import { addSearchKeywordAction } from '../actions/searchActions';

class Tag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <a className="collection-item" onClick={() => {
          let searchString = '';
          if (this.props.search.input) {
            searchString = searchString.concat(this.props.search.input, ' ', this.props.tagName)
          } else {
            searchString = searchString.concat(this.props.tagName)
          }
          this.props.searchCards(this.props.tagName);
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
    search: state.search
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    searchCards: searchCardsAction,
    addSearchKeyword: addSearchKeywordAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
