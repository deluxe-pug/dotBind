import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { searchCardsAction } from '../actions/cardActions';
import { removeCardFilterAction, searchCardsAction } from '../actions/cardActions';
import { deleteSearchTagAction } from '../actions/searchActions';

class SearchTag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chip">
        {this.props.name}
        <i className="material-icons" onClick={() => {
          console.log('SEARCH STATE? ', this.props.search)

          let searchString = this.props.search.input.split(' ').filter(tag =>
            tag !== this.props.name
          ).join(' ');
          this.props.deleteSearchTag(this.props.name);
          this.props.removeCardFilter(searchString);
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
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTag);
