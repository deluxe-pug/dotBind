import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { searchCardsAction } from '../actions/cardActions';
import { searchCardsByTagAction } from '../actions/cardActions';
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
          const searchInput = [];
          this.props.search.input.split(' ').forEach(tag => {
            if (tag !== this.props.name) {
              searchInput.push(tag);
            }
          });
          let searchString = '';
          if (searchInput) {
            searchInput.forEach(tag => {
              searchString = searchString.concat(' ', tag)
            });
          }
          this.props.searchCardsByTag(searchString);
          this.props.deleteSearchTag(this.props.name);
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
    searchCardsByTag: searchCardsByTagAction,
    deleteSearchTag: deleteSearchTagAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTag);
