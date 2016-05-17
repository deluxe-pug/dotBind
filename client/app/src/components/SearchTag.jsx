import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { searchCardsAction } from '../actions/cardActions';
import { removeCardFilterAction, searchCardsAction } from '../actions/cardActions';
import { deleteSearchTagAction, switchDisplayAction } from '../actions/searchActions';

class SearchTag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chip">
        {this.props.name}
        <i className="material-icons search-tag" id="search-tag"
          onClick={(e) => {
            e.stopPropagation();
            console.log('INPUT LENGTH: ', this.props.search.input.length);
            if (this.props.search.input.length > 0) {
              let searchString = this.props.search.input.split(' ').filter(tag =>
                tag !== this.props.name
              ).join(' ');
              this.props.removeCardFilter(searchString);
              this.props.deleteSearchTag(this.props.name);
            } else {
              this.props.switchDisplay(true);
            }
          }}>
          close
        </i>
      </div>
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
    deleteSearchTag: deleteSearchTagAction,
    removeCardFilter: removeCardFilterAction,
    switchDisplay: switchDisplayAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTag);
